import { Dimensions, StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { LocationAccuracy } from "expo-location";

export default function App() {
  const [origin, setOrigin] = useState<any>();

  useEffect(() => {
    (async function () {
      const { status } = await Permissions.askAsync(
        Permissions.LOCATION_FOREGROUND
      );
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({
          accuracy: LocationAccuracy.High,
        });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        });

        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 1000,
            distanceInterval: 5,
          },
          (loc) => {
            console.log(loc.coords.latitude, loc.coords.longitude);
          }
        );
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={origin}
        showsUserLocation
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }
});
