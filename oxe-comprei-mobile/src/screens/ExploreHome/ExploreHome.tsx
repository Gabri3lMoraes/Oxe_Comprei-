import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, TextInput, 
  ScrollView, TouchableOpacity, Dimensions, Platform 
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

import FloatingNavBar from '../../components/map/FloatingNavBar';

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

// Categorias de exploração
const CATEGORIAS_EXPLORAR = [
  { id: 'ビーチ', nome: 'Roupas de Praia', icone: 'sunny-outline' },
  { id: 'スクール', nome: 'Material Escolar', icone: 'school-outline' },
  { id: 'トイ', nome: 'Brinquedos', icone: 'gift-outline' },
  { id: 'シューズ', nome: 'Calçados', icone: 'walk-outline' },
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

        {/* Seção Explorar */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}><Text style={styles.sectionTitle}>Explorar</Text></View>
        
        {CATEGORIAS_EXPLORAR.map(cat_explorar => {
            const produtosDaCategoria = TODOS_PRODUTOS.filter(p => p.categoria === cat_explorar.nome).slice(0, 4);
            return (
                <View key={cat_explorar.id} style={styles.exploreCategory}>
                    <View style={styles.exploreHeader}>
                        <Ionicons name={cat_explorar.icone as any} size={20} color="#FF6600" />
                        <Text style={styles.exploreTitle}>{cat_explorar.nome}</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
                    {produtosDaCategoria.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.productCardSmall}>
                            <Image source={{ uri: item.img }} style={styles.productImageSmall} />
                            <View style={styles.productInfoSmall}>
                            <Text style={styles.productNameSmall} numberOfLines={1}>{item.nome}</Text>
                            <Text style={styles.productPriceSmall}>{item.preco}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    </ScrollView>
                </View>
            );
        })}

      </ScrollView>

      <FloatingNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 100 },
  
  // Cabeçalho
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, marginBottom: 15 },
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
  categoryCard: { width: 90, height: 100, backgroundColor: '#FFF', borderRadius: 20, marginRight: 15, justifyContent: 'center', alignItems: 'center', elevation: 3 },
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

  // Explorar (Categoria + Produtos pequenos)
  exploreCategory: { marginBottom: 15 },
  exploreHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  exploreTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginLeft: 8 },
  productCardSmall: { width: 100, backgroundColor: '#FFF', borderRadius: 12, marginRight: 12, padding: 6, elevation: 2, marginBottom: 5 },
  productImageSmall: { width: '100%', height: 80, borderRadius: 8 },
  productInfoSmall: { marginTop: 5 },
  productNameSmall: { fontSize: 11, color: '#333' },
  productPriceSmall: { fontSize: 13, fontWeight: 'bold', color: '#FF6600' },
});