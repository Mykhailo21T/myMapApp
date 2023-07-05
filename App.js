import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [long, setLong] = useState(10);
  const [lat, setLat] = useState(44);
  const [radius, setRadius] = useState(1500);
  const mapView = useRef(null);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    mapView.current?.animateToRegion(
      {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      },
      250
    );
  }, [mapView.current, lat, long]);

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
        ref={mapView}
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
        <Circle center={{ latitude: lat, longitude: long }} radius={radius} />
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
    height: "100%",
    width: "100%",
  },
});
