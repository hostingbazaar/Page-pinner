document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const dataTable = document.getElementById("data-table");
    const paginationDiv = document.getElementById("pagination");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
  
    let currentPage = 1;
    const itemsPerPage = 5;
    let currentData = []; // Store the currently displayed data
  
    // Function to display data based on current page
    function displayData(data) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageData = data.slice(startIndex, endIndex);
  
      const tbody = dataTable.querySelector("tbody");
      tbody.innerHTML = "";
  
      for (const item of pageData) {
        const newRow = document.createElement("tr");
        const geturl = item.url
        var booklink = geturl.substr(0, 25);
  
        newRow.innerHTML = `
          <td>${booklink}</td>
          <td>${item.comment}</td>
          <td>⭐</td>
          <td>🗑️</td>
        `;
        tbody.appendChild(newRow);
      }
      
      // Update visibility of next/previous buttons based on itemsPerPage
      nextButton.style.display = pageData.length === itemsPerPage ? "block" : "none";
      prevButton.style.display = currentPage > 1 ? "block" : "none";
    }
  
    // Function to update pagination
    function updatePagination(data) {
      const totalPages = Math.ceil(data.length / itemsPerPage);
      paginationDiv.innerHTML = `Page ${currentPage} of ${totalPages}`;
    }
  
    // Function to handle next page
    function nextPage() {
      if (currentPage < Math.ceil(currentData.length / itemsPerPage)) {
        currentPage++;
        displayData(currentData);
        updatePagination(currentData);
      }
    }
  
    // Function to handle previous page
    function prevPage() {
      if (currentPage > 1) {
        currentPage--;
        displayData(currentData);
        updatePagination(currentData);
      }
    }
  
    // Fetch data from Firebase and populate the table
    function fetchAndDisplayData() {
      const firebaseUrl = "https://bookmark-92c13-default-rtdb.firebaseio.com/bookmarks.json";
      
      fetch(firebaseUrl)
        .then(response => response.json())
        .then(data => {
          currentData = Object.values(data); // Convert the object into an array
          displayData(currentData);
          updatePagination(currentData);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  
    // Handle search button click
    searchButton.addEventListener("click", function() {
      const searchTerm = searchInput.value.toLowerCase();
  
      // Filter data based on search term
      const filteredData = currentData.filter(item => {
        return (
          item.url.toLowerCase().includes(searchTerm) ||
          item.comment.toLowerCase().includes(searchTerm)
        );
      });
  
      currentPage = 1; // Reset to the first page after filtering
      displayData(filteredData);
      updatePagination(filteredData);
    });
  
    // Handle next page button click
    nextButton.addEventListener("click", nextPage);
  
    // Handle previous page button click
    prevButton.addEventListener("click", prevPage);
  
    // Initial fetch and display data
    fetchAndDisplayData();
  });
  