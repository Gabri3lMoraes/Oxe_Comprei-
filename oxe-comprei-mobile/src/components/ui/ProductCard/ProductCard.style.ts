import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: 160, // Largura fixa para scroll horizontal
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 8,
    marginRight: 15, // Espaço entre cards
    marginBottom: 10,
    
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  soldText: {
    fontSize: 10,
    color: '#999',
  },
  storeName: {
    fontSize: 10,
    color: '#FF9000', // Laranja da marca
    fontWeight: 'bold',
    marginTop: 4,
  },
  distance: {
    fontSize: 10,
    color: '#FF9000',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9000',
    marginTop: 4,
  },
});