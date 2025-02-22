// contentScript.js
(function () {
    // Example: Get the current URL and send it to the extension popup or background
    const currentUrl = window.location.href;
    // Use messaging to send the URL to the background script
    chrome.runtime.sendMessage({ type: 'CURRENT_URL', url: currentUrl });
  })();
  