chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getURL" }, function (response) {
    document.getElementById("url").value = response.url;
  });
 

//   const sessionValue = "ddsdssdfd4";




// chrome.storage.local.get("key", result => {
//   if (chrome.runtime.lastError) {
//     console.error("Error retrieving session value:", chrome.runtime.lastError);
//     return;
//   }

//   var retrievedValue = result.key;


  

//   if (retrievedValue === undefined) {
//     // If the session value is empty, store a new session value
//     chrome.storage.local.set({ key: sessionValue }, () => {
//       console.log("New session value stored:", sessionValue);
//     });
//   } else {
//     console.log("Retrieved session value:", retrievedValue);
//   }
// });



// chrome.storage.local.remove("key", () => {
//   if (chrome.runtime.lastError) {
//     console.error("Error removing session value:", chrome.runtime.lastError);
//     return;
//   }

//   console.log("Session value removed.");

// });



});




const customUrlInput = document.getElementById("url");
const customCommentInput = document.getElementById("comment");

const extractButton = document.getElementById("extract-button");
extractButton.addEventListener("click", function () {
  const customUrl = customUrlInput.value;
  const customComment = customCommentInput.value;
  if (customUrl) {
    // Your API code here
    
    const jsonData = {
      "id": "11",
      "url": customUrl,
      "comment": customComment
    };
    
    const apiUrl = "https://bookmark-92c13-default-rtdb.firebaseio.com/book.json";
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
    };
    
    fetch(apiUrl, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Data posted successfully:", data);
      })
      .catch(error => {
        console.error("Error posting data:", error);
      });

    // Clear comment input field
    customCommentInput.value = "";
  } 
});
