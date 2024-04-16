// popup.js

// Function to fetch scraped data from the content script
function fetchDataFromContentScript() {
    // Send a message to the content script to request scraped data
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'fetchData' }, function (response) {
            // Display the scraped data in the popup
            displayData(response.data);
        });
    });
}

// Function to display scraped data in the popup
function displayData(data) {
    const dataElement = document.getElementById('data');
    if (dataElement) {
        if (data && data.length > 0) {
            // If data is available, join it into a string and display
            dataElement.textContent = data.join('\n');
        } else {
            // If no data is available, display a message
            dataElement.textContent = 'No data found';
        }
    }
}

// Call the function to fetch and display data when the popup is opened
document.addEventListener('DOMContentLoaded', function () {
    fetchDataFromContentScript();
});
