import { SafeAreaView, View } from "react-native";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "./store";
import { useFonts } from "expo-font";

export default function App() {
  const [loadFont] = useFonts({
    OptimisticDisplayLight: require("./assets/fonts/UwoTM2u9U6b.ttf"),
    OptimisticDisplay: require("./assets/fonts/gJ8wmjmQhMa.ttf"),
    OptimisticDisplayMedium: require("./assets/fonts/jfwoHaS3i0K.ttf"),
    OptimisticDisplayBold: require("./assets/fonts/WXBYOaYZuYu.ttf"),
    OptimisticDisplayBlack: require("./assets/fonts/0wcuDYQ2laN.ttf"),
  });

  if (!loadFont) return null;

  return (
    <Provider store={store}>
      <View style={{ width: "100%", height: "100%" }}>
        <Layout />
      </View>
    </Provider>
  );
}
