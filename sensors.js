
const key = 0;

function update(){
    //called on page load from listener
    console.log("This is called on page load.");

    //use this to call other functions as needed.
    //how to pull up everysensor without names?

}

function load_sensor(){
    // would we want to use js to pull up all sensors?
    // page shows: status, device name, interface Status, last update

    //make restful call
    //call which? would need names of sensor

    // read the json
    const givenJson = ""; //given JSON info of sensor from call
    const obj = JSON.parse(givenJson);

    // online? how to get status? 
    // obj.name = device name and obj.sensor_id as well
    // interface status
        // CO2 = obj.co2  is this an array?
        // temp = obj.temperature
        // humidity = obj.humidity
        // presure = obj.pressure
    // how to get last update?

    //------------ Below creates new row ((IP)) -----------//

    let table = document.getElementsByID("");// remember to give table an id
    let row = document.createElement("tr");

    // device name section
    let device_name = document.createElement("td");
    device_name.className = "align-middle";
    let name = document.createElement("div");
    name.innerText = obj.name;
    let id = document.createElement("div");
    id.innerText = obj.sensor_id;

    device_name.appendChild(name);
    device_name.appendChild(id);

    // interface status section
    let interface_status = document.createElement("td");
    interface_status.className = "align-middle";
    let c1 = document.createElement("div");
    c1.className = "col-2";
    let c1_value = document.createElement("div");
    c1_value.className = "row";
    c1_value.style = "font-weight: bold"
    c1_value.innerText = obj.co2;
    let c1_name = document.createElement("div");
    c1_value.className = "row";
    c1_value.style = "font-size: 12px"
    c1_value.innerText = "CO2";

    c1.appendChild(c1_value);
    c1.appendChild(c1_name);

    let c2 = document.createElement("div");
    c2.className = "col-2";
    let c2_value = document.createElement("div");
    c2_value.className = "row";
    c2_value.style = "font-weight: bold"
    c2_value.innerText = obj.temperature;
    let c2_name = document.createElement("div");
    c2_value.className = "row";
    c2_value.style = "font-size: 12px"
    c2_value.innerText = "Temperature";

    c2.appendChild(c2_value);
    c2.appendChild(c2_name);

    let c3 = document.createElement("div");
    c3.className = "col-2";
    let c3_value = document.createElement("div");
    c3_value.className = "row";
    c3_value.style = "font-weight: bold"
    c3_value.innerText = obj.humidity;
    let c3_name = document.createElement("div");
    c3_value.className = "row";
    c3_value.style = "font-size: 12px"
    c3_value.innerText = "Humidity";

    c3.appendChild(c3_value);
    c3.appendChild(c3_name);

    let c4 = document.createElement("div");
    c4.className = "col-2";
    let c4_value = document.createElement("div");
    c3_value.className = "row";
    c3_value.style = "font-weight: bold"
    c3_value.innerText = obj.pressure;
    let c4_name = document.createElement("div");

    c4.appendChild(c4_value);
    c4.appendChild(c4_name);

    // end section
    let last_update = document.createElement("td");
    last_update.className = "align-middle";
    last_update.innerText = "test";
    let graph = document.createElement("td");
    graph.className = "align-middle";
    //add image to graph

    // connect sections
    row.appendChild(device_name);
    row.appendChild(interface_status);
    row.appendChild(last_update);
    row.appendChild(graph);

    table.appendChild(row);
}

function search_sensors(){
    // GET "/sensors?key=val&sensor=val"
    // Returns all sensors with name of sensor

    var deviceName = document.getElementsByClassName("form-control searchDevice");
    console.log("searching for deviceName: " + deviceName);

    var request = new XMLHttpRequest();
    //start of url needed!!!!!!!!!!!!!!!!!
    const url = "" + "/sensors?key=" + key
                    + "&sensor=" + deviceName;
    //request.open("GET", url);
    request.send();
    request.onload = () => {
        alert(request.response);
        console.log(request.response)

        // would need to only show relevant elements

    } 
}