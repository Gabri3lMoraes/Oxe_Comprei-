import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    // Garante que o conteúdo não cole nas bordas e espalhe os itens
    justifyContent: 'space-between', 
    paddingHorizontal: 30,
    paddingVertical: Platform.OS === 'ios' ? 0 : 40,
  },
  header: {
    marginTop: 20,
  },
  logoOxe: {
    fontSize: 70,
    fontWeight: '900',
    color: '#E8CA1B', // Amarelo do logo
    lineHeight: 70,
  },
  logoComprei: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: -10,
  },
  footer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  description: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'left', // Alinhado à esquerda como na imagem
    alignSelf: 'flex-start',
    marginBottom: 30,
    width: '80%',
  },
  button: {
    backgroundColor: '#FFF',
    width: '100%',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#F2994A', // Laranja extraído da imagem
    fontSize: 24,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#FFF',
    fontSize: 16,
  },
  signUpContainer: {
    marginTop: 10,
  },
  signUpText: {
    color: '#E8CA1B', // Amarelo para o link de cadastro
    fontWeight: 'bold',
  },
});