import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

// 1. Criamos a interface para avisar que o componente vai receber o endereço
interface MapHeaderProps {
  endereco?: string;
}

// 2. Recebemos o endereço aqui em cima, com um texto padrão de carregamento
export default function MapHeader({ endereco = "Buscando local..." }: MapHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoAndLocation}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoOxe}>oxê</Text>
          <Text style={styles.logoComprei}> comprei!</Text>
        </View>
        <TouchableOpacity style={styles.locationWrapper}>
          <Ionicons name="location-sharp" size={16} color="#FF6600" />
          
          {/* 3. Colocamos a variável aqui no lugar do texto fixo */}
          <Text style={styles.locationText}>{endereco}</Text>
          
          <MaterialIcons name="keyboard-arrow-down" size={18} color="#666" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.profileBtn}>
        <Feather name="user" size={20} color="#FF6600" />
        <View style={styles.notificationDot} />
      </TouchableOpacity>
    </View>
  );
}

// ... (Mantenha o seu StyleSheet.create exatamente igual embaixo)

const styles = StyleSheet.create({
  headerContainer: { position: 'absolute', top: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 20, zIndex: 10 },
  logoAndLocation: { backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, elevation: 5 },
  logoWrapper: { flexDirection: 'row', alignItems: 'baseline' },
  logoOxe: { color: '#FF6600', fontSize: 18, fontWeight: '900' },
  logoComprei: { color: '#333', fontSize: 16, fontWeight: '700' },
  locationWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  locationText: { color: '#666', fontSize: 12, fontWeight: '500', marginHorizontal: 4 },
  profileBtn: { backgroundColor: 'white', width: 45, height: 45, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  notificationDot: { position: 'absolute', top: 10, right: 12, width: 8, height: 8, backgroundColor: '#FFCC00', borderRadius: 4, borderWidth: 1, borderColor: '#FFF' },
});