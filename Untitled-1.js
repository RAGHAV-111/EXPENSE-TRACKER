function update() {
    console.log("Updating Tracker....");
    const commodity = document.getElementById('commodity').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    let itemJsonArray = [];

    try {
        const itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr) ?? [];
    } catch (e) {
        console.error('Failed to parse itemsJson', e);
    }

    itemJsonArray.push({ commodity, quantity, price });

    try {
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } catch (e) {
        console.error('Failed to stringify itemJsonArray', e);
    }

    let tableBody = document.getElementById("tableBody");
    let str = "";

    itemJsonArray.forEach((element, index) => {
        str += `
             <tr>
             <th scope="row">${index + 1}</th>
             <td>${element.commodity}</td>
             <td>${element.quantity}</td>
             <td>${element.price}</td>
             <td><button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td> 
             </tr>`;
    });

    tableBody.innerHTML = str;
}

const addButton = document.getElementById("addButton");
addButton.addEventListener("click", update);

clearStorage();
update();

function deleted(itemIndex){
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}

function clearStorage() {
    if (confirm("Do you areally want to clear? , All the item except the first item will be there")) {
        console.log('Clearing the storage')
        localStorage.clear();
        update()
    }
}

