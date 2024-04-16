// background.js

// Example background script that listens for messages from content scripts

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message,sender,  sendResponse) => {
    // Log the message received from the content script
    console.log("Message received from content script:", message);
  
    // Example: Send a response back to the content script
    sendResponse({ received: true });
  });
  