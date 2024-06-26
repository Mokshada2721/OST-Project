// popup.js

// Function to fetch scraped data from the content script
function fetchDataFromContentScript() {
  const scrapeOption = document.querySelector(
    'input[name="scrapeOption"]:checked'
  ).value;

  let scrapeText = false;
  let scrapeImages = false;
  let scrapeLinks = false;

  // Determine which option is selected and set corresponding flags
  if (scrapeOption === "text") {
    scrapeText = true;
  } else if (scrapeOption === "images") {
    scrapeImages = true;
  } else if (scrapeOption === "links") {
    scrapeLinks = true;
  }

  // Send a message to the content script to request scraped data
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        action: "fetchData",
        scrapeText: scrapeText,
        scrapeImages: scrapeImages,
        scrapeLinks: scrapeLinks,
      },
      function (response) {
        // Display the scraped data in the popup
        // displayData(response.data);
        if (response) {
          displayData(response.data, scrapeText, scrapeImages, scrapeLinks);
        } else {
          displayData(
            ["Error fetching data"],
            scrapeText,
            scrapeImages,
            scrapeLinks
          );
        }
      }
    );
  });
}

// Function to display scraped data in the popup
// function displayData(data) {
//   const dataElement = document.getElementById("data");
//   if (dataElement) {
//     if (data && data.length > 0) {
// If data is available, join it into a string and display
//       dataElement.textContent = data.join("\n");
//     } else {
// If no data is available, display a message
//       dataElement.textContent = "No data found";
//     }
//   }
// }

// Call the function to fetch and display data when the popup is opened
// document.addEventListener("DOMContentLoaded", function () {
//   fetchDataFromContentScript();
// });

document
  .getElementById("scrapeButton")
  .addEventListener("click", fetchDataFromContentScript);

function displayData(data, scrapeText, scrapeImages, scrapeLinks) {
  const dataElement = document.getElementById("data");
  let output = "";
  if (data) {
    if (scrapeText) {
      if (data.textData && data.textData.length > 0) {
        output += "Text Data:\n" + data.textData.join("\n") + "\n";
      } else {
        output += "No text data found\n";
      }
    }

    if (scrapeImages) {
      if (data.imageData && data.imageData.length > 0) {
        output += "\nImage URLs:\n" + data.imageData.join("\n");
      } else {
        output += "\nNo image URLs found";
      }
    }

    if (scrapeLinks) {
      if (data.linkData && data.linkData.length > 0) {
        output += "\nLink URLs:\n" + data.linkData.join("\n");
      } else {
        output += "\nNo link URLs found";
      }
    }

    dataElement.textContent = output;
  }
}
// document.addEventListener("DOMContentLoaded", fetchDataFromContentScript);
// Function to download text data as a .txt file
function downloadTextData() {
  const textData = document.getElementById("data").textContent;
  if (!textData.includes("No text data found")) {
    const blob = new Blob([textData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "textData.txt";
    link.click();
    URL.revokeObjectURL(url);
  } else {
    alert("No text data available to download.");
  }
}

// Function to download images from URLs
function downloadImages() {
  const textContent = document.getElementById("data").textContent;
  const urls = textContent.match(/https?:\/\/\S+/g); // This regex assumes URLs start with http and captures until a space or newline
  if (urls && urls.length > 0) {
    urls.forEach((url) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = ""; // This will prompt the browser to download the image; might not work on all browsers or require CORS headers
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  } else {
    alert("No image URLs available to download.");
  }
}

// Function to download link data as a .txt file
function downloadLinkData() {
  const textContent = document.getElementById("data").textContent;
  const urls = textContent.match(/https?:\/\/\S+/g); // This regex finds URLs starting with http and captures until a space or newline
  if (urls && urls.length > 0) {
    const blob = new Blob([urls.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "linkData.txt";
    link.click();
    URL.revokeObjectURL(url);
  } else {
    alert("No link URLs available to download.");
  }
}

// Event listeners for download buttons
document
  .getElementById("downloadTextButton")
  .addEventListener("click", downloadTextData);
document
  .getElementById("downloadImagesButton")
  .addEventListener("click", downloadImages);
document
  .getElementById("downloadLinksButton")
  .addEventListener("click", downloadLinkData);
