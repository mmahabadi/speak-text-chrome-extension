document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("play-button");
  playButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: readSelectedText,
      });
    });
  });
});

function readSelectedText() {
  const selection = window.getSelection().toString().trim();
  if (selection.length > 0) {
    const utterance = new SpeechSynthesisUtterance(selection);
    speechSynthesis.speak(utterance);
  }
}
