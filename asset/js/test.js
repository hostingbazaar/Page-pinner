chrome.storage.local.get("key", result => {
    var retrievedValue = result.key;
    document.getElementById("token").innerHTML = result.key;
});


const destroy_session = document.getElementById("delete");
destroy_session.addEventListener("click", function () {

    chrome.storage.local.remove("key", () => {
  if (chrome.runtime.lastError) {
    console.error("Error removing session value:", chrome.runtime.lastError);
    return;
  }

  console.log("Session value removed.");

});

});   