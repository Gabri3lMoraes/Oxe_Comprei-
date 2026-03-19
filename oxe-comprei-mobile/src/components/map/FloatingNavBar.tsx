import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
// 1. Importações do Reanimated
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Lógica para calcular o tamanho e posição
const NAV_WIDTH = 220; // O width que você definiu na sua barra
const ITEM_WIDTH = NAV_WIDTH / 3; // Dividido pelo número de botões (3)

export default function FloatingNavBar(props: any) {
  
  // A SharedValue controla a animação (como um elástico invisível)
  const tabPositionX = useSharedValue(0);

  const indexAtual = props.state ? props.state.index : 0;
  const nomeDaTelaAtual = props.state ? props.state.routes[indexAtual].name : '';

  
  useEffect(() => {
    // 2. withSpring cria aquela animação "elástica" natural
    tabPositionX.value = withSpring(indexAtual * ITEM_WIDTH, {
        damping: 30, // Controla o balanço (menor = mais balanço)
        stiffness: 150 // Controla a velocidade (maior = mais rápido)
    });
  }, [indexAtual]);

  // 3. Estilo Animado para a Bolinha Laranja
  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  const navegar = (nomeDaTela: string) => {
    props.navigation.navigate(nomeDaTela);
  };

  return (
    <View style={styles.floatingNavBar}>
      <View style={styles.navBarContainer}>
        
        {/* A BOLINHA LARANJA AGORA É ESSA VIEW ANIMADA FANTASMA */}
        <Animated.View style={[styles.navItemAnimated, animatedIndicatorStyle]} />

        {/* Botão Home (Explorar) */}
        <TouchableOpacity style={styles.navItem} onPress={() => navegar('ExploreHome')}>
          <Feather name="home" size={24} color={nomeDaTelaAtual === 'ExploreHome' ? '#FFF' : '#666'} />
        </TouchableOpacity>

        {/* Botão Mapa */}
        <TouchableOpacity style={styles.navItem} onPress={() => navegar('Mapa')}>
          <Ionicons name="location-outline" size={24} color={nomeDaTelaAtual === 'Mapa' ? '#FFF' : '#666'} />
        </TouchableOpacity>

        {/* Botão Perfil (Sem navegação por enquanto) */}
        <TouchableOpacity style={styles.navItem} onPress={() => navegar('Perfil')}>
          <Feather name="user" size={24} color={nomeDaTelaAtual === 'Perfil' ? '#FFF' : '#666'} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingNavBar: { position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' },
  navBarContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    width: NAV_WIDTH, // Usando a constante
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'flex-start', // Mudou para flex-start para a bolinha alinhar
    alignItems: 'center', 
    elevation: 11,
    overflow: 'hidden' // Garante que a bolinha não saia da barra
  },
  navItem: { 
    width: ITEM_WIDTH, // Usando a constante (exatos 73.3px)
    height: 60, // Altura total para alinhar o ícone
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 1 // Garante que o ícone fique na frente da bolinha
  },
  // Novo estilo para a bolinha animada que desliza
  navItemAnimated: { 
    position: 'absolute',
    top: 7.5, // Centraliza na vertical ( (60 - 45) / 2 )
    left: (ITEM_WIDTH - 45) / 2, // Centraliza na horizontal dentro do item
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    backgroundColor: '#FF6600',
    zIndex: 0 // Fica atrás do ícone
  },
});