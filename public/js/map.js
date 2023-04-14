var map = L.map('map').setView([34.5, -112], 8);

sensorData = [];

//temporary data structure for a sensor
function createSensorData(id, lat, long, name, type, onlineStatus) {
  return {
    id: id,               // --unique key
    latitude: lat,        // --coordinates of sensor
    longitude: long,      // 
    name: name,           // --descriptive name of sensor location
    type: type,
    onlineStatus: onlineStatus,
    temperature: 70,      // --temperature in farenheit
    humidity: .1,         // --humidity; .1 = 10%
    co2: 300              // --carbon dioxide levels in parts per million
  }
}

//accepts sensor data structure and creates a marker on the map for that sensor
function createMarker(sensor) {

  //Marker Icon selection;
  //There's probably a more elegant way to do this.
  var sensorIcon;
  if (sensor.onlineStatus) {
    if (sensor.type == "Forest") sensorIcon = forestOnlineIcon;
    if (sensor.type == "Flood") sensorIcon = floodOnlineIcon;
    if (sensor.type == "Gateway") sensorIcon = gatewayOnlineIcon;
  }
  else {
    if (sensor.type == "Forest") sensorIcon = forestOfflineIcon;
    if (sensor.type == "Flood") sensorIcon = floodOfflineIcon;
    if (sensor.type == "Gateway") sensorIcon = gatewayOfflineIcon;
  }

  var marker = new customMarker([sensor.latitude, sensor.longitude], {icon: sensorIcon}).addTo(map);
  var popuptext = markerMouseOverGenerate(sensor);
  var popup = new L.popup({ offset:[0,15] }).setContent(popuptext);
  marker.bindPopup(popup, { showOnMouseOver: true });

  return marker;
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
    popupAnchor: [17,120]
  }
});

var forestOnlineIcon = new DeviceIcon({iconUrl: './images/map/forest-online.png'}),
    forestOfflineIcon = new DeviceIcon({iconUrl: './images/map/forest-offline.png'}),
    floodOnlineIcon = new DeviceIcon({iconUrl: './images/map/flood-online.png'}),
    floodOfflineIcon = new DeviceIcon({iconUrl: './images/map/flood-offline.png'}),
    gatewayOnlineIcon = new DeviceIcon({iconUrl: './images/map/gateway-online.png'}),
    gatewayOfflineIcon = new DeviceIcon({iconUrl: './images/map/gateway-offline.png'});


//Six sensors to make sure things are good.
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

function markerMouseOverGenerate(sensor) {
  return (
    `<div class='markerHoverBox'>
      <div class='markerHoverBoxDeviceName'>
        ${sensor.name} - ${sensor.type}
      </div>
      <div class='markerHoverBoxDeviceInfo'>
        <div class='markerHoverBoxDeviceStatus'>
          test text 
        </div>
        <div class='markerHoverBoxDeviceDetails'>
          test text
        </div>
      </div>
    </div>`
  );
}
