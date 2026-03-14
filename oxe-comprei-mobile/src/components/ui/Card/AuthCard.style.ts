import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    // Sombras para dar profundidade ao card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 24,
    textAlign: "center",
  },
  form: {
    gap: 12, // Espaçamento entre os inputs (RN 0.71+)
  },
  input: {
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E1E8ED",
    marginBottom: 4, // Backup caso o gap não funcione
  },
  mainButton: {
    backgroundColor: "#FF7B2A",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#FF7B2A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  switchButton: {
    marginTop: 16,
    alignItems: "center",
  },
  switchText: {
    color: "#FF7B2A",
    fontSize: 14,
    fontWeight: "600",
  },
});