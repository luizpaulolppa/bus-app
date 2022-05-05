import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { LocationAccuracy } from "expo-location";

export default function App() {
  const [origin, setOrigin] = useState<any>();
  const [destination, setDestination] = useState();

  useEffect(() => {
    (async function () {
      const { status, permissions } = await Permissions.askAsync(
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

        //app driver
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
        //app driver
      } else {
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={origin}
        showsUserLocation
        // loadingEnabled
      >
        {/* BUS */}
        <Marker
          coordinate={{ latitude: -25.554864, longitude: -49.388363 }}
          rotation={0}
        >
          <MaterialCommunityIcons name="bus-side" size={24} color="black" />
        </Marker>

        {/* BUS STOPS */}
        <Marker
          coordinate={{ latitude: -25.556701, longitude: -49.387847 }}
          rotation={0}
        >
          <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
        </Marker>
        <Marker
          coordinate={{ latitude: -25.557796, longitude: -49.387201 }}
          rotation={0}
        >
          <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
        </Marker>
        <Marker
          coordinate={{ latitude: -25.558733, longitude: -49.388584 }}
          rotation={0}
        >
          <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
        </Marker>
        <Marker
          coordinate={{ latitude: -25.552873, longitude: -49.390159 }}
          rotation={0}
        >
          <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
        </Marker>
        <Marker
          coordinate={{ latitude: -25.554006, longitude: -49.389243 }}
          rotation={0}
        >
          <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
        </Marker>
        <Marker
          coordinate={{ latitude: -25.555342, longitude: -49.388056 }}
          rotation={0}
        >
          <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
        </Marker>
      </MapView>
    </View>
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
  },
});
