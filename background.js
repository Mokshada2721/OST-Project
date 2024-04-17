// background.js

// Example background script that listens for messages from content scripts

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Log the message received from the content script
  console.log("Message received from content script:", message);

  // Handling different types of messages
  if (message.action === "scrapeData") {
    console.log("Scraped Data:", message.data);
    // Possibly store this data or handle differently
    sendResponse({ received: true, data: message.data });
  }

  return true; // To keep the message channel open in case of asynchronous response

  // Example: Send a response back to the content script
  // sendResponse({ received: true });
});
