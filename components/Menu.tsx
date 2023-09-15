import {
  Animated,
  DimensionValue,
  Easing,
  Pressable,
  PressableProps,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useRef, useState } from "react";
import { setMenuActive, setPrivateMode } from "../store/reducers/app";
import { Ionicons } from "@expo/vector-icons";

const menu = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000aa",
    display: "flex",
    alignItems: "center",
  },
  menu: {
    position: "absolute",
    marginBottom: 5,
    width: "98%",
    height: "78%",
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#0f0d10",
  },
  menuButton: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 999,
    marginBottom: 10,
  },
  menuSection: {
    width: "100%",
    backgroundColor: "#27272a50",
    borderRadius: 999,
    padding: 3,
    display: "flex",
    flexDirection: "row",
  },
  menuSectionButton: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
});

export default function Menu() {
  const dispatch = useAppDispatch();
  const [section, setSection] = useState<string>("Settings");
  const app = useAppSelector((state) => state.app);
  const menuIsActive = useAppSelector((state) => state.app.menuIsActive);
  const menuBgOpacity = useRef(new Animated.Value(0)).current;
  const menuPosition = useRef(new Animated.Value(-60)).current;

  useEffect(() => {
    if (menuIsActive) {
      Animated.timing(menuBgOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(menuPosition, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(menuBgOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(menuPosition, {
        toValue: -60,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [menuIsActive]);

  const MenuButton: React.FC<PressableProps> = ({
    onPress,
    children,
    ...props
  }) => {
    const [isActive, setActive] = useState<boolean>(false);

    return (
      <Pressable
        style={[
          menu.menuButton,
          isActive && {
            backgroundColor: "#f4f4f508",
          },
        ]}
        onPress={onPress}
        onPressIn={() => setActive(true)}
        onPressOut={() => setActive(false)}
        {...props}
      >
        {children}
      </Pressable>
    );
  };

  interface MenuSectionButtonProps extends PressableProps {
    active?: boolean;
    noFlex?: boolean;
    width?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
  }

  const MenuSectionButton: React.FC<MenuSectionButtonProps> = ({
    onPress,
    active,
    noFlex = false,
    children,
    width,
    height,
    ...props
  }) => {
    const [isActive, setActive] = useState<boolean>(false);
    return (
      <Pressable
        style={[
          menu.menuSectionButton,
          isActive && {
            backgroundColor: "#27272a50",
          },
          active && {
            backgroundColor: "#27272a50",
          },
          {
            width: width,
            height: height,
            flex: noFlex ? 0 : 1,
          },
        ]}
        onPress={onPress}
        onPressIn={() => setActive(true)}
        onPressOut={() => setActive(false)}
        {...props}
      >
        {children}
      </Pressable>
    );
  };

  function switchPrivateMode() {
    dispatch(setPrivateMode(!app.privateMode));
  }

  const switchTab = () => {
    switch (section) {
      case "Settings":
        return (
          <>
            <View style={menu.menuButton}>
              <Text
                style={{
                  fontFamily: "OptimisticDisplayBold",
                  fontSize: 16,
                  color: "#f4f4f5",
                }}
              >
                Private mode
              </Text>
              <Switch
                trackColor={{ true: "#2563eb" }}
                onValueChange={switchPrivateMode}
                value={app.privateMode}
              />
            </View>
          </>
        );
    }
  };

  return (
    <Animated.View
      style={[
        menu.background,
        {
          opacity: menuBgOpacity,
          pointerEvents: menuIsActive ? "auto" : "none",
        },
      ]}
    >
      <Animated.View
        style={[
          menu.menu,
          {
            bottom: menuPosition,
          },
        ]}
      >
        <View
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <View style={menu.menuSection}>
            <MenuSectionButton
              width="100%"
              height={38}
              active={section === "Favorites"}
              onPress={() => setSection("Favorites")}
            >
              <Text
                style={{
                  color: "#f4f4f5",
                  fontFamily: "OptimisticDisplay",
                  fontSize: 12.5,
                }}
              >
                Favorites
              </Text>
            </MenuSectionButton>
            <MenuSectionButton
              width="100%"
              height={38}
              active={section === "Settings"}
              onPress={() => setSection("Settings")}
            >
              <Text
                style={{
                  color: "#f4f4f5",
                  fontFamily: "OptimisticDisplay",
                  fontSize: 12.5,
                }}
              >
                Settings
              </Text>
            </MenuSectionButton>
            <MenuSectionButton
              width="100%"
              height={38}
              active={section === "History"}
              onPress={() => setSection("History")}
            >
              <Text
                style={{
                  color: "#f4f4f5",
                  fontFamily: "OptimisticDisplay",
                  fontSize: 12.5,
                }}
              >
                History
              </Text>
            </MenuSectionButton>
            <MenuSectionButton
              width={38}
              height={38}
              noFlex
              onPress={() => dispatch(setMenuActive(false))}
            >
              <Ionicons name="close" size={23} color="#f4f4f5" />
            </MenuSectionButton>
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            {switchTab()}
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
