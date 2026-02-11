import React from 'react';
import { View, Text, ScrollView, FlatList, StatusBar, ImageSourcePropType } from 'react-native';

// Importando os estilos separados
import { styles } from './Home.style';

// Importação dos componentes
import { Banner } from '../../../../components/Banner/Banner';
import { Search } from '../../../../components/Search/Search';
import { Card } from '../../../../components/Card/Card'; 
import { Navbar } from '../../../../components/Navbar/Navbar';

// Interface para os dados do Mock (opcional, mas boa prática)
interface ProductData {
  id: string;
  title: string;
  price: string;
  store: string;
  dist: string;
  img: ImageSourcePropType; // Define que img é um require ou uri
}

const MOCK_PRODUCTS: ProductData[] = [
  { 
    id: '1', 
    title: 'Kit 3 Shorts Meia Coxa', 
    price: 'R$39,47', 
    store: 'ALANA MODAS', 
    dist: '2.5 km', 
    img: require('../../../../assets/images/bermudas.png') 
  },
  { 
    id: '2', 
    title: 'Bermuda Tactel', 
    price: 'R$25,00', 
    store: 'MODA CENTER', 
    dist: '3.0 km', 
    img: require('../../../../assets/images/bermudas.png') 
  },
];

export const Home = () => {
  
  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.seeMore}>ver mais</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Banner */}
        <Banner source={require('../../../../assets/images/BannerCarnaval1.png')} />
        
        <Search />

        {/* Seção Ofertas */}
        <View style={styles.section}>
          {renderSectionHeader('Ofertas')}
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={MOCK_PRODUCTS}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Card 
                title={item.title}
                price={item.price}
                storeName={item.store}
                distance={item.dist}
                rating={4.8}
                soldCount={150}
                // Agora isso vai funcionar sem erro vermelho
                imageSource={item.img} 
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        </View>

        {/* Seção Lojas Próximas */}
        <View style={styles.section}>
          {renderSectionHeader('Lojas Proximas')}
           <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={MOCK_PRODUCTS}
            keyExtractor={item => item.id + '_lojas'}
            renderItem={({ item }) => (
              <Card 
                title={item.title}
                price={item.price}
                storeName={item.store}
                distance={item.dist}
                rating={4.8}
                soldCount={150}
                imageSource={item.img}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        </View>

      </ScrollView>

      {/* Navbar Ativa na Home */}
      <Navbar activePage="home" />
      
    </View>
  );
};