import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function FloatingNavBar() {
  return (
    <View style={styles.floatingNavBar}>
      <View style={styles.navBarContainer}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Ionicons name="location-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingNavBar: { position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' },
  navBarContainer: { flexDirection: 'row', backgroundColor: '#FFF', width: 220, height: 60, borderRadius: 30, justifyContent: 'space-around', alignItems: 'center', elevation: 10 },
  navItem: { width: 45, height: 45, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  navItemActive: { backgroundColor: '#FF6600' },
});