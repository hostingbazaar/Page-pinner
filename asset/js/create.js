const createaccount = document.getElementById("create-account");
createaccount.addEventListener("click", function () {
//data sync
const fullname = document.getElementById("fullname").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

//validation of input
if(fullname===""){
    document.getElementById("err-fullname").innerHTML = "Enter Your Fullname";
}
else if(email===""){
    document.getElementById("err-email").innerHTML = "Enter Your Valid Email";
}
else if(password===""){
    document.getElementById("err-password").innerHTML = "Enter Your Password";
}
else{
    
    const uuid = self.crypto.randomUUID();
    const timestamp = new Date().toLocaleString();
    const status = "Active";


        // Your API code here
    
        const jsonData = {
            "id": uuid,
            "fullname": fullname,
            "email": email,
            "password": password,
            "status": status,
            "timestamp": timestamp
          };
          
          const apiUrl = "https://bookmark-92c13-default-rtdb.firebaseio.com/user.json";
          
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
              //creating session here//
              
              chrome.storage.local.set({ key: uuid }, () => {
              console.log("New session value stored:", uuid);
              });
              //redirect location//
            window.location.replace("popup.html");


            })
            .catch(error => {
                alert("Something Went Wrong")
              console.error("Error posting data:", error);
            });
      
          // Clear comment input field
        //   customCommentInput.value = "";






}




});
