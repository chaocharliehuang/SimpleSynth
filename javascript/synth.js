var context = new AudioContext();

var masterVolume = context.createGain();
masterVolume.gain.value = 0.3;
masterVolume.connect(context.destination);


$(document).keydown(function(e) {
    var osc = context.createOscillator();
    osc.type = 'sawtooth';
    osc.connect(masterVolume);
    masterVolume.connect(context.destination);
    
    freq = keyCodeToFreq(e.keyCode);
    osc.frequency.value = freq;

    console.log(e.repeat);

    if (e.repeat === undefined || e.repeat === false) {
        osc.start(context.currentTime);
    }

    $(document).keyup(function() {
        osc.stop(context.currentTime);
    });
});



function keyCodeToFreq(keyCode) {
    if (keyCode === 90) {
        return 261.626;
    } else if (keyCode === 83) {
        return 277.183;
    } else if (keyCode === 88) {
        return 293.665;
    } else if (keyCode === 68) {
        return 311.127;
    } else if (keyCode === 67) {
        return 329.628;
    } else if (keyCode === 86) {
        return 349.228;
    } else if (keyCode === 71) {
        return 369.994;
    } else if (keyCode === 66) {
        return 391.995;
    } else if (keyCode === 72) {
        return 415.305;
    } else if (keyCode === 78) {
        return 440.000;
    } else if (keyCode === 74) {
        return 466.164;
    } else if (keyCode === 77) {
        return 493.883;
    } else if (keyCode === 81) {
        return 523.251;
    } else if (keyCode === 50) {
        return 554.365;
    } else if (keyCode === 87) {
        return 587.330;
    } else if (keyCode === 51) {
        return 622.254;
    } else if (keyCode === 69) {
        return 659.255;
    } else if (keyCode === 82) {
        return 698.456;
    } else if (keyCode === 53) {
        return 739.989;
    } else if (keyCode === 84) {
        return 783.991;
    } else if (keyCode === 54) {
        return 830.609;
    } else if (keyCode === 89) {
        return 880.000;
    } else if (keyCode === 55) {
        return 932.328;
    } else if (keyCode === 85) {
        return 987.767;
    } else if (keyCode === 73) {
        return 1046.50;
    }
}