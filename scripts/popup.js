document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("play-button");
  playButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.storage.sync.get("speed", function (data) {
        const speed = data.speed || 1.0;
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: getSelectionText,
          args: [speed],
        });
      });
    });
  });
});

function getSelectionText(speed) {
  const selection = window.getSelection().toString().trim();
  if (selection.length > 0) {
    const utterance = new SpeechSynthesisUtterance(selection);
    utterance.rate = speed;
    speechSynthesis.speak(utterance);
  }
}
