var map = L.map('map').setView([34.5, -107.5], 8);

sensorData = [];

const initialize = async () => {
  var i;
  for (i = 0; i < 20; i++) {
    const response = await fetch(`http://localhost:3000/sensors?key=9178ea6e1bfb55f9a26edbb1f292e82d&sensor=sensor${100+i}`);
    const sensor = await response.json();
    sensorData.push(sensor);
    createMarker(sensor);
  }
}

//temporary data structure for a sensor
/*
function createSensorData(id, lat, long, name, type, onlineStatus) {
  return {
    id: id,               // --unique key
    latitude: lat,        // --coordinates of sensor
    longitude: long,      // 
    name: name,           // --descriptive name of sensor location
    type: type,
    onlineStatus: onlineStatus,
    temperature: [{
      time: 0,
      value: 70
    }],      // --temperature in farenheit
    humidity: [{
      time: 0,
      value: 0.1
    }],         // --humidity; .1 = 10%
    co2: [{
      time: 0,
      value: 300
    }],             // --carbon dioxide levels in parts per million
    pressure: [{
      time: 0,
      value: 1016
    }],       // --barometric pressure in hPa
    battery: [{
      time: 0,
      value: 100
    }]
  }
}
*/

//accepts sensor data structure and creates a marker on the map for that sensor
function createMarker(sensor) {

  var latlng;

  try {
    
    //latitude and longitude are swapped between API and Leaflet
    var temp_latlng = sensor.geolocation.coordinates;
    latlng = [temp_latlng[1],temp_latlng[0]]

    var sensorIcon;
    if (sensor.status) {
      if (sensor.type == "Forest") sensorIcon = forestOnlineIcon;
      if (sensor.type == "Flood") sensorIcon = floodOnlineIcon;
      if (sensor.type == "Gateway") sensorIcon = gatewayOnlineIcon;
    }
    else {
      if (sensor.type == "Forest") sensorIcon = forestOfflineIcon;
      if (sensor.type == "Flood") sensorIcon = floodOfflineIcon;
      if (sensor.type == "Gateway") sensorIcon = gatewayOfflineIcon;
    }

    var marker = new customMarker(latlng, {icon: sensorIcon}).addTo(map);
    var popuptext = markerMouseOverGenerate(sensor);
    var popup = new L.popup({ offset:[0,15] }).setContent(popuptext);
    marker.bindPopup(popup, { showOnMouseOver: true, maxWidth: 500 });

    return marker;
  }
  catch (error) {
    console.log(error);
  }
}

//In Leaflet, Tooltips that appear when hovering over Markers work a bit stupidly: 
//Moving your mouse ONTO the Tooltip causes it to go away. This customMarker extention of the default
//Marker behavior fixes that
var customMarker = L.Marker.extend({
  
  bindPopup: function(htmlContent, options) {

    if (options && options.showOnMouseOver) {
      L.Marker.prototype.bindPopup.apply(this, [htmlContent, options]);
      this.off("click",this.openPopup, this);
      this.on("mouseover", function(e) {
        var target = e.originalEvent.fromElement || e.originalEvent.relatedTarget;
        var parent = this._getParent(target, "leaflet-popup");

        if (parent == this._popup._container)
          return true;

        this.openPopup();
      }, this);

      this.on("mouseout", function(e) {
        var target = e.originalEvent.toElement || e.originalEvent.relatedTarget;

        if (this._getParent(target, "leaflet-popup")) {
          L.DomEvent.on(this._popup._container, "mouseout", this._popupMouseOut, this);
          return true;
        }
        this.closePopup();
      }, this);
    }
  },

  _popupMouseOut: function(e) {
    L.DomEvent.off(this._popup, "mouseout", this._popupMouseOut, this);
    var target = e.toElement || e.relatedTarget;
    if (this._getParent(target, "leaflet-popup")) return true;
    if (target == this._icon) return true;

    this.closePopup();
  },

  _getParent: function(element, className) {
    var parent = element.parentNode;
    while(parent != null) {
      if (parent.className && L.DomUtil.hasClass(parent, className)) return parent;
      parent = parent.parentNode;
    }

    return false;
  }
});

