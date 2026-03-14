import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Certifique-se de ter instalado
import { styles } from './Search.style';

export const Search = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="search" size={24} color="#000" />
      </TouchableOpacity>
      <TextInput 
        style={styles.input}
        placeholder="Buscar"
        placeholderTextColor="#999"
      />
    </View>
  );
};