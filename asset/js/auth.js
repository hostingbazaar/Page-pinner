const login_account = document.getElementById("login");
login_account.addEventListener("click", function () {
//data sync
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
//validation of input
if(email===""){
    document.getElementById("err-email").innerHTML = "Enter Your Valid Email";
}
else if(password===""){
    document.getElementById("err-password").innerHTML = "Enter Your Password";
}
else{
   

    const databaseURL = "https://bookmark-92c13-default-rtdb.firebaseio.com/user.json";

    fetch(databaseURL)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        // console.log("User data:", data);
    
        // const searchEmail = "ajeet@gmail.com";
        let foundUser = null;
    
        for (const userId in data) {
          if (data.hasOwnProperty(userId)) {
            const user = data[userId];
            if (user.email === email && user.password === password && user.status=="Active") {
              foundUser = user;
              break; // Stop searching once the user is found
            }
           
          }
        }
    
        if (foundUser) {
        //   console.log("User found:", foundUser);
            // console.log(foundUser.id)
             //creating session here//
             const uuid = foundUser.id;
             console.log(uuid)
              
             chrome.storage.local.set({ key: uuid }, () => {
                console.log("New session value stored:", uuid);
                });
                //redirect location//
              window.location.replace("popup.html");
              
        } else {
            document.getElementById("err-login").innerHTML = "Your Email & Password not matched";
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        // Handle the error here
      });   







}
});