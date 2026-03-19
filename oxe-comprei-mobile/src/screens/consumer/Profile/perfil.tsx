import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Componente reutilizável para os itens do menu para o código ficar limpo
const MenuItem = ({ icone, titulo, subtitulo, color = "#FF6600" }: { icone: any, titulo: string, subtitulo: string, color?: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuIconBg}>
      <Feather name={icone} size={20} color={color} />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{titulo}</Text>
      <Text style={styles.menuSub}>{subtitulo}</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#CCC" />
  </TouchableOpacity>
);

export default function Perfil() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* CABEÇALHO LARANJA */}
        <View style={styles.headerOrange}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity><Feather name="arrow-left" size={24} color="#FFF" /></TouchableOpacity>
            <Text style={styles.headerTitle}>Meu Perfil</Text>
            <View style={{ width: 24 }} /> {/* Espaçador para centralizar o título */}
          </View>

          <View style={styles.userInfoRow}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Paulo gabriel</Text>
              <Text style={styles.userEmail}>gpmorenogabriel@gmail.com</Text>
              <View style={styles.locationRow}>
                <Feather name="map-pin" size={12} color="#FFF" />
                <Text style={styles.userLocation}>Boa Vista, Recife</Text>
              </View>
            </View>
          </View>
        </View>

        {/* CARD DE ESTATÍSTICAS (Flutuando) */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Avaliações</Text>
          </View>
        </View>

        {/* MENU: MINHA CONTA */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Minha Conta</Text>
          <MenuItem icone="shopping-bag" titulo="Meus Pedidos" subtitulo="Acompanhe suas compras" />
          <MenuItem icone="heart" titulo="Favoritos" subtitulo="Lojas e produtos salvos" />
          <MenuItem icone="map-pin" titulo="Endereços" subtitulo="Gerencie seus endereços" />
          <MenuItem icone="star" titulo="Avaliações" subtitulo="Suas avaliações de lojas" />
        </View>

        {/* MENU: CONFIGURAÇÕES */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          <MenuItem icone="bell" titulo="Notificações" subtitulo="Preferências de alertas" />
          <MenuItem icone="settings" titulo="Configurações" subtitulo="Conta e privacidade" />
          <MenuItem icone="help-circle" titulo="Ajuda" subtitulo="Central de suporte" />
        </View>

        {/* BOTÃO DE SAIR */}
        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versão 1.0.0</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: { paddingBottom: 120 }, // Espaço grande pro FloatingNavBar
  
  // Cabeçalho Laranja
  headerOrange: { 
    backgroundColor: '#FF6600', 
    paddingTop: 50, 
    paddingHorizontal: 20, 
    paddingBottom: 50, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30 
  },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  userInfoRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#FFF' },
  userDetails: { marginLeft: 15 },
  userName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  userEmail: { color: '#FFE0CC', fontSize: 13, marginTop: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  userLocation: { color: '#FFF', fontSize: 12, marginLeft: 4 },

  // Card de Estatísticas
  statsCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    marginHorizontal: 20, 
    borderRadius: 15, 
    paddingVertical: 15, 
    marginTop: -30, // Puxa o card pra cima pra cruzar a linha laranja
    elevation: 5, 
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 12, color: '#999', marginTop: 4 },
  statDivider: { width: 1, height: '70%', backgroundColor: '#EEE' },

  // Menus
  sectionContainer: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 15, marginBottom: 10, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 },
  menuIconBg: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF5E5', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuTextContainer: { flex: 1 },
  menuTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
  menuSub: { fontSize: 12, color: '#999', marginTop: 2 },

  // Sair da Conta
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 30, paddingVertical: 15, borderRadius: 15, borderWidth: 1, borderColor: '#FF3B30', backgroundColor: '#FFF' },
  logoutText: { color: '#FF3B30', fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  versionText: { textAlign: 'center', color: '#CCC', fontSize: 12, marginTop: 20 },
});