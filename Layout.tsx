import React, { useState } from "react";
import { Appearance, Image, StyleSheet, Text, View } from "react-native";
import Toolbar from "./components/Toolbar";
import { WebView } from "react-native-webview";
import { useAppSelector } from "./store/hooks";
import Menu from "./components/Menu";

const isDark = Appearance.getColorScheme() === "dark";

const layout = StyleSheet.create({
  view: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#09090b",
    height: "100%",
    width: "100%",
  },
  iconBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    margin: "auto",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#f4f4f5",
    fontFamily: "OptimisticDisplay",
    textAlign: "center",
    fontSize: 20,
    marginTop: 165,
  },
});

export default function Layout() {
  const app = useAppSelector((state) => state.app);
  const url = useAppSelector((state) => state.app.url);
  const [splashScreen, setSplashScreen] = useState<boolean>(false);

  return (
    <View style={layout.view}>
      {!url ? (
        <>
          <View
            style={[
              layout.iconBg,
              {
                backgroundColor: app.privateMode ? "#09090b" : "#2563eb",
              },
              !splashScreen && {
                width: 130,
                height: 130,
                borderRadius: 999,
                bottom: "50%",
              },
            ]}
          >
            {app.privateMode ? (
              <Image
                style={{
                  width: splashScreen ? 200 : 130,
                  height: splashScreen ? 200 : 130,
                }}
                source={require("./assets/icons/surface-private.png")}
              />
            ) : (
              <Image
                style={{
                  width: splashScreen ? 200 : 130,
                  height: splashScreen ? 200 : 130,
                }}
                source={require("./assets/icons/surface.png")}
              />
            )}
          </View>
          <View
            style={{
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            <Text style={layout.text}>
              Search with Bing or enter address, or leave blank to get
              redirected to BreezeOS official website.
            </Text>
          </View>
        </>
      ) : (
        <View style={{ height: "100%", width: "100%", paddingTop: 55 }}>
          <WebView source={{ uri: url }} />
        </View>
      )}
      <Menu />
      <Toolbar />
    </View>
  );
}
