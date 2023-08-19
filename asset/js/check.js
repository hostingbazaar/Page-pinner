

chrome.storage.local.get("key", result => {
  if (chrome.runtime.lastError) {
    console.error("Error retrieving session value:", chrome.runtime.lastError);
    return;
  }

  var retrievedValue = result.key;

  
  if (retrievedValue === undefined) {
    window.location.replace("login.html");
  } else {
    window.location.replace("dashboard.html");
  }
  
});




