// (much of this code can double in alerts.js)

function update(){
    //called on page load from listener
    console.log("This is called on page load.");

    load_reports();
}

function load_reports(){

    // temp data
    /*
    let givenJson = [{"_id": "636868574012fc7d47bfebaf","alert_id": 0,"title": "New Alert","alert": "This is a test alert","time": 1667786839503,"associated_sensor": 0}];
    //*/

    resetTable();

    //loop through json
    if(givenJson.length <= 0){
        //if no alerts found, something is wrong and call ...
        emptyRow();
    }
    else{
        for(i = 0; i < givenJson.length; i++){
            let obj = givenJson[i];
            let jsonText = JSON.stringify(obj);
            //add row for each new data 
            createRow(jsonText);
        }
    }

}

function resetTable(){
    let tempTable = document.getElementById("table-body");
    tempTable.innerHTML = null; 
}

function emptyRow(){
    let table = document.getElementById("table-body");// remember to give table an id
    let row = document.createElement("tr");
    // id section
    let id = document.createElement("th")
    id.className = "align-middle";
    id.setAttribute("scope","row");

    // title section
    let title = document.createElement("td");
    title.className = "align-middle";

    // enabled
    let enable = document.createElement("td");
    enable.className = "align-middle";
    enable.innerText = "You do not have any reports.";

    // Operation
    let operation = document.createElement("td");
    operation.className = "align-middle";

    //end
    let end = document.createElement("td");
    end.className = "align-middle";

    // Connecting new elements
    row.appendChild(id);
    row.appendChild(title);
    row.appendChild(enable);
    row.appendChild(operation);
    row.appendChild(end);

    table.appendChild(row);
}

function createRow(alertText){
    
    // Note: organize by time

    // id = alert_id
    // title = title 
    // Enable = alert 
    // Operation = time

    const obj = JSON.parse(alertText)

    let table = document.getElementById("table-body");// remember to give table an id
    let row = document.createElement("tr");

    // id (th)
    let id = document.createElement("th")
    id.innerText = obj.alert_id;
    id.className = "align-middle";
    id.setAttribute("scope","row");

    // title 
    let title = document.createElement("td");
    title.innerText = obj.title;
    title.className = "align-middle";

    // enabled
    let enable = document.createElement("td");
    enable.innerText = ""; // obj.description?
    enable.className = "align-middle";

    // Operation
    let operation = document.createElement("td");
    operation.innerText = ""; // obj.description?
    operation.className = "align-middle";

    //end
    let end = document.createElement("td");
    end.className = "align-middle";

    // Connecting new elements
    row.appendChild(id);
    row.appendChild(title);
    row.appendChild(enable);
    row.appendChild(operation);
    row.appendChild(end);

    table.appendChild(row);
}
