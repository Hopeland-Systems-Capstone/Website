function update(){
    console.log("page load");

    add_recipient();
}

// --- ND ---
function add_recipient(){

    console.log("adding recipient");
    //const obj = JSON.parse(jsonText);

    let table = document.getElementById("table-body");
    let row = document.createElement("tr");

    //Name 
    let name = document.createElement("td");
    name.setAttribute("scope","row");
    name.className = "align-middle";
    name.innerText = "Test Name"; // get name

    //email
    let email = document.createElement("td");
    email.className = "align-middle";
    email.innerText = "Test Email"; // get email

    //Enable
    let enable = document.createElement("td");
    enable.className = "align-middle";
    let inner_enable = document.createElement("div");
    inner_enable.className = "form-check form-switch";
    let checkbox = document.createElement("input");
    checkbox.className = "form-check-input";
    checkbox.type = "checkbox";
    checkbox.setAttribute("role","switch");

    //if(enabled)
        checkbox.checked = true;
    //else
        //checkbox.checked = false;

    inner_enable.appendChild(checkbox);
    enable.appendChild(inner_enable);

    //Operation
    let operation = document.createElement("td");
    operation.className = "align-middle";

    //icon
    let icon = document.createElement("td");
    icon.className = "align-middle";
    let image = document.createElement("img");
    image.src = "images/trash.png";
    image.className = "trash";

    icon.appendChild(image);
    
    row.appendChild(name);
    row.appendChild(email);
    row.appendChild(enable);
    row.appendChild(operation);
    row.appendChild(icon);

    table.appendChild(row);
}


