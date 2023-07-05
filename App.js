import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Slider, Icon } from "@rneui/themed";

export default function App() {
  const [long, setLong] = useState(10);
  const [lat, setLat] = useState(44);
  const [radius, setRadius] = useState(1000);
  const [value, setValue] = useState(0);
  const mapView = useRef(null);

  const interpolate = (start, end) => {
    let k = (value - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    mapView.current?.animateToRegion(
      {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
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
          title="title"
          description="Here I am"
        />
        <Circle
          center={{ latitude: lat, longitude: long }}
          radius={radius}
          strokeColor="orange"
          strokeWidth={3}
        />
      </MapView>
      <View style={[styles.contentView]}>
        <Slider
          value={value}
          onValueChange={setValue, setRadius}
          maximumValue={1000}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="heartbeat"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color={color()}
              />
            ),
          }}
        />
      </View>
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
    height: "50%",
    width: "100%",
  },
  contentView: {
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
});
