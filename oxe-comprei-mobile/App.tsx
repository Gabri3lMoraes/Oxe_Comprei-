import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import AuthScreen from "../oxe-comprei-mobile/src/screens/auth/AuthScreen";
import Mapa from "../oxe-comprei-mobile/src/screens/MapHome/Mapa"
import ExploreHome from "@/screens/ExploreHome/ExploreHome";
import Routes from './src/routes'; 
export default function App() {
  return (
    
    <View style={styles.container}>
      <Routes />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
