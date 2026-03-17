import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import AuthScreen from "../oxe-comprei-mobile/src/screens/auth/AuthScreen";
import Mapa from "../oxe-comprei-mobile/src/screens/MapHome/Mapa"

export default function App() {
  return (
    // Adicione o estilo flex: 1 aqui
    <View style={styles.container}>
      <Mapa />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Isso faz a View ocupar a tela toda
  },
});
