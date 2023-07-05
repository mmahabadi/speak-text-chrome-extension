chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: readSelectedText,
  });
});

function readSelectedText() {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getSelectionText,
  });
}

function getSelectionText() {
  const selection = window.getSelection().toString().trim();
  if (selection.length > 0) {
    const utterance = new SpeechSynthesisUtterance(selection);
    speechSynthesis.speak(utterance);
  }
}
