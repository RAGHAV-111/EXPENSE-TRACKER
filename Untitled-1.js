// Get DOM elements
const commodityInput = document.getElementById("commodity");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const tableBody = document.getElementById("tableBody");
const rowToDelete = document.getElementById("rowToDelete");

// Create a counter variable to keep track of serial number
let counter = 1;

// Load items from local storage, if any
let items = JSON.parse(localStorage.getItem("items")) || [];

// Add event listener to addButton
addButton.addEventListener("click", function () {
  // Get input values
  const commodity = commodityInput.value;
  const quantity = quantityInput.value;
  const price = priceInput.value;

  // Validate input
  if (commodity === "" || quantity === "" || price === "") {
    alert("Please fill all fields");
    return;
  }

  // Create new item object
  const item = {
    id: counter,
    commodity: commodity,
    quantity: quantity,
    price: price,
  };

  // Add item to items array
  items.push(item);

  // Store items in local storage
  localStorage.setItem("items", JSON.stringify(items));

  // Create new table row
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <th scope="row">${item.id}</th>
      <td>${item.commodity}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
      <td><button class="deleteButton btn btn-danger">Delete</button></td>
  `;

  // Append new row to table body
  tableBody.appendChild(newRow);

  // Increment counter
  counter++;

  // Clear input fields
  commodityInput.value = "";
  quantityInput.value = "";
  priceInput.value = "";

});


// Add event listener to table body to listen for clicks on delete buttons
tableBody.addEventListener("click", function (event) {
  // Check if the clicked element is a delete button
  if (event.target.classList.contains("deleteButton")) {
    // Get the parent row of the delete button
    const row = event.target.parentNode.parentNode;

    // Delete the row
    deleteItem(row);
  }
});

// Function to display items from local storage
function displayItems() {
  items.forEach(function (item) {
    // Create new table row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <th scope="row">${item.id}</th>
        <td>${item.commodity}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td><button class="deleteButton btn btn-danger">Delete</button></td>
    `;

    // Append new row to table body
    tableBody.appendChild(newRow);

    // Increment counter
    counter++;

  });
}

// Function to delete an item from the table and local storage
function deleteItem(row) {
  // Get the ID of the item to delete from the row

  items.splice(row, 1);

  // Store the updated items array in local storage
  localStorage.setItem("items", JSON.stringify(items));

  counter--;

  // Remove the row from the table
  row.remove();
}

// Add function to clear storage and reload the page
function clearStorage() {
  localStorage.clear();
  location.reload();
}



// Call function to display items on page load
displayItems();
