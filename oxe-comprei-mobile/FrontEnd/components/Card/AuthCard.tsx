import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Register() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER - Título Estilizado */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            <Text style={styles.oxeText}>oxê</Text>
            <Text style={styles.compreiText}>comprei</Text>
          </View>
          <Text style={styles.subtitle}>Olá Bem vindo ao Oxê Comprei</Text>
        </View>

        {/* CARD DINÂMICO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{isRegister ? "Cadastro" : "Login"}</Text>

          <View style={styles.form}>
            {isRegister && (
              <>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="account-outline" size={22} color="#888" />
                  <TextInput placeholder="Nome Completo" style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="phone-outline" size={22} color="#888" />
                  <TextInput placeholder="Telefone" style={styles.input} keyboardType="phone-pad" />
                </View>
              </>
            )}

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="email-outline" size={22} color="#888" />
              <TextInput 
                placeholder={isRegister ? "E-mail" : "Email/CPF"} 
                style={styles.input} 
                autoCapitalize="none"
              />
            </View>

            {isRegister && (
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="card-account-details-outline" size={22} color="#888" />
                <TextInput placeholder="CPF" style={styles.input} keyboardType="numeric" />
              </View>
            )}

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="lock-outline" size={22} color="#888" />
              <TextInput placeholder="Senha" style={styles.input} secureTextEntry />
            </View>

            {!isRegister && (
              <TouchableOpacity style={styles.forgotPass}>
                <Text style={styles.forgotText}>Esqueceu senha?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.mainButton}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>

            {!isRegister && (
              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialIcon} >
                  <Image 
                    source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} 
                    style={styles.iconImg} 
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Image 
                    source={{ uri: 'https://img.icons8.com/color/48/000000/facebook-new.png' }} 
                    style={styles.iconImg} 
                  />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity 
              onPress={() => setIsRegister(!isRegister)}
              style={styles.footer}
            >
              <Text style={styles.footerText}>
                {isRegister ? "Já tem conta? " : "Não tem conta? "}
                <Text style={styles.linkText}>{isRegister ? "Faça login" : "Cadastre-se"}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEEDC", // Cor de fundo pêssego suave da imagem
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: "#F27D31", // Laranja vibrante
    paddingTop: 60,
    paddingBottom: 80,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
  },
  brandContainer: {
    alignItems: "center",
  },
  oxeText: {
    fontSize: 80,
    fontWeight: "900",
    color: "#FFD700", // Amarelo
    lineHeight: 80,
  },
  compreiText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: -10,
  },
  subtitle: {
    color: "#FFF",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 35,
    padding: 30,
    width: "90%",
    marginTop: -50, // Faz o card "subir" para cima do fundo laranja
    alignSelf: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  form: { gap: 15 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  forgotPass: {
    alignSelf: "flex-end",
  },
  forgotText: {
    color: "#F27D31",
    fontSize: 12,
    fontWeight: "bold",
  },
  mainButton: {
    backgroundColor: "#F27D31",
    borderRadius: 15,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
  },
  socialIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconImg: {
    width: 30,
    height: 30,
  },
  footer: {
    marginTop: 15,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    color: "#F27D31",
    fontWeight: "bold",
  },
});