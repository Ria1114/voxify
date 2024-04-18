

let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let playButton = document.getElementById("playButton");
let isPlaying = false;

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    updateVoiceList();
};

function updateVoiceList() {
    voiceSelect.innerHTML = "";
    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

playButton.addEventListener("click", () => {
    if (isPlaying) {
        // If playing, stop and change button to play
        window.speechSynthesis.cancel();
        playButton.innerHTML = '<img src="image/play.png">Listen';
    } else {
        // If not playing, check if textarea is empty
        let textToRead = document.querySelector("textarea").value.trim();
        if (textToRead === "") {
            alert("Textarea is empty. Please enter some text.");
        } else {
            // If textarea is not empty, convert text to speech and change button to pause
            speech.text = textToRead;
            window.speechSynthesis.speak(speech);
            playButton.innerHTML = '<img src="image/pause.png">Pause';
        }
    }
    isPlaying = !isPlaying;
});
