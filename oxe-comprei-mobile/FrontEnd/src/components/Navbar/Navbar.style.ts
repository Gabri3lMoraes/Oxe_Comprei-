import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: '15%',
    right: '15%',
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
    // Sombras
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  
  // Botões laterais (Mapa e Perfil)
  iconButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Botão Central (Home) - Sempre maior e elevado
  homeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#f2f2f2',
    // A cor de fundo será dinâmica no arquivo .tsx
  },

  // Tamanho padrão dos ícones
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  }
});