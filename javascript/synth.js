var context = new AudioContext();

var masterVolume = context.createGain();
masterVolume.gain.value = 0.2;
masterVolume.connect(context.destination);

var detune = 0;
var oscType = 'sine';

var filter = context.createBiquadFilter();
filter.type = "lowpass";
// filter.frequency.value = 

$('.ctrl_gain input').keydown(function() {
    masterVolume.gain.value = $(this).val()/100;
});

$('.ctrl_octave input').on('click', function() {
    var octave = $('.ctrl_octave input:checked').val();
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

$('.ctrl_osc input').on('click', function() {
    oscType = $('.ctrl_osc input:checked').val();
});

$('.ctrl_filter .radio').on('click', function() {
    filter.type = $('.ctrl_filter input:checked').val();
});

$('#filter_freq input').keydown(function() {
    filter.frequency.value = $(this).val()*10;
});

$('#filter_Q input').keydown(function() {
    filter.Q.value = $(this).val();
});


document.onkeydown = function(e) {
    var osc = context.createOscillator();
    osc.type = oscType;
    osc.connect(filter);
    filter.connect(masterVolume);
    masterVolume.connect(context.destination);

    var keyCode = e.keyCode;
    freq = keyCodeToInfo(keyCode)[0];
    osc.frequency.value = freq;
    osc.detune.value = detune;

    if (!e.repeat) {
        osc.start(context.currentTime);
        
        changeBtnColor(keyCode, 'lightskyblue');
        $(document).keyup(function(e) {
            osc.stop(context.currentTime);
            changeBtnColor(e.keyCode, 'lightgoldenrodyellow');
        });
    }
};


function changeBtnColor(keyCode, color) {
    btnID = '#' + keyCodeToInfo(keyCode)[1];
    $(btnID).css('background-color', color);
}

function keyCodeToInfo(keyCode) {
    if (keyCode === 90) {
        return [261.626, "C4"];
    } else if (keyCode === 83) {
        return [277.183, "C4s"];
    } else if (keyCode === 88) {
        return [293.665, "D4"];
    } else if (keyCode === 68) {
        return [311.127, "D4s"];
    } else if (keyCode === 67) {
        return [329.628, "E4"];
    } else if (keyCode === 86) {
        return [349.228, "F4"];
    } else if (keyCode === 71) {
        return [369.994, "F4s"];
    } else if (keyCode === 66) {
        return [391.995, "G4"];
    } else if (keyCode === 72) {
        return [415.305, "G4s"];
    } else if (keyCode === 78) {
        return [440.000, "A4"];
    } else if (keyCode === 74) {
        return [466.164, "A4s"];
    } else if (keyCode === 77) {
        return [493.883, "B4"];
    } else if (keyCode === 81) {
        return [523.251, "C5"];
    } else if (keyCode === 50) {
        return [554.365, "C5s"];
    } else if (keyCode === 87) {
        return [587.330, "D5"];
    } else if (keyCode === 51) {
        return [622.254, "D5s"];
    } else if (keyCode === 69) {
        return [659.255, "E5"];
    } else if (keyCode === 82) {
        return [698.456, "F5"];
    } else if (keyCode === 53) {
        return [739.989, "F5s"];
    } else if (keyCode === 84) {
        return [783.991, "G5"];
    } else if (keyCode === 54) {
        return [830.609, "G5s"];
    } else if (keyCode === 89) {
        return [880.000, "A5"];
    } else if (keyCode === 55) {
        return [932.328, "A5s"];
    } else if (keyCode === 85) {
        return [987.767, "B5"];
    } else if (keyCode === 73) {
        return [1046.50, "C6"];
    }
}