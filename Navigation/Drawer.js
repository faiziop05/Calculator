import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../Screen/Home";
const { Navigator, Screen } = createDrawerNavigator();
import Stack from "./Stack";
const Drawer = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Stack" component={Stack} />
    </Navigator>
  );
};

export default Drawer;
