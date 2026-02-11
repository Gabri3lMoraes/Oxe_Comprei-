import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native"; // Importe StyleSheet
import Register from "./src/screens/auth/Register/Register";

export default function App() {
  return (
    // Adicione o estilo flex: 1 aqui
    <View style={styles.container}>
      <Register />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Isso faz a View ocupar a tela toda
  },
});