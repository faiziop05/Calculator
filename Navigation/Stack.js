import { createStackNavigator } from "@react-navigation/stack";
import  Home  from "../Screen/Home";
const { Navigator, Screen } = createStackNavigator();
const Stack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};

export default Stack;
