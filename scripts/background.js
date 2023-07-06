chrome.storage.sync.get("speed", function (data) {
  const speed = data.speed || 1.0;
  chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: readSelectedText,
      args: [speed],
    });
  });
});

function readSelectedText(speed) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getSelectionText,
    args: [speed],
  });
}

function getSelectionText(speed) {
  const selection = window.getSelection().toString().trim();
  if (selection.length > 0) {
    const utterance = new SpeechSynthesisUtterance(selection);
    utterance.rate = speed;
    speechSynthesis.speak(utterance);
  }
}
