function update(){
    console.log("page load");

    //called when you load page
    load_billing_history();
}

function load_billing_history(){

    //get restful call to load billing

    //GET: /users/:user_id/bills	
    // Returns list of bills belonging to the indicated user_id


}

function add_row(jsonText){

    const obj = JSON.parse(jsonText);
    
    let table = document.getElementById("table_body");
    let row = document.createElement("tr");

    // --- Invoice ---
    let invoice = document.createElement("td");
    invoice.setAttribute("scope","row");
    invoice.className = "align-middle";
    let num = "#000" // get number
    let date = "12/2022" // get date
    invoice.innerText = "Invoice " + num + " - " + date; 

    // --- Billing Date --- 
    let billing_date = document.createElement("td");
    billing_date.className = "align-middle";
    billing_date.innerText = "12/01/2022" //get billing date

    // --- Status ---
    let status = document.createElement("td");
    status.className = "align-middle";
    let dot = document.createElement("span");
    let text2 = document.createElement("span");

    if(obj.status === "Paid"){
        dot.className = "dot2";
        text2.innerText = " Paid";
    }
    else if(obj.status === "Unpaid"){
        dot.className = "dot3";
        text2.innerText = " Unpaid";
    }
    else{
        dot.className = "dot1";
        text2.innerText = " Error"
    }

    status.appendChild(dot);
    status.appendChild(text2);

    // --- Amount ---
    let amount = document.createElement("td");
    amount.className = "align-middle";
    amount.innerText = "$100.00 CAD"; //get amount

    row.appendChild(invoice);
    row.appendChild(billing_date);
    row.appendChild(status);
    row.appendChild(amount);

    table.appendChild(row);

}