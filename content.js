// Function to scrape data from the webpage
function scrapeData() {
  const paragraphs = document.querySelectorAll("p");
  // const paragraphTexts = [];
  // paragraphs.forEach((paragraph) => {
  //   paragraphTexts.push(paragraph.textContent.trim());
  // });
  const paragraphTexts = Array.from(paragraphs).map((paragraph) =>
    paragraph.textContent.trim()
  );

  // Return the extracted data
  return paragraphTexts;
}

// Send the scraped data to the background script
chrome.runtime.sendMessage({
  action: "scrapeData",
  data: scrapeData(),
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchData") {
    sendResponse({ data: scrapeData() });
  }
});
