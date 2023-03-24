
const key = 0;

function update(){
    //called on page load from listener
    console.log("This is called on page load.");
}

function load_sensors(){
    // would we want to use js to pull up all sensors?
}

function search_sensors(){
    // GET "/sensors?key=val&sensor=val"
    // Returns all sensors with name of sensor

    var deviceName = document.getElementsByClassName("form-control searchDevice");
    console.log("searching for deviceName: " + deviceName);

    var request = new XMLHttpRequest();
    const url = "" + "/sensors?key=" + key
                    + "&sensor=" + deviceName;
    //request.open("GET", url);
    request.send();
    request.onload = () => {
        //alert(request.response);
        console.log(request.response)

        // would need to only show relevant elements

    } 
}
