// Geolocation.js - Get the user's current geolocation.
// YouTube Tutorial: https://www.youtube.com/watch?v=U3dLjHN0UvM&ab_channel=TGTech
// HTML Geolocation: https://www.w3schools.com/html/html5_geolocation.asp
import React from "react";
// var x = document.getElementById("demo");
// function showPosition(position) {
//   x.innerHTML =
//     "Latitude: " +
//     position.coords.latitude +
//     "<br>Longitude: " +
//     position.coords.longitude;
// }

class Geolocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser!");
    }
  }
  getCoordinates(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }
  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert(
          "You denied the request for Geolocation. Please enable it in your browser setting to use the live location feature."
        );
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  render() {
    return (
      <div className="Geolocation">
        <h2>Geolocation Page</h2>
        <button onClick={this.getLocation}>Get Coordinates</button>
        <h4>HTML5 Coordinates</h4>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longtitude: {this.state.longitude}</p>
        <h4>Google Maps Reverse Geocoding</h4>
        <p>Address: {this.state.userAddress}</p>
        {
          // render the map if the geolocation is available; else do nothing
          this.state.latitude && this.state.longitude ? (
            <img
              src={
                // render the map using the Google Maps API with the registered API key
                "https://maps.googleapis.com/maps/api/staticmap?center=$()"
              }
              alt=""
            />
          ) : null
        }
      </div>
    );
  }
}
export default Geolocation;
