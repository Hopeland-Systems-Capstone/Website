

function update(){
    //called on page load from listener
    console.log("This is called on page load.");

    //use this to call other functions as needed.
    //how to pull up everysensor without names?

}

function load_sensor(){
    // would we want to use js to pull up all sensors?

    //make restful call
    //call which? would need names of sensor

    // read the json 
    //loop thru array of JSON

    // below is temp data
    const givenJson = 
        [{"_id":"63785425c97a925662a44651", "sensor_id":0, "name": "sensor1", "status":"Online","last_update":1668896333401,"geolocation":{"type": "Point","coordinates": [0,0]},"battery": [{"time": 1668896333401,"value": 100}],"temperature": [26.8],"humidity": [45],"co2": [400],"pressure": [1019]},
        {"_id":"63785425c97a925662a44651", "sensor_id":3, "name": "sensor2", "status":"Online","last_update":1668896333401,"geolocation":{"type": "Point","coordinates": [0,0]},"battery": [{"time": 1668896333401,"value": 100}],"temperature": [20.8],"humidity": [45],"co2": [400],"pressure": [1019]}]; 

    resetTable();

    // loop thru and generate row as needed.
    if(givenJson.length <= 0){
        //if no sensors found, something is wrong and call ...
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

    let online = document.createElement("th");
    online.setAttribute("scope","row");
    online.className = "align-middle";

    let device_name = document.createElement("td");
    device_name.className = "align-middle";

    // error message (goes in interface status section)
    let error = document.createElement("td");
    //error.setAttribute("scope","row");
    error.className = "align-middle";
    error.innerText = "There was an issue gathering sensor data";

    let last_update = document.createElement("td");
    last_update.className = "align-middle";

    let graph = document.createElement("td");
    graph.className = "align-middle";

    row.appendChild(online);
    row.appendChild(device_name);
    row.appendChild(error);
    row.appendChild(last_update);
    row.appendChild(graph);

    table.appendChild(row);
}

// create row for sensors
function createRow(jsonText){ 
    
    // online? how to get status? 
    // obj.name = device name and obj.sensor_id as well
    // interface status
        // CO2 = obj.co2  is this an array?
        // temp = obj.temperature
        // humidity = obj.humidity
        // presure = obj.pressure
    // how to get last update?

    const obj = JSON.parse(jsonText)

    let table = document.getElementById("table-body");// remember to give table an id
    let row = document.createElement("tr");

    // need status section... how?
    let online = document.createElement("th");
    online.setAttribute("scope","row");
    online.className = "align-middle";
    let dot = document.createElement("span");

    //if online
    //dot.className = "dot2";
    // if inactive 
    dot.className = "dot3";
    // if "warning"? (orange option)
    //dot.className = "dot1";

    let text = document.createElement("span");
    text.innerText = " Online";

    online.appendChild(dot);
    online.appendChild(text);

    // device name section
    let device_name = document.createElement("td");
    device_name.className = "align-middle";
    let name = document.createElement("div");
    name.innerText = obj.name;                  // grabbing JSON obj.name 
    let id = document.createElement("div");
    // is this supposed to be _id or sensor_id
    id.innerText = obj.sensor_id;               // grabbing JSON obj.sensor_id 

    device_name.appendChild(name);
    device_name.appendChild(id);

    // interface status section
    let interface_status = document.createElement("td");
    interface_status.className = "align-middle";

    let data_row = document.createElement("div")
    data_row.className = "row";

    // co2 section
    let c1 = document.createElement("div");
    c1.className = "col-2";
    let c1_value = document.createElement("div");
    c1_value.className = "row";
    c1_value.style = "font-weight: bold";
    c1_value.innerText = obj.co2 + " ppm";        // grabbing JSON obj.co2
    let c1_name = document.createElement("div");
    c1_name.className = "row";
    c1_name.style = "font-size: 12px";
    c1_name.innerText = "CO2";

    c1.appendChild(c1_value);
    c1.appendChild(c1_name);

    data_row.appendChild(c1);

    // temperature section
    let c2 = document.createElement("div");
    c2.className = "col-2";
    let c2_value = document.createElement("div");
    c2_value.className = "row";
    c2_value.style = "font-weight: bold";
    c2_value.innerText = obj.temperature + "C";     // grabbing JSON obj.temperature 
    let c2_name = document.createElement("div");
    c2_name.className = "row";
    c2_name.style = "font-size: 12px";
    c2_name.innerText = "Temperature";

    c2.appendChild(c2_value);
    c2.appendChild(c2_name);

    data_row.appendChild(c2);

    // humidity section
    let c3 = document.createElement("div");
    c3.className = "col-2";
    let c3_value = document.createElement("div");
    c3_value.className = "row";
    c3_value.style = "font-weight: bold";
    c3_value.innerText = obj.humidity + "%";          // grabbing JSON obj.humidity 
    let c3_name = document.createElement("div");
    c3_name.className = "row";
    c3_name.style = "font-size: 12px";
    c3_name.innerText = "Humidity";

    c3.appendChild(c3_value);
    c3.appendChild(c3_name);

    data_row.appendChild(c3);

    // pressure section 
    let c4 = document.createElement("div");
    c4.className = "col-2";
    let c4_value = document.createElement("div");
    c4_value.className = "row";
    c4_value.style = "font-weight: bold";
    c4_value.innerText = obj.pressure + "hPa";          // grabbing JSON obj.pressure 
    let c4_name = document.createElement("div");
    c4_name.className = "row";
    c4_name.style = "font-size: 12px";
    c4_name.innerText = "Barometric Pressure";

    c4.appendChild(c4_value);
    c4.appendChild(c4_name);

    data_row.appendChild(c4);

    interface_status.appendChild(data_row);

    // last update section
    let last_update = document.createElement("td");
    last_update.className = "align-middle";
    last_update.innerText = "test";             // would need info on last update...
    

    // end section
    let graph = document.createElement("td");
    graph.className = "align-middle";
    let image1 = document.createElement("img");
    image1.src = "images/smallGraph.png";
    let image2 = document.createElement("img");
    image2.src = "images/iIcon.png";
    // Probably will need to add links to images

    graph.appendChild(image1);
    graph.appendChild(image2);

    // connect sections
    row.appendChild(online);
    row.appendChild(device_name);
    row.appendChild(interface_status);
    row.appendChild(last_update);
    row.appendChild(graph);

    table.appendChild(row);
}

function search_sensors(){

    console.log("running search");

    var input, filter, table, tr, td, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("sensors-table");
    tr = table.getElementsByTagName("tr");

    // Note: Currently, only searches sensor names.

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}