document.getElementById('startBlocking').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "startBlocking" });
  });
  