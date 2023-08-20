const reload = document.getElementById("reload");
reload.addEventListener("click", function() {

chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        action: "getURL"
    }, function(response) {
        document.getElementById("url").value = response.url;
    });


});


});


document.addEventListener("DOMContentLoaded", function() {
    // Get a reference to the button
    const openButton = document.getElementById("open-button");
  
    // Add a click event listener to the button
    openButton.addEventListener("click", function() {
      // Open a new tab with the extension's HTML file
      chrome.tabs.create({ url: chrome.runtime.getURL("view.html") });
    });
  });
  