// Function to scrape data from the webpage
function scrapeData() {
    
    const paragraphs = document.querySelectorAll('p');
    const paragraphTexts = [];
    paragraphs.forEach(paragraph => {
      paragraphTexts.push(paragraph.textContent.trim());
    });
  
    // Return the extracted data
    return paragraphTexts;
  }
  
  // Send the scraped data to the background script
  chrome.runtime.sendMessage({
    action: 'scrapeData',
    data: scrapeData()
  });
  