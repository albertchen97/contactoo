// Geolocation.js - Get the user's current geolocation.
// YouTube Tutorial: https://www.youtube.com/watch?v=U3dLjHN0UvM&ab_channel=TGTech
// HTML Geolocation: https://www.w3schools.com/html/html5_geolocation.asp
import React from "react";
var x = document.getElementById("demo");
function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

class Geolocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longtitude: null,
      userAddress: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser!");
    }
  }
  getCoordinates(position) {
    console.log(position.coords.latitude);
    // this.setState({})
  }

  render() {
    return (
      <div className="Geolocation">
        <h2>Geolocation Page</h2>
        <button onClick={this.getLocation}>Get Coordinates</button>
        <h4>HTML5 Coordinates</h4>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longtitude: {this.state.longtitude}</p>
        <h4>Google Maps Reverse Geocoding</h4>
        <p>Address: {this.state.userAddress}</p>
      </div>
    );
  }
}
export default Geolocation;
