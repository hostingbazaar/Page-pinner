
//chrome getting url 
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        action: "getURL"
    }, function(response) {
        document.getElementById("url").value = response.url;
    });




    //getting session value and run api there
    chrome.storage.local.get("key", result => {
        var uuid = result.key;
    



    

        //api run here//

    const extractButton = document.getElementById("add-bookmark");
    extractButton.addEventListener("click", function() {

        const customUrl = document.getElementById("url").value;
        const customComment = document.getElementById("comment").value;
        const timestamp = new Date().toLocaleString();
    
    

        if(customUrl==""){
            document.getElementById("err-url").innerHTML = "Please provide url";

        }
        else if(customComment==""){
            document.getElementById("err-comment").innerHTML = "Please provide comment here";
        }
        else {
            // Your API code here

            const jsonData = {
                "userid": uuid,
                "url": customUrl,
                "comment": customComment,
                "timestamp": timestamp

            };

            const apiUrl = "https://bookmark-92c13-default-rtdb.firebaseio.com/bookmarks.json";

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
            // document.getElementById("succ-alert").innerHTML = "Data added succesfully";
            document.getElementById("succ-alert").innerHTML += "<div class='alert alert-success'>Bookmarks Added!</div>";
            document.getElementById("url").value = "";
            document.getElementById("comment").value = "";
            //error data set
            document.getElementById('err-url').innerHTML = "";
            document.getElementById('err-comment').innerHTML = "";

            setInterval(function() { document.getElementById("succ-alert").innerHTML = ""}, 2000);


        }










    });












});








    });