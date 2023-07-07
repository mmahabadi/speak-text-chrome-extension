
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "speakText") {
   const text = message.text;
    speakText(text);
  }
});

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
