import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width: width,
    height: 180, // Altura aproximada do banner na imagem
    backgroundColor: '#FF9000', // Cor de fallback caso a imagem falhe
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});