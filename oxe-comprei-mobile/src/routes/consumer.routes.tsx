import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ExploreHome from '../screens/ExploreHome/ExploreHome';
import Mapa from '../screens/MapHome/Mapa';
import FloatingNavBar from '../components/map/FloatingNavBar';
import Perfil from '../screens/consumer/Profile/perfil';

const Tab = createBottomTabNavigator();

export default function ConsumerRoutes() {
  return (
    <Tab.Navigator 
      initialRouteName="Perfil" 
      screenOptions={{ 
        headerShown: false 
        // 👇 A linha do animation foi removida daqui!
      }}
      tabBar={(props) => <FloatingNavBar {...props} />} 
    >
      <Tab.Screen name="ExploreHome" component={ExploreHome} />
      <Tab.Screen name="Mapa" component={Mapa} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}