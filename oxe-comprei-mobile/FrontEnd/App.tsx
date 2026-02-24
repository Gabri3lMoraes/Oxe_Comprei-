import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { AppRoutes } from "./src/routes/AppRoutes";



export default function App() {
  return (
    // Adicione o estilo flex: 1 aqui
    <NavigationContainer>
      <AppRoutes />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Isso faz a View ocupar a tela toda
  },
});
