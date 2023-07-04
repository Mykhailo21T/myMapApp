import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert("Permission Error", "Permission to access location was denied");
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    console.log(location);
    setLong(location.coords.longitude);
    setLat(location.coords.latitude);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        showsUserLocation
        followUserLocation
        showsPointsOfInterest={false}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: long }}
          title="Mykhailo"
          description="Here I am"
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
    height: "20%",
    width: "100%"
  },
});
