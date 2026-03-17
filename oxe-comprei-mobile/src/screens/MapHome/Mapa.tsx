import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, Image, TextInput, 
  ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Alert
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

import MapHeader from '../../components/map/MapHeader';
import FloatingNavBar from '../../components/map/FloatingNavBar';

const { width, height } = Dimensions.get('window');

const RECIFE_COORDS = { latitude: -8.0475, longitude: -34.8811, latitudeDelta: 0.05, longitudeDelta: 0.05 };
const CATEGORIAS = ['Todos', 'Roupas', 'Papelaria', 'Petshop', 'Ferragens'];
const LOJAS = [
  { id: '1', nome: 'Bagi Shop', endereco: 'Rua Guarani, 231', distancia: '2.4 km', imagem: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', coords: { latitude: -8.0450, longitude: -34.8800 } },
  { id: '2', nome: 'Alana Modas', endereco: 'Av. Boa Vista, 123', distancia: '3.1 km', imagem: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', coords: { latitude: -8.0500, longitude: -34.8850 } },
  { id: '3', nome: 'Papelaria do Zé', endereco: 'Rua das Flores, 45', distancia: '0.8 km', imagem: 'https://images.unsplash.com/photo-1583573636246-18cb2246697f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', coords: { latitude: -8.0475, longitude: -34.8811 } }
];

export default function MapScreen() {
  // 1. Estados agora estão no lugar certo!
  const [region, setRegion] = useState(RECIFE_COORDS);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [enderecoAtual, setEnderecoAtual] = useState("Buscando local...");

  // 2. Referência para o botão de relocalizar customizado
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Aviso", "Usando localização padrão (Recife).");
          setEnderecoAtual("Boa Vista, Recife");
          setLoading(false);
          return;
        }

        // Pega as coordenadas matemáticas
        let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        
       // Traduz as coordenadas para texto legível
        let addressArray = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        // Se encontrou o endereço, atualiza o estado de forma inteligente
        if (addressArray.length > 0) {
          let info = addressArray[0];
          
          // Pega o bairro (tenta district, se não tiver vai para o nome da rua)
          let bairro = info.district || info.street || 'Localização';
          
          // Pega a cidade (tenta city, se não tiver tenta subregion que no Android costuma ser a cidade)
          let cidade = info.city || info.subregion || 'Desconhecida';

          setEnderecoAtual(`${bairro}, ${cidade}`);
        }
        setRegion({ latitude: loc.coords.latitude, longitude: loc.coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 });
      } catch (error) {
        console.log("Erro ao obter localização, usando padrão.");
        setEnderecoAtual("Boa Vista, Recife");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 3. Função que faz o mapa voar de volta para o usuário
  const centralizarNoUsuario = async () => {
    try {
      let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }, 1000);
    } catch (error) {
      console.log("Não foi possível obter a localização atual.");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6600" />
        <Text style={{ marginTop: 10, color: '#666' }}>Iniciando Oxê Comprei!...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* MAPA */}
      <MapView 
        ref={mapRef}
        style={styles.mapBackground}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true} 
        showsMyLocationButton={false}
      >
       {LOJAS.map((loja) => (
          <Marker 
            key={loja.id} 
            coordinate={loja.coords}
            title={loja.nome}
            description={loja.distancia}
          >
            {/* NOSSO PINO CUSTOMIZADO */}
            <View style={styles.customMarkerWrapper}>
              <View style={styles.customMarker}>
                <Feather name="shopping-bag" size={16} color="#FFF" />
              </View>
              <View style={styles.markerPointer} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* BOTÃO DE RELOCALIZAR FLUTUANTE */}
      <TouchableOpacity style={styles.recenterBtn} onPress={centralizarNoUsuario}>
        <MaterialIcons name="my-location" size={24} color="#FF6600" />
      </TouchableOpacity>

      {/* HEADER RECEBENDO O ENDEREÇO TRADUZIDO */}
      <MapHeader endereco={enderecoAtual} />
      
      {/* BOTTOM SHEET */}
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput placeholder="Buscar produtos ou lojas..." placeholderTextColor="#999" style={styles.searchInput} />
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="options-outline" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {CATEGORIAS.map((cat, index) => (
              <TouchableOpacity key={index} style={[styles.categoryBadge, categoriaAtiva === cat && styles.categoryBadgeActive]} onPress={() => setCategoriaAtiva(cat)}>
                <Text style={[styles.categoryText, categoriaAtiva === cat && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Lojas Próximas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storesScroll}>
            {LOJAS.map((loja) => (
              <View key={loja.id} style={styles.storeCard}>
                <Image source={{ uri: loja.imagem }} style={styles.storeImage} />
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName} numberOfLines={1}>{loja.nome}</Text>
                  <Text style={styles.storeAddress} numberOfLines={1}>{loja.endereco}</Text>
                  <View style={styles.storeFooter}>
                    <Text style={styles.storeDistance}>{loja.distancia}</Text>
                    <TouchableOpacity style={styles.btnVerLoja}>
                      <Text style={styles.btnVerLojaText}>Ver Loja</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </View>

      {/* NAVBAR */}
      <FloatingNavBar />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapBackground: { ...StyleSheet.absoluteFillObject },
  
  // ESTILO DO NOVO BOTÃO DE RELOCALIZAR
  recenterBtn: {
    position: 'absolute',
    bottom: (height * 0.48) + 20, 
    right: 20, 
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },

  bottomSheet: { position: 'absolute', bottom: 0, width: '100%', height: height * 0.48, backgroundColor: '#FFFFFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 15, elevation: 10 },
  dragHandle: { width: 40, height: 5, backgroundColor: '#E0E0E0', borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
  scrollContent: { paddingBottom: 100 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', marginHorizontal: 20, borderRadius: 16, paddingHorizontal: 15, height: 55, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#333' },
  filterBtn: { backgroundColor: '#FFB800', width: 35, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  categoriesScroll: { paddingLeft: 20, marginBottom: 20, maxHeight: 40 },
  categoryBadge: { paddingHorizontal: 20, paddingVertical: 8, backgroundColor: '#F5F5F5', borderRadius: 20, marginRight: 10 },
  categoryBadgeActive: { backgroundColor: '#FF6600' },
  categoryText: { color: '#666', fontWeight: '600' },
  categoryTextActive: { color: '#FFF' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginLeft: 20, marginBottom: 15 },
  storesScroll: { paddingLeft: 20 },
  storeCard: { width: 220, backgroundColor: '#FFF', borderRadius: 20, marginRight: 15, padding: 10, elevation: 3, marginBottom: 10 },
  storeImage: { width: '100%', height: 110, borderRadius: 15 },
  storeInfo: { paddingTop: 10 },
  storeName: { fontSize: 16, fontWeight: '700', color: '#333' },
  storeAddress: { fontSize: 12, color: '#999', marginBottom: 8 },
  storeFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  storeDistance: { fontSize: 13, fontWeight: '700', color: '#FF6600' },
  btnVerLoja: { backgroundColor: '#FF6600', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  btnVerLojaText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  // ESTILOS DO MARCADOR CUSTOMIZADO
  customMarkerWrapper: {
    alignItems: 'center',
  },
  customMarker: {
    backgroundColor: '#FF6600',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  markerPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF6600',
    transform: [{ rotate: '180deg' }],
    marginTop: -1, // Junta a bolinha com o triângulo
  },
});