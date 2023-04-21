function update(){
    console.log("page load");

    //called when you load page
    load_billing();
}

function load_billing(){

    //get restful call to load billing


}

function add_row(jsonText){

    const obj = JSON.parse(jsonText);

    let table = document.getElementById("table_body");
    let row = document.createElement("tr");

    // --- Name ---
    let name = document.createElement("td");
    name.setAttribute("scope","row");
    name.className = "align-middle";

        //restful call needed to get card info
    let card = "**** 1234"

        // needs to adjust depending on card
    let image1 = document.createElement("img");
    image1.src = "images/visaLogo.png";
    let type = "Visa Card ";

    let text1 = document.createElement("span")
    text.innerText = type + card;

    name.appendChild(image1);
    name.appendChild(text1);
    
    // --- Expiration --- 
    let expiration = document.createElement("td");
    expiration.className = "align-middle";
    expiration.innerText = "12/2022"; //replace with call

    // --- Status --- 
    let status = document.createElement("td");
    status.setAttribute("scope","row");
    status.className = "align-middle";
    let dot = document.createElement("span");
    let text2 = document.createElement("span");

    if(obj.status === "Online"){
        dot.className = "dot2";
        text2.innerText = " Active";
    }
    else if(obj.status === "Inactive"){
        dot.className = "dot3";
        text2.innerText = " Inactive";
    }
    else{
        dot.className = "dot1";
    }

    status.appendChild(dot);
    status.appendChild(text2);

    // --- Trash ---
    let icon = document.createElement("td");
    icon.className = "align-middle";
    let image2 = document.createElement("img");
    image2.src = "images/trash.png";
    image2.className = "trash";

    icon.appendChild(image2);

    row.appendChild(name);
    row.appendChild(expiration);
    row.appendChild(status);
    row.appendChild(icon);

    table.appendChild(row);
}