import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import ConsumerRoutes from './consumer.routes'; 

export default function Routes() {
  return (
    <NavigationContainer>
    
      <ConsumerRoutes />
    </NavigationContainer>
  );
}