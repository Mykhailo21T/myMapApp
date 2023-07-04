import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  useEffect(() => {
    // Accepts the current latitude and longitude
    // and updates the state variables
    function setPosition({ coords: { latitude, longitude } }) {
      setLongitude(longitude);
      setLatitude(latitude);
    }

    // Use navigator to get access to the devices' GPS
    console.log(navigator);
    navigator.geolocation.getCurrentPosition(setPosition);

    // Update the coordinates as the device is moved
    let watcher = navigator.geolocation.watchPosition(
      setPosition,
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    // When the component is unmounted, clear the watcher
    // since it is no longer necessary to track location
    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        showsUserLocation
        followUserLocation
        showsPointsOfInterest={false}
      >
        <Marker
          title="Seneca College Newnham Campus"
          description="Educational Institute"
          coordinate={{ latitude: latitude, longitude: longitude }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
  },

  mapView: {
    alignSelf: "stretch",
    height: "100%",
  },
});
