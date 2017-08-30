// CREATE AUDIO CONTEXT, MASTER VOLUME, FILTER, AND LFO
var context = new AudioContext();
var masterVolume = context.createGain();
var filter = context.createBiquadFilter();
var lfo = context.createOscillator();
var lfo_gain = context.createGain();

// ********** SET INITIAL VALUES FOR ALL CONTROL PARAMETERS **********
// GAIN
// masterVolume.gain.value = $('.ctrl_gain input').val()/300;

// OCTAVE
var octave = $('.ctrl_octave input:checked').val();
var detune = 0;

// OSCILLATOR
var oscType = $('.ctrl_osc input:checked').val();

// FILTER
filter.type = $('.ctrl_filter input:checked').val();
filter.frequency.value = $('#filter_freq input').val()*10;
filter.Q.value = $('#filter_Q input').val()/10;

// ADSR
var attack = $('#adsr_attack input').val()/100;
var decay = $('#adsr_decay input').val()/100;
var sustain = $('#adsr_sustain input').val()/100;
var release = $('#adsr_release input').val()/100;
var envTimeFactor = 2;

// LFO
var lfo_amount = $('#lfo_amount input').val()/1000;
var lfo_rate = $('#lfo_rate input').val()/10;
lfo.connect(lfo_gain);
lfo_gain.connect(masterVolume.gain);
lfo.start(context.currentTime);

// ********** UPDATE VALUES FOR ALL CONTROL PARAMETERS WHEN CHANGED **********
// GAIN
$('.ctrl_gain input').keydown(function() {
    masterVolume.gain.value = $(this).val()/300;
});

// OCTAVE
$('.ctrl_octave input').on('click', function() {
    octave = $('.ctrl_octave input:checked').val();
    if (octave === 'c2c4') {
        detune = -2400;
    } else if (octave === 'c3c5') {
        detune = -1200;
    } else if (octave === 'c4c6') {
        detune = 0;
    } else if (octave === 'c5c7') {
        detune = 1200;
    }
});

// OSCILLATOR
$('.ctrl_osc input').on('click', function() {
    oscType = $('.ctrl_osc input:checked').val();
});

// FILTER
$('.ctrl_filter .radio').on('click', function() {
    filter.type = $('.ctrl_filter input:checked').val();
});

$('#filter_freq input').keydown(function() {
    filter.frequency.value = $(this).val()*10;
});

$('#filter_Q input').keydown(function() {
    filter.Q.value = $(this).val()/10;
});

// ADSR
$('#adsr_attack input').keydown(function() {
    attack = $(this).val()/100;
});

$('#adsr_decay input').keydown(function() {
    decay = $(this).val()/100;
});

$('#adsr_sustain input').keydown(function() {
    sustain = $(this).val()/100;
});

$('#adsr_release input').keydown(function() {
    release = $(this).val()/100;
});

// LFO
$('#lfo_amount input').keydown(function() {
    lfo_amount = $(this).val()/1000;
});

$('#lfo_rate input').keydown(function() {
    lfo_rate = $(this).val()/10;
});

// ********** START AND STOP OSCILLATORS ON KEYDOWN/KEYUP **********
document.onkeydown = function(e) {
    var osc = context.createOscillator();
    osc.connect(filter);
    filter.connect(masterVolume);
    masterVolume.connect(context.destination);

    
    console.log(masterVolume.gain.value);

    lfo.frequency.value = lfo_rate;
    lfo_gain.gain.value = lfo_amount; 

    var keyCode = e.keyCode;
    freq = keyCodeToInfo(keyCode)[0];
    osc.frequency.value = freq;
    osc.detune.value = detune;
    osc.type = oscType;

    if (!e.repeat) {
        masterVolume.gain.value = $('.ctrl_gain input').val()/300;
        osc.start(context.currentTime);
        envGenOn(masterVolume.gain, attack, decay, sustain);
        changeBtnColor(keyCode, 'lightskyblue');

        $(document).keyup(function(e) {
            envGenOff(masterVolume.gain, release);
            osc.stop(context.currentTime + release*envTimeFactor);
            changeBtnColor(e.keyCode, 'lightgoldenrodyellow');
        });
    }
};

// DEFINE ENVELOPE GENERATOR
function envGenOn(vcaGain, a, d, s) {
    var now = context.currentTime;
    a *= envTimeFactor;
    d *= envTimeFactor;
    vcaGain.cancelScheduledValues(0);
    vcaGain.setValueAtTime(0, now);
    vcaGain.linearRampToValueAtTime(1, now + a);
    vcaGain.linearRampToValueAtTime(s, now + a + d);
}

function envGenOff(vcaGain, r) {
    var now = context.currentTime;
    r *= envTimeFactor;
    vcaGain.cancelScheduledValues(0);
    vcaGain.setValueAtTime(vcaGain.value, now);
    vcaGain.linearRampToValueAtTime(0, now + r);
}

// PLAY THE APPROPRIATE NOTE WHEN A KEY IS PRESSED
function keyCodeToInfo(keyCode) {
    switch(keyCode) {
        case 90:
            return [261.626, "C4"];
        case 83:
            return [277.183, "C4s"];
        case 88:
            return [293.665, "D4"];
        case 68:
            return [311.127, "D4s"];
        case 67:
            return [329.628, "E4"];
        case 86:
            return [349.228, "F4"];
        case 71:
            return [369.994, "F4s"];
        case 66:
            return [391.995, "G4"];
        case 72:
            return [415.305, "G4s"];
        case 78:
            return [440.000, "A4"];
        case 74:
            return [466.164, "A4s"];
        case 77:
            return [493.883, "B4"];
        case 81:
            return [523.251, "C5"];
        case 50:
            return [554.365, "C5s"];
        case 87:
            return [587.330, "D5"];
        case 51:
            return [622.254, "D5s"];
        case 69:
            return [659.255, "E5"];
        case 82:
            return [698.456, "F5"];
        case 53:
            return [739.989, "F5s"];
        case 84:
            return [783.991, "G5"];
        case 54:
            return [830.609, "G5s"];
        case 89:
            return [880.000, "A5"];
        case 55:
            return [932.328, "A5s"];
        case 85:
            return [987.767, "B5"];
        case 73:
            return [1046.50, "C6"];
    }
}

// CHANGE KEY COLOR WHEN PRESSED DOWN
function changeBtnColor(keyCode, color) {
    btnID = '#' + keyCodeToInfo(keyCode)[1];
    $(btnID).css('background-color', color);
}