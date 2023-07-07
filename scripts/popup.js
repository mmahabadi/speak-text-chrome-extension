document.addEventListener("DOMContentLoaded", async function () {
  const playButton = document.getElementById("play-button");
  const stopButton = document.getElementById("stop-button");
  const speedInput = document.getElementById("speed");
  const speedText = document.getElementById("speed-text");

  (function () {
    chrome.storage.sync.get("speed", function (data) {
      if (data.speed) {
        speedInput.value = data.speed;
        speedText.innerText = data.speed + "x";
      }
    });
  })();

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

  stopButton.addEventListener("click", function () {
    speechSynthesis.cancel();
  });

  speedInput.addEventListener("change", function () {
    const speed = speedInput.value;
    speedText.innerText = speed + "x";

    chrome.storage.sync.set({ speed }, function () {
      console.log("Speed saved: " + speed);
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
