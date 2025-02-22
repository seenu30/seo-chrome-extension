// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CURRENT_URL') {
      console.log('Current URL:', message.url);
      // You can store or process this URL as needed
    }
  });
  