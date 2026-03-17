import React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../routes/AppRoutes"; 
import { styles } from "./Initial.style";
import BackgroundHome from "../../../../assets/images/background-home.webp";

export default function InitialScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={BackgroundHome}
      style={styles.background}
      resizeMode="cover"
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20,
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.logoOxe}>oxê</Text>
          <Text style={styles.logoComprei}>comprei</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.description}>
            Compre fácil, compre local, só compre Oxê.
          </Text>

          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Auth", { screenMode: 'login' })}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Não tem conta?{" "}
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate("Auth", { screenMode: 'register' })}
            >
              Cadastre-se agora.
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}