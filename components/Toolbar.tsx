import {
  Alert,
  Animated,
  Easing,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openUrl } from "../store/reducers/app";

const toolbar = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  toolbar: {
    position: "relative",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#18181b",
    paddingLeft: 14,
    paddingRight: 14,
  },
  button: {
    borderRadius: 999,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#f4f4f508",
    color: "#f4f4f5",
    borderRadius: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontFamily: "OptimisticDisplay",
  },
});

export default function Toolbar() {
  const app = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [minimized, setMinimized] = useState<boolean>(false);
  const toolOpacity = useRef(new Animated.Value(1)).current;
  const toolPosition = useRef(new Animated.Value(0)).current;

  interface ButtonProps extends PressableProps {}

  const Button: React.FC<ButtonProps> = ({ onPress, children, ...props }) => {
    const [isActive, setActive] = useState<boolean>(false);
    return (
      <Pressable
        style={[
          toolbar.button,
          isActive && {
            backgroundColor: "#f4f4f511",
          },
        ]}
        onPress={() =>
          Alert.alert("", "", [
            {
              text: "(っ◔◡◔)っ ♥ 🌷👑 ♥",
            },
            {
              text: "(っ◔◡◔)っ ♥ 🌷👑 ♥",
              onPress: () =>
                Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
            },
            {
              text: "(っ◔◡◔)っ ♥ 🌷👑 ♥",
              onPress: () =>
                Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
            },
          ])
        }
        onPressIn={() => setActive(true)}
        onPressOut={() => setActive(false)}
      >
        {children}
      </Pressable>
    );
  };

  function minimizeToolbar() {
    setMinimized(true);
    Animated.timing(toolOpacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
    Animated.timing(toolPosition, {
      toValue: 110,
      duration: 500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }

  function maximizeToolbar() {
    setMinimized(false);
    Animated.timing(toolOpacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
    Animated.timing(toolPosition, {
      toValue: 0,
      duration: 500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }

  const isValidURL = (string: string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  };

  function action() {
    var qry = inputValue;

    if (isValidURL(qry)) {
      if (!qry.startsWith("http")) {
        qry = "https://" + qry;
      }
    } else if (qry === "") {
      qry = "https://breezeos.github.io";
    } else {
      qry = `${
        app.searchEngine === "Bing"
          ? "https://www.bing.com/search?q="
          : app.searchEngine === "Google"
          ? "https://www.google.com/search?q="
          : app.searchEngine === "DuckDuckGo"
          ? "https://duckduckgo.com/?q="
          : app.searchEngine === "Yahoo Search"
          ? "https://search.yahoo.com/search?p="
          : ""
      }${encodeURIComponent(qry)}`;
    }

    setInputValue(qry);
    dispatch(openUrl(qry));
  }

  return (
    <Animated.View
      style={[
        toolbar.wrapper,
        {
          transform: [
            {
              translateY: toolPosition,
            },
          ],
        },
      ]}
    >
      <View style={[toolbar.toolbar, { height: 145 }]}>
        <Pressable
          style={{
            paddingTop: 6,
            paddingBottom: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={minimized ? maximizeToolbar : minimizeToolbar}
        >
          <View
            style={{
              width: 55,
              paddingTop: 3.5,
              paddingBottom: 3.5,
              backgroundColor: "#f4f4f51a",
              borderRadius: 999,
            }}
          ></View>
        </Pressable>
        <Animated.View
          style={{
            display: "flex",
            flexDirection: "column",
            opacity: toolOpacity,
            pointerEvents: minimized ? "none" : "auto",
          }}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              style={[toolbar.input, { width: "87%" }]}
              spellCheck={false}
              cursorColor="#f4f4f5"
              autoComplete="off"
              placeholder="Search with Bing or enter address..."
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              onSubmitEditing={action}
            />
            <Button>
              <Feather name="rotate-ccw" size={17} color="#f4f4f5" />
            </Button>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 6,
              paddingRight: 6,
              marginTop: 14,
            }}
          >
            <Button>
              <Feather name="chevron-left" size={26} color="#f4f4f5" />
            </Button>
            <Button>
              <Feather name="chevron-right" size={26} color="#f4f4f5" />
            </Button>
            <Button>
              <Feather name="plus" size={26} color="#f4f4f5" />
            </Button>
            <Button>
              <Feather name="menu" size={26} color="#f4f4f5" />
            </Button>
            <Button>
              <MaterialCommunityIcons
                name="checkbox-multiple-blank-outline"
                size={26}
                color="#f4f4f5"
              />
            </Button>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
