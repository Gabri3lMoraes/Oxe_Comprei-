import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, TextInput, 
  ScrollView, TouchableOpacity, Dimensions 
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// DADOS DO MODELO - Garante a relação Lojas -> Produtos
const LOJAS = [
  { 
    id: '1', nome: 'Boutique Beira Mar', categoria: 'Roupas', endereco: 'Av. Marcos Freire, Olinda', distancia: '0.5 km', avaliacao: 4.8, 
    imagem: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500', 
    coords: { latitude: -7.9865, longitude: -34.8412 },
    produtos: [
      { id: 'p1', nome: 'Camisa Linho', preco: 'R$ 89', categoria: 'Roupas Masculina', img: 'https://images.unsplash.com/photo-1539109132313-3fb3a40e858c?w=200' },
      { id: 'p2', nome: 'Biquíni Verão', preco: 'R$ 120', categoria: 'Roupas de Praia', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200' },
      { id: 'p3', nome: 'T-Shirt Básica', preco: 'R$ 45', categoria: 'Roupas Masculina', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200' },
    ]
  },
  { 
    id: '2', nome: 'Pet Feliz Olinda', categoria: 'Petshop', endereco: 'Rua Eduardo de Morais, Olinda', distancia: '0.8 km', avaliacao: 4.7, 
    imagem: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500', 
    coords: { latitude: -7.9890, longitude: -34.8425 },
    produtos: [
        { id: 'p4', nome: 'Ração Premiun 1kg', preco: 'R$ 45', categoria: 'Petshop', img: 'https://images.unsplash.com/photo-1589924691106-07c26394d19d?w=200' },
        { id: 'p5', nome: 'Brinquedo Pet', preco: 'R$ 15', categoria: 'Brinquedos', img: 'https://images.unsplash.com/photo-1591768793355-74d7af73d756?w=200' },
    ]
  },
  { 
    id: '3', nome: 'Papelaria Central', categoria: 'Papelaria', endereco: 'Rua de São Bento, Olinda', distancia: '1.2 km', avaliacao: 4.5, 
    imagem: 'https://images.unsplash.com/photo-1583573636246-18cb2246697f?w=500', 
    coords: { latitude: -7.9921, longitude: -34.8430 },
    produtos: [
        { id: 'p6', nome: 'Caderno Smart', preco: 'R$ 12', categoria: 'Material Escolar', img: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200' },
        { id: 'p7', nome: 'Kit Canetas Brush', preco: 'R$ 22', categoria: 'Material Escolar', img: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=200' },
    ]
  },
  { 
    id: '4', nome: 'Utilidades Nordeste', categoria: 'Utilidades', endereco: 'Av. Pres. Kennedy, Olinda', distancia: '1.4 km', avaliacao: 4.4, 
    imagem: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500', 
    coords: { latitude: -8.0180, longitude: -34.8720 },
    produtos: [
        { id: 'p8', nome: 'Luminária Mesa', preco: 'R$ 38', categoria: 'Utilidades', img: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?w=200' },
        { id: 'p9', nome: 'Sandália Rasteira', preco: 'R$ 65', categoria: 'Calçados', img: 'https://images.unsplash.com/photo-1519235106638-30cc49b4f434?w=200' },
    ]
  },
];

// LÓGICA DE DADOS: Gera a lista de todos os produtos com a referência da loja
const TODOS_PRODUTOS = LOJAS.flatMap(loja => 
  loja.produtos.map(produto => ({
    ...produto,
    lojaNome: loja.nome,
    lojaId: loja.id
  }))
);

// Categorias principais
const CATEGORIAS_PRINCIPAIS = [
  { id: '1', nome: 'Todos', icone: 'apps' },
  { id: '2', nome: 'Roupas', icone: 'shirt-outline' },
  { id: '3', nome: 'Petshop', icone: 'paw-outline' },
  { id: '4', nome: 'Papelaria', icone: 'pencil-outline' },
  { id: '5', nome: 'Utilidades', icone: 'bed-outline' },
];

// MOCK PARA O FEED INFINITO (Simulando o Algoritmo)
const PRODUTOS_FEED = [
  { id: 'f1', nome: 'Fone Sem Fio Bluetooth Premium', preco: 'R$ 120,00', lojaNome: 'Tech Olinda', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300' },
  { id: 'f2', nome: 'Tênis Esportivo Confort', preco: 'R$ 189,90', lojaNome: 'Pé Quente Calçados', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300' },
  { id: 'f3', nome: 'Relógio Smartwatch', preco: 'R$ 250,00', lojaNome: 'Eletro Mix', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: 'f4', nome: 'Óculos de Sol Vintage', preco: 'R$ 85,00', lojaNome: 'Ótica Vista Mar', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300' },
  { id: 'f5', nome: 'Mochila Impermeável', preco: 'R$ 145,00', lojaNome: 'Papelaria Central', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300' },
  { id: 'f6', nome: 'Kit Skincare Facial', preco: 'R$ 95,00', lojaNome: 'Bela Cosméticos', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300' },
  { id: 'f7', nome: 'Garrafa Térmica 1L', preco: 'R$ 65,00', lojaNome: 'Utilidades Nordeste', img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300' },
  { id: 'f8', nome: 'Jaqueta Jeans', preco: 'R$ 150,00', lojaNome: 'Boutique Beira Mar', img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300' },
];

export default function ExploreHome() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  // Filtra lojas próximas com base na categoria principal
  const lojasFiltradas = LOJAS.filter(loja => 
    categoriaAtiva === 'Todos' || loja.categoria === categoriaAtiva
  );

  // Filtra produtos "Em Alta" (simulados)
  const produtosEmAlta = TODOS_PRODUTOS.filter(p => p.id === 'p1' || p.id === 'p4' || p.id === 'p2');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Oxê Comprei!</Text>
            <View style={styles.addressRow}>
              <Ionicons name="location-sharp" size={14} color="#999" />
              <Text style={styles.headerSub}>Bairro Novo, Olinda</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}><Feather name="bell" size={24} color="#333" /></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} /></TouchableOpacity>
          </View>
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput placeholder="Buscar produtos ou lojas..." placeholderTextColor="#999" style={styles.searchInput} />
          </View>
          <TouchableOpacity style={styles.filterButton}><Ionicons name="options-outline" size={24} color="#FFF" /></TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={require('../../../assets/banners/banner.png')} style={styles.bannerImage} />
        </View>

        {/* Categorias Principais */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIAS_PRINCIPAIS.map((cat, index) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, categoriaAtiva === cat.nome && styles.categoryCardActive]} onPress={() => setCategoriaAtiva(cat.nome)}>
              <Ionicons name={cat.icone as any} size={28} color={categoriaAtiva === cat.nome ? '#FFF' : '#FF6600'} />
              <Text style={[styles.categoryText, categoriaAtiva === cat.nome && styles.categoryTextActive]}>{cat.nome}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lojas Próximas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lojas Próximas em Olinda</Text>
          <TouchableOpacity><Text style={styles.verMais}>Ver no mapa &gt;</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storesScroll}>
          {lojasFiltradas.map((loja) => (
            <TouchableOpacity key={loja.id} style={styles.storeCard}>
                <Image source={{ uri: loja.imagem }} style={styles.storeImage} />
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName} numberOfLines={1}>{loja.nome}</Text>
                  <Text style={styles.storeSub}>⭐ {loja.avaliacao} • {loja.distancia}</Text>
                </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Em Alta */}
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Em Alta</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
          {produtosEmAlta.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productCard}>
                <Image source={{ uri: item.img }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>{item.nome}</Text>
                  <Text style={styles.productPrice}>{item.preco}</Text>
                  <Text style={styles.productLoja}>📍 {item.lojaNome}</Text>
                </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Seção Explorar (Algoritmo / Feed Infinito) */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Feito para você</Text>
        </View>
        
        <View style={styles.gridContainer}>
          {PRODUTOS_FEED.map((item) => (
            <TouchableOpacity key={item.id} style={styles.gridCard}>
              <Image source={{ uri: item.img }} style={styles.gridImage} />
              <View style={styles.gridInfo}>
                <Text style={styles.gridPrice}>{item.preco}</Text>
                <Text style={styles.gridName} numberOfLines={2}>{item.nome}</Text>
                <Text style={styles.gridLoja} numberOfLines={1}>📍 {item.lojaNome}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 100 }, // Espaço para a barra flutuante não cobrir o conteúdo
  
  // Cabeçalho
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, marginBottom: 15 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#FF6600' },
  addressRow: { flexDirection: 'row', alignItems: 'center' },
  headerSub: { fontSize: 12, color: '#999', marginLeft: 4 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 10, padding: 5 },
  avatar: { width: 35, height: 35, borderRadius: 18 },

  // Barra de Pesquisa
  searchSection: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 16, paddingHorizontal: 15, height: 50 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  filterButton: { backgroundColor: '#FF6600', width: 50, height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },

  // Banner
  bannerContainer: { paddingHorizontal: 20, marginBottom: 20 },
  bannerImage: { width: '100%', height: 160, borderRadius: 20 },

  // Categorias Principais
  categoriesScroll: { paddingLeft: 20, marginBottom: 25 },
  categoryCard: { width: 90, height: 100, backgroundColor: '#FFF', borderRadius: 20, marginRight: 15, justifyContent: 'center', alignItems: 'center'  },
  categoryCardActive: { backgroundColor: '#FF6600' },
  categoryText: { fontSize: 13, fontWeight: '600', color: '#666', marginTop: 10 },
  categoryTextActive: { color: '#FFF' },

  // Lojas Próximas
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  verMais: { color: '#FF6600', fontSize: 14, fontWeight: '600' },
  storesScroll: { paddingLeft: 20 },
  storeCard: { width: 140, marginRight: 15, alignItems: 'center', elevation: 3, backgroundColor: '#FFF', borderRadius: 15, padding: 10, marginBottom: 10 },
  storeImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 10 },
  storeInfo: { alignItems: 'center' },
  storeName: { fontSize: 13, fontWeight: '700', color: '#333' },
  storeSub: { fontSize: 11, color: '#999' },

  // Produtos (Em Alta)
  productsScroll: { paddingLeft: 20, marginTop: 15 },
  productCard: { width: 160, backgroundColor: '#FFF', borderRadius: 20, marginRight: 15, padding: 10, elevation: 3, marginBottom: 10 },
  productImage: { width: '100%', height: 130, borderRadius: 15 },
  productInfo: { marginTop: 10 },
  productName: { fontSize: 14, color: '#333', minHeight: 40 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#FF6600', marginTop: 5 },
  productLoja: { fontSize: 10, color: '#999', marginTop: 2 },

  // Novo Feed Explorar (Grid 2 colunas)
  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  gridCard: { 
    width: '48%', 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    padding: 10, 
    marginBottom: 15, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gridImage: { 
    width: '100%', 
    height: 140, 
    borderRadius: 10, 
    marginBottom: 8 
  },
  gridInfo: { flex: 1, justifyContent: 'space-between' },
  gridPrice: { fontSize: 16, fontWeight: 'bold', color: '#FF6600' },
  gridName: { fontSize: 13, color: '#333', marginTop: 4, minHeight: 35 },
  gridLoja: { fontSize: 11, color: '#999', marginTop: 4 },
});