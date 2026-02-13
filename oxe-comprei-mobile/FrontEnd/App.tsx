import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import AuthScreen from "./src/views/screens/auth/AuthScreen";


export default function App() {
  return (
    // Adicione o estilo flex: 1 aqui
    <View style={styles.container}>
      <AuthScreen />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Isso faz a View ocupar a tela toda
  },
});
