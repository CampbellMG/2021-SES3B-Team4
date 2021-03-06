import React, { Component } from "react";
import GlobalLayout from "../Components/GlobalLayout";
import { Typography, makeStyles } from "@material-ui/core";

import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  HeatMap,
} from "google-maps-react";

import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";


const mapStyles = {
  width: "100%",
  height: "100%",
  position: "relative",
};

class LocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      currentLatLng: {
        lat: 0,
        lng: 0,
        zoom: 15,
      },
      clickedMarker: {
        lat: 0,
        lng: 0,
        zoom: 15,
      },
      open: false,
      readyMap: false,
      positions: [],
      finishPos: false,
      reportedCovidCases: [],
    };

    this.mapClicked = this.mapClicked.bind(this);
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getGeoLocation();
    }, 2000);

    setTimeout(() => {}, 2000);
  };

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState((prevState) => ({
            currentLatLng: {
              ...prevState.currentLatLng,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            readyMap: true,
          }));
        },
        function error(msg) {
          alert(msg);
          this.setState({ readyMap: true });
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Get current location error");
    }
  };

  mapClicked(mapProps, map, clickEvent) {
    console.log("CLICKEVENT", clickEvent.latLng.lat(), clickEvent.latLng.lng());
    this.setState({
      clickedMarker: {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng(),
      },
    });
  }

  render() {
    return (
      <div>
        {this.state.readyMap ? (
          <Map
            className="map"
            style={{ height: "100%", position: "relative", width: "100%" }}
            google={this.props.google}
            zoom={this.state.zoom}
            style={mapStyles}
            initialCenter={{
              lat: this.state.currentLatLng.lat,
              lng: this.state.currentLatLng.lng,
            }}
            onClick={this.mapClicked}
          >
            <Marker
              label={"Current Location"}
              name={"Current Location"}
              position={this.state.currentLatLng}
            />
          </Map>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(
  GoogleApiWrapper({
    apiKey: "AIzaSyB9txFFascb8Jcj8qV6ET2mtXZtwqqzMiU",
    libraries: ["visualization"],
  })(LocationPage)
);
