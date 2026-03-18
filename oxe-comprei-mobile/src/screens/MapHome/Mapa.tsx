import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, Image, TextInput, 
  ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Alert 
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

import MapHeader from '../../components/map/MapHeader';
import FloatingNavBar from '../../components/map/FloatingNavBar';

const { width, height } = Dimensions.get('window');
const RECIFE_COORDS = { latitude: -8.0475, longitude: -34.8811, latitudeDelta: 0.05, longitudeDelta: 0.05 };
const CATEGORIAS = ['Todos', 'Roupas', 'Papelaria', 'Petshop', 'Ferragens'];

// BANCO DE DADOS COMPLETO
const LOJAS = [
  { 
    id: '1', nome: 'Boutique Beira Mar', categoria: 'Roupas', endereco: 'Av. Marcos Freire, Casa Caiada', distancia: '0.5 km', avaliacao: 4.8, 
    imagem: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500', 
    coords: { latitude: -7.9865, longitude: -34.8412 },
    produtos: [
      { id: 'p1', nome: 'Camisa Linho', preco: 'R$ 89', promo: true, img: 'https://images.unsplash.com/photo-1539109132313-3fb3a40e858c?w=200' },
      { id: 'p2', nome: 'Vestido Verão', preco: 'R$ 120', promo: false, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200' }
    ]
  },
  { 
    id: '2', nome: 'Pet Feliz Olinda', categoria: 'Petshop', endereco: 'Rua Eduardo de Morais, Casa Caiada', distancia: '0.8 km', avaliacao: 4.7, 
    imagem: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500', 
    coords: { latitude: -7.9890, longitude: -34.8425 },
    produtos: [{ id: 'p3', nome: 'Ração 1kg', preco: 'R$ 45', promo: true, img: 'https://images.unsplash.com/photo-1589924691106-07c26394d19d?w=200' }]
  },
  { 
    id: '3', nome: 'Papelaria Criativa', categoria: 'Papelaria', endereco: 'Rua Carlos de Lima Cavalcanti, Bairro Novo', distancia: '1.2 km', avaliacao: 4.5, 
    imagem: 'https://images.unsplash.com/photo-1583573636246-18cb2246697f?w=500', 
    coords: { latitude: -7.9921, longitude: -34.8430 },
    produtos: [{ id: 'p4', nome: 'Caderno Smart', preco: 'R$ 12', promo: false, img: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200' }]
  },
  { 
    id: '4', nome: 'Armazém Peixinhos', categoria: 'Ferragens', endereco: 'Av. Pres. Kennedy, Peixinhos', distancia: '3.1 km', avaliacao: 4.3, 
    imagem: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500', 
    coords: { latitude: -8.0180, longitude: -34.8720 },
    produtos: [{ id: 'p5', nome: 'Kit Chaves', preco: 'R$ 55', promo: true, img: 'https://images.unsplash.com/photo-1586864387417-f50bf687e145?w=200' }]
  },
  { 
    id: '5', nome: 'Olinda Fashion Kids', categoria: 'Roupas', endereco: 'Rua do Sol, Carmo', distancia: '2.5 km', avaliacao: 4.9, 
    imagem: 'https://images.unsplash.com/photo-1514090458221-65bb69af63e6?w=500', 
    coords: { latitude: -8.0135, longitude: -34.8485 },
    produtos: [{ id: 'p6', nome: 'Conjunto Infantil', preco: 'R$ 75', promo: false, img: 'https://images.unsplash.com/photo-1519235106638-30cc49b4f434?w=200' }]
  },
  { 
    id: '6', nome: 'Mundo dos Pets Rio Doce', categoria: 'Petshop', endereco: 'Av. Nápoles, Rio Doce', distancia: '2.2 km', avaliacao: 4.6, 
    imagem: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500', 
    coords: { latitude: -7.9715, longitude: -34.8350 },
    produtos: [{ id: 'p7', nome: 'Brinquedo Pet', preco: 'R$ 15', promo: true, img: 'https://images.unsplash.com/photo-1591768793355-74d7af73d756?w=200' }]
  },
  { 
    id: '7', nome: 'Ferragens 12 de Março', categoria: 'Ferragens', endereco: 'Praça Doze de Março, Bairro Novo', distancia: '1.4 km', avaliacao: 4.4, 
    imagem: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500', 
    coords: { latitude: -7.9945, longitude: -34.8440 },
    produtos: [{ id: 'p8', nome: 'Luminária', preco: 'R$ 38', promo: false, img: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?w=200' }]
  },
  { 
    id: '8', nome: 'Arte & Papel Olinda', categoria: 'Papelaria', endereco: 'Rua de São Bento, Varadouro', distancia: '2.7 km', avaliacao: 4.7, 
    imagem: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=500', 
    coords: { latitude: -8.0142, longitude: -34.8491 },
    produtos: [{ id: 'p9', nome: 'Canetas Brush', preco: 'R$ 22', promo: true, img: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=200' }]
  },
  { 
    id: '9', nome: 'Urbano Man', categoria: 'Roupas', endereco: 'Shopping Patteo, Olinda', distancia: '0.9 km', avaliacao: 4.6, 
    imagem: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500', 
    coords: { latitude: -7.9895, longitude: -34.8450 },
    produtos: [{ id: 'p10', nome: 'T-Shirt Básica', preco: 'R$ 45', promo: false, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200' }]
  },
  { 
    id: '10', nome: 'Pet Shop Ouro Preto', categoria: 'Petshop', endereco: 'Rua Baobá, Ouro Preto', distancia: '3.8 km', avaliacao: 4.2, 
    imagem: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca3?w=500', 
    coords: { latitude: -8.0050, longitude: -34.8620 },
    produtos: [{ id: 'p11', nome: 'Shampoo Dog', preco: 'R$ 28', promo: true, img: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=200' }]
  }
];

export default function MapScreen() {
  const [region, setRegion] = useState(RECIFE_COORDS);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [enderecoAtual, setEnderecoAtual] = useState("Buscando local...");
  
  // NOVO: Estado para guardar o que o usuário está digitando
  const [busca, setBusca] = useState('');
  
  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<any>({});

  // 1. Filtra as lojas pela categoria selecionada
  const lojasPorCategoria = LOJAS.filter(loja => 
    categoriaAtiva === 'Todos' || loja.categoria === categoriaAtiva
  );

  // 2. Filtra as lojas de acordo com a BUSCA (Nome da loja ou nome do produto)
  const lojasFiltradas = lojasPorCategoria.filter(loja => {
    if (busca.trim() === '') return true; // Se a busca estiver vazia, mostra tudo
    const termo = busca.toLowerCase();
    
    const temNoNomeDaLoja = loja.nome.toLowerCase().includes(termo);
    const temNoNomeDoProduto = loja.produtos.some(p => p.nome.toLowerCase().includes(termo));
    
    return temNoNomeDaLoja || temNoNomeDoProduto;
  });

  // 3. Extrai os produtos apenas das categorias selecionadas e aplica a busca neles
  const TODOS_PRODUTOS = lojasPorCategoria.flatMap(loja => 
    loja.produtos.map(produto => ({
      ...produto,
      lojaNome: loja.nome,
      lojaCoords: loja.coords,
      lojaId: loja.id
    }))
  ).filter(produto => {
    if (busca.trim() === '') return true;
    const termo = busca.toLowerCase();
    return produto.nome.toLowerCase().includes(termo) || produto.lojaNome.toLowerCase().includes(termo);
  });

  // 4. Promoções (já com o filtro de busca e categoria aplicados)
  const PROMO_PRODUTOS = TODOS_PRODUTOS.filter(p => p.promo);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setEnderecoAtual("Boa Vista, Recife");
          setLoading(false);
          return;
        }
        let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        let addressArray = await Location.reverseGeocodeAsync({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });

        if (addressArray.length > 0) {
          let info = addressArray[0];
          setEnderecoAtual(`${info.district || info.subregion}, ${info.city}`);
        }
        setRegion({ latitude: loc.coords.latitude, longitude: loc.coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 });
      } catch (error) {
        console.log("Erro ao obter localização.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const selecionarLoja = (lojaId: string, coords: any) => {
    mapRef.current?.animateToRegion({ ...coords, latitudeDelta: 0.005, longitudeDelta: 0.005 }, 1000);
    setTimeout(() => {
      markerRefs.current[lojaId]?.showCallout();
    }, 1100);
  };

  const centralizarNoUsuario = async () => {
    try {
      let loc = await Location.getCurrentPositionAsync({});
      mapRef.current?.animateToRegion({ 
        latitude: loc.coords.latitude, 
        longitude: loc.coords.longitude, 
        latitudeDelta: 0.01, 
        longitudeDelta: 0.01 
      }, 1000);
    } catch (e) { 
      Alert.alert("Erro", "Localização não encontrada."); 
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF6600" /></View>;

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.mapBackground} provider={PROVIDER_GOOGLE} initialRegion={region} showsUserLocation={true} showsMyLocationButton={false}>
        {lojasFiltradas.map((loja) => (
          <Marker 
            key={loja.id} 
            ref={(el) => { markerRefs.current[loja.id] = el; }} 
            coordinate={loja.coords}
          >
            <View style={styles.customMarkerWrapper}>
              <View style={styles.customMarker}><Feather name="shopping-bag" size={16} color="#FFF" /></View>
              <View style={styles.markerPointer} />
            </View>
            <Callout tooltip>
              <View style={styles.calloutWrapper}>
                <View style={styles.calloutContainer}>
                  <View style={styles.calloutHeader}>
                    <Image source={{ uri: loja.imagem }} style={styles.shopThumb} />
                    <View>
                      <Text style={styles.calloutTitle}>{loja.nome}</Text>
                      <Text style={styles.calloutSub}>⭐ {loja.avaliacao} • {loja.distancia}</Text>
                    </View>
                  </View>
                  <Text style={styles.prodLabel}>Destaques</Text>
                  <View style={styles.prodRow}>
                    {loja.produtos.slice(0, 3).map(p => (
                      <View key={p.id} style={styles.prodItem}>
                        <Image source={{ uri: p.img }} style={styles.prodImg} />
                        <Text style={styles.prodPrice}>{p.preco}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.btnVerLojaCallout}><Text style={styles.btnTextWhite}>Ver Loja</Text></View>
                </View>
                <View style={styles.calloutArrow} />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={styles.recenterBtn} onPress={centralizarNoUsuario}>
        <MaterialIcons name="my-location" size={24} color="#FF6600" />
      </TouchableOpacity>

      <MapHeader endereco={enderecoAtual} />
      
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* BARRA DE PESQUISA ATUALIZADA */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput 
              placeholder="Buscar produtos ou lojas..." 
              placeholderTextColor="#999" 
              style={styles.searchInput}
              value={busca}
              onChangeText={setBusca} // Atualiza o estado da busca a cada letra digitada
            />
            {/* Botão para limpar a busca se houver texto */}
            {busca.length > 0 && (
              <TouchableOpacity onPress={() => setBusca('')}>
                <Feather name="x-circle" size={18} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {CATEGORIAS.map((cat, index) => (
              <TouchableOpacity key={index} style={[styles.categoryBadge, categoriaAtiva === cat && styles.categoryBadgeActive]} onPress={() => setCategoriaAtiva(cat)}>
                <Text style={[styles.categoryText, categoriaAtiva === cat && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Renderiza as listas apenas se houverem resultados */}
          {lojasFiltradas.length > 0 ? (
            <>
              {/* Lojas Próximas */}
              <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Lojas Próximas</Text>
                <TouchableOpacity><Text style={styles.verMais}>Ver mais</Text></TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storesScroll}>
                {lojasFiltradas.map((loja) => (
                  <TouchableOpacity key={loja.id} style={styles.storeCard} onPress={() => selecionarLoja(loja.id, loja.coords)}>
                    <Image source={{ uri: loja.imagem }} style={styles.storeImage} />
                    <View style={styles.storeInfo}>
                      <Text style={styles.storeName} numberOfLines={1}>{loja.nome}</Text>
                      <Text style={styles.storeDistance}>{loja.distancia}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : (
            <Text style={styles.emptyText}>Nenhuma loja encontrada.</Text>
          )}

          {PROMO_PRODUTOS.length > 0 && (
            <>
              {/* Promo dos Produtos */}
              <View style={[styles.headerRow, { marginTop: 25 }]}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
                    <MaterialIcons name="local-offer" size={20} color="#FF6600" />
                    <Text style={[styles.sectionTitle, {marginLeft: 5}]}>Promo dos Produtos</Text>
                </View>
                <TouchableOpacity><Text style={styles.verMais}>Ver tudo</Text></TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storesScroll}>
                {PROMO_PRODUTOS.map((item, index) => (
                  <TouchableOpacity key={`promo-${index}`} style={[styles.productCard, {borderColor: '#FF6600', borderWidth: 1}]} onPress={() => selecionarLoja(item.lojaId, item.lojaCoords)}>
                    <View style={styles.promoBadge}><Text style={styles.promoText}>PROMO</Text></View>
                    <Image source={{ uri: item.img }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                      <Text style={styles.productPrice}>{item.preco}</Text>
                      <Text style={styles.productName} numberOfLines={1}>{item.nome}</Text>
                      <Text style={styles.productShopName}>📍 {item.lojaNome}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          {TODOS_PRODUTOS.length > 0 && (
            <>
              {/* Para você */}
              <View style={[styles.headerRow, { marginTop: 25 }]}>
                <Text style={styles.sectionTitle}>Para você</Text>
                <TouchableOpacity><Text style={styles.verMais}>Ver mais</Text></TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storesScroll}>
                {TODOS_PRODUTOS.map((item, index) => (
                  <TouchableOpacity key={`todos-${index}`} style={styles.productCard} onPress={() => selecionarLoja(item.lojaId, item.lojaCoords)}>
                    <Image source={{ uri: item.img }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                      <Text style={styles.productPrice}>{item.preco}</Text>
                      <Text style={styles.productName} numberOfLines={1}>{item.nome}</Text>
                      <Text style={styles.productShopName}>📍 {item.lojaNome}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

        </ScrollView>
      </View>

      <FloatingNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapBackground: { ...StyleSheet.absoluteFillObject },
  recenterBtn: { position: 'absolute', bottom: (height * 0.48) + 20, right: 20, backgroundColor: '#FFFFFF', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 5, zIndex: 10 },
  bottomSheet: { position: 'absolute', bottom: 0, width: '100%', height: height * 0.48, backgroundColor: '#FFFFFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 15, elevation: 10 },
  dragHandle: { width: 40, height: 5, backgroundColor: '#E0E0E0', borderRadius: 3, alignSelf: 'center', marginBottom: 15 },
  scrollContent: { paddingBottom: 100 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', marginHorizontal: 20, borderRadius: 16, paddingHorizontal: 15, height: 55, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#333' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20, fontStyle: 'italic' },
  categoriesScroll: { paddingLeft: 20, marginBottom: 20, maxHeight: 40 },
  categoryBadge: { paddingHorizontal: 20, paddingVertical: 8, backgroundColor: '#F5F5F5', borderRadius: 20, marginRight: 10 },
  categoryBadgeActive: { backgroundColor: '#FF6600' },
  categoryText: { color: '#666', fontWeight: '600' },
  categoryTextActive: { color: '#FFF' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginLeft: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20, marginBottom: 15 },
  verMais: { color: '#FF6600', fontWeight: 'bold', fontSize: 14 },
  storesScroll: { paddingLeft: 20 },
  storeCard: { width: 200, backgroundColor: '#FFF', borderRadius: 20, marginRight: 15, padding: 10, elevation: 3, marginBottom: 10 },
  storeImage: { width: '100%', height: 100, borderRadius: 15 },
  storeInfo: { paddingTop: 10 },
  storeName: { fontSize: 14, fontWeight: '700' },
  storeDistance: { color: '#FF6600', fontWeight: 'bold' },
  productCard: { width: 140, backgroundColor: '#FFF', borderRadius: 15, marginRight: 15, padding: 8, elevation: 3, marginBottom: 10 },
  productImage: { width: '100%', height: 110, borderRadius: 12 },
  productInfo: { marginTop: 8 },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#FF6600' },
  productName: { fontSize: 12, color: '#333' },
  productShopName: { fontSize: 10, color: '#999', marginTop: 2 },
  promoBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#FF6600', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5, zIndex: 1 },
  promoText: { color: '#FFF', fontSize: 9, fontWeight: 'bold' },
  calloutWrapper: { alignItems: 'center', width: 220 },
  calloutContainer: { backgroundColor: '#FFF', borderRadius: 15, padding: 12, width: '100%', elevation: 5 },
  calloutHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  shopThumb: { width: 35, height: 35, borderRadius: 10, marginRight: 8 },
  calloutTitle: { fontWeight: '700', fontSize: 13 },
  calloutSub: { fontSize: 11, color: '#666' },
  prodLabel: { fontSize: 10, fontWeight: '700', color: '#999', marginBottom: 5 },
  prodRow: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 },
  prodItem: { marginRight: 10 },
  prodImg: { width: 55, height: 55, borderRadius: 8 },
  prodPrice: { fontSize: 10, fontWeight: 'bold', color: '#FF6600' },
  btnVerLojaCallout: { backgroundColor: '#FF6600', paddingVertical: 6, borderRadius: 8, alignItems: 'center' },
  btnTextWhite: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  calloutArrow: { width: 0, height: 0, borderLeftWidth: 10, borderRightWidth: 10, borderTopWidth: 10, borderTopColor: '#FFF', borderLeftColor: 'transparent', borderRightColor: 'transparent' },
  customMarkerWrapper: { alignItems: 'center' },
  customMarker: { backgroundColor: '#FF6600', padding: 8, borderRadius: 20 },
  markerPointer: { width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 8, borderTopColor: '#FF6600', borderLeftColor: 'transparent', borderRightColor: 'transparent' },
});