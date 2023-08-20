chrome.storage.local.get("key", result => {
    var retrievedValue = result.key;




    //api call
    const databaseURL = "https://bookmark-92c13-default-rtdb.firebaseio.com/user.json";

fetch(databaseURL)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {

    let foundUser = null;

    for (const userId in data) {
      if (data.hasOwnProperty(userId)) {
        const user = data[userId];
        console.log(retrievedValue)
        if (user.id === retrievedValue) {
          foundUser = user;
          break; // Stop searching once the user is found
        }
       
      }
    }

    if (foundUser) {
         //data get here//
          //fullname
          const nameArray = foundUser.fullname.split(" ");
          const firstName = nameArray[0];

          document.getElementById("fullname").innerHTML = firstName;
          
    } else {
      window.location.replace("popup.html");
    }
  })
  .catch(error => {
    console.error("Error fetching user data:", error);
    // Handle the error here
  });   




});