//Currently, the map layer is being provided by OpenStreetMap.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*
The icons for markers are roughly based off the ones in the Figma.
TODO: 
  Edit icons to make sure they are consistent with the Figma.
  Make sure popup behavior is acceptable.
*/
var DeviceIcon = L.Icon.extend({
  options: {
    iconSize: [37,68],
    iconAnchor: [17,60],
    popupAnchor: [17,-10]
  }
});

var forestOnlineIcon = new DeviceIcon({iconUrl: './images/map/forest-online.png'}),
    forestOfflineIcon = new DeviceIcon({iconUrl: './images/map/forest-offline.png'}),
    floodOnlineIcon = new DeviceIcon({iconUrl: './images/map/flood-online.png'}),
    floodOfflineIcon = new DeviceIcon({iconUrl: './images/map/flood-offline.png'}),
    gatewayOnlineIcon = new DeviceIcon({iconUrl: './images/map/gateway-online.png'}),
    gatewayOfflineIcon = new DeviceIcon({iconUrl: './images/map/gateway-offline.png'});


//Six sensors to make sure things are good.
/*
var tempSensor1 = createSensorData(120, 34.5, -112, "FR 117", "Forest", true)
var tempMarker1 = createMarker(tempSensor1);

var tempSensor2 = createSensorData(120, 34, -112.5, "FR 118", "Forest", false)
var tempMarker2 = createMarker(tempSensor2);

var tempSensor3 = createSensorData(120, 35, -112.5, "FR 117", "Flood", true)
var tempMarker3 = createMarker(tempSensor3);

var tempSensor4 = createSensorData(120, 35.5, -112.5, "FR 118", "Flood", false)
var tempMarker4 = createMarker(tempSensor4);

var tempSensor5 = createSensorData(120, 35.5, -113, "FR 117", "Gateway", true)
var tempMarker5 = createMarker(tempSensor5);

var tempSensor6 = createSensorData(120, 34.5, -113, "FR 118", "Gateway", false)
var tempMarker6 = createMarker(tempSensor6);
*/

function markerMouseOverGenerate(sensor) {
  const temperature = Math.round(sensor.temperature.at(-1).value*100)/100;
  const humidity = Math.round(sensor.humidity.at(-1).value*10)/10;
  const pressure = Math.round(sensor.pressure.at(-1).value);

  return (
    `<div class='markerHoverBox'>
      <div class='markerHoverBoxDeviceName'>
        <h5>${sensor.name} - ${sensor.type}</h5>
      </div>
      <div class='markerHoverBoxDeviceInfo'>
        <div class='markerHoverBoxDeviceStatus'>
          <b>Interface Status</b><br>
          CO2: <span class="device-detail">1016 ppm</span><br>
          Temperature: <span class="device-detail">${temperature}C </span><br>
          Humidity: <span class="device-detail">${humidity}%</span><br>
          Barometric Pressure: <span class="device-detail">${pressure} hPa</span><br>
        </div>
        <div class='markerHoverBoxDeviceDetails'>
          <b>Device Information</b><br>
          RSSI: <span class="device-detail">-63 dBm</span><br>
          SNR: <span class="device-detail">14 dB</span><br>
          SN: <span class="device-detail">178FJWO9SKLL8</span><br>
          SF: <span class="device-detail">7</span><br>
          Battery: <span class="device-detail">100%</span><br>
          Model: <span class="device-detail">WS101</span><br>
          IMEI: <span class="device-detail">-</span><br>
          Firmware: <span class="device-detail">-</span><br>
          Group Name: <span class="device-detail">-</span><br>
          Hardware: <span class="device-detail">-</span><br>
          Device ID: <span class="device-detail">-</span><br>
          Associated Gateway: <span class="device-detail">-</span><br>
          Device EUI: <span class="device-detail">-</span><br>
        </div>
      </div>
    </div>`
  );
}

window.onload = initialize;