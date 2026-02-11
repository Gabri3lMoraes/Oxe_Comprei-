import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from './Navbar.style';

// Definindo os tipos de páginas possíveis
type PageType = 'home' | 'map' | 'profile';

interface NavbarProps {
  activePage: PageType;
  // Opcional: Funções para navegação futura
  onNavigate?: (page: PageType) => void;
}

export const Navbar = ({ activePage, onNavigate }: NavbarProps) => {

  // Cores da sua identidade visual
  const ACTIVE_COLOR = '#FF6B00'; // Laranja
  const INACTIVE_COLOR = '#999999'; // Cinza
  const WHITE = '#FFFFFF';

  return (
    <View style={styles.container}>
      
      {/* --- BOTÃO MAPA --- */}
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => onNavigate && onNavigate('map')}
      >
        <Image 
          source={require('../../assets/icons/map.png')} 
          style={[
            styles.icon, 
            { tintColor: activePage === 'map' ? ACTIVE_COLOR : INACTIVE_COLOR }
          ]}
        />
      </TouchableOpacity>


      {/* --- BOTÃO HOME (CENTRAL) --- */}
      <TouchableOpacity 
        style={[
          styles.homeButton,
          // Se for home, fundo laranja. Se não, fundo cinza escuro ou branco
          { backgroundColor: activePage === 'home' ? ACTIVE_COLOR : '#E0E0E0' }
        ]}
        onPress={() => onNavigate && onNavigate('home')}
      >
        <Image 
          source={require('../../assets/icons/home.png')} 
          style={[
            styles.icon,
            // Se for home, ícone branco. Se não, ícone cinza escuro
            { tintColor: activePage === 'home' ? WHITE : '#666' }
          ]}
        />
      </TouchableOpacity>


      {/* --- BOTÃO PERFIL --- */}
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => onNavigate && onNavigate('profile')}
      >
        <Image 
          source={require('../../assets/icons/profile.png')} 
          style={[
            styles.icon, 
            { tintColor: activePage === 'profile' ? ACTIVE_COLOR : INACTIVE_COLOR }
          ]}
        />
      </TouchableOpacity>
      
    </View>
  );
};