function createIconElement() {
  const icon = document.createElement("div");
  icon.id = "text-to-speech-icon";
  icon.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
  <g id="SVGRepo_bgCarrier" stroke-width="0"/>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
  <g id="SVGRepo_iconCarrier"> <path style="fill:#FFB655;" d="M430.607,3.365c-9.248-4.949-20.472-4.407-29.199,1.411L237.905,113.777H94.815 c-15.709,0-28.444,12.736-28.444,28.444V256v113.778c0,15.709,12.736,28.444,28.444,28.444h143.091l163.502,108.999 c4.76,3.174,10.261,4.779,15.779,4.779c4.602,0,9.214-1.115,13.42-3.366c9.248-4.949,15.022-14.588,15.022-25.079V256V28.444 C445.629,17.954,439.855,8.315,430.607,3.365z"/> <path style="fill:#FF9811;" d="M94.815,398.222h143.091l163.502,108.999c4.76,3.174,10.261,4.779,15.779,4.779 c4.602,0,9.214-1.115,13.42-3.366c9.248-4.949,15.022-14.588,15.022-25.079V256H66.37v113.778 C66.37,385.486,79.106,398.222,94.815,398.222z"/> </g>
  </svg>`;
  icon.style.position = "absolute";
  icon.style.display = "inline-block";
  icon.style.width = "16px";
  icon.style.height = "16px";
  icon.style.cursor = "pointer";

  icon.addEventListener("click", speakSelectedText);
  return icon;
}

function removeIcon() {
  const previousIcon = document.getElementById("text-to-speech-icon");
  if (previousIcon) {
    previousIcon.remove();
  }
}

function speakSelectedText(event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    chrome.runtime.sendMessage({ action: "speakText", text: selectedText });
  }
}

function handleSelection(event) {
  const selection = window.getSelection();
  if (selection && selection.toString().trim().length > 0) {
    const range = selection.getRangeAt(0);
    removeIcon();
    const icon = createIconElement();
    range.insertNode(icon);
  } else {
    removeIcon();
  }
}

document.addEventListener("mouseup", handleSelection);
