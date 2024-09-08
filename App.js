import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Stack from './Navigation/Stack';
import Drawer from './Navigation/Drawer';
export default function App() {
  return (
    <NavigationContainer>
      <Drawer/>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}