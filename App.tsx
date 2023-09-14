import { SafeAreaView, View } from "react-native";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ width: "100%", height: "100%" }}>
        <Layout />
      </View>
    </Provider>
  );
}
