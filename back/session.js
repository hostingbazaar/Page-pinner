
chrome.runtime.onInstalled.addListener(() => {

const sessionValue = "Hello, this is a session value!";

chrome.storage.local.set({ key: sessionValue }, () => {
      console.log("Session value stored:", sessionValue);

  // Retrieve the stored value after it's set
  chrome.storage.local.get("key", result => {
    const retrievedValue = result.key;
    console.log("Retrieved session value:", retrievedValue);
  });
});
});
