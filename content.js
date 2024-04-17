// Function to scrape data from the webpage
// function scrapeData() {
//   const paragraphs = document.querySelectorAll("p");
// const paragraphTexts = [];
// paragraphs.forEach((paragraph) => {
//   paragraphTexts.push(paragraph.textContent.trim());
// });
// const paragraphTexts = Array.from(paragraphs).map((paragraph) =>
//   paragraph.textContent.trim()
// );

// Return the extracted data
//   return paragraphTexts;
// }

function scrapeTextData() {
  // Logic to scrape text data
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

function scrapeImageData() {
  // Logic to scrape image data
  const images = document.querySelectorAll("img");
  const imageUrls = Array.from(images).map((img) => img.src);
  return imageUrls;
}

function scrapeLinkData() {
  // Logic to scrape link data
  const links = document.querySelectorAll("a");
  const linkUrls = Array.from(links).map((link) => link.href);
  return linkUrls;
}

function scrapeData(scrapeText, scrapeImages, scrapeLinks) {
  const scrapedData = {};

  if (scrapeText) {
    scrapedData.textData = scrapeTextData();
  }

  if (scrapeImages) {
    scrapedData.imageData = scrapeImageData();
  }

  if (scrapeLinks) {
    scrapedData.linkData = scrapeLinkData();
  }

  return scrapedData;
}

// Send the scraped data to the background script
chrome.runtime.sendMessage({
  action: "scrapeData",
  data: { textData: scrapeTextData(), imageData: scrapeImageData() },
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchData") {
    const scrapeText = request.scrapeText;
    const scrapeImages = request.scrapeImages;
    const scrapeLinks = request.scrapeLinks;

    const scrapedData = scrapeData(scrapeText, scrapeImages, scrapeLinks);

    // if (scrapeText) {
    //   const textData = scrapeTextData();
    //   scrapedData.textData = textData;
    // }

    // if (scrapeImages) {
    //   const imageData = scrapeImageData();
    //   scrapedData.imageData = imageData;
    // }

    // if (scrapeLinks) {
    //   const linkData = scrapeLinkData();
    //   scrapedData.linkData = linkData;
    // }

    sendResponse({ data: scrapedData });
  }
});
