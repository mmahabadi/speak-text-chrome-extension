chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "say") {
    const { text } = message;
    speakText(text);
  }
});

function speakText(text) {
  chrome.tts.speak(text);
}
