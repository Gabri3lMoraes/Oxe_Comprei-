import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { styles } from './ProductCard.style';

// Atualizamos a interface para aceitar ImageSourcePropType
interface CardProps {
  title: string;
  price: string;
  storeName: string;
  distance: string;
  rating: number;
  soldCount: number;
  imageSource: ImageSourcePropType; 
}

export const Card = ({ 
  title, price, storeName, distance, rating, soldCount, imageSource 
}: CardProps) => {
  return (
    <TouchableOpacity style={styles.card}>
      {/* Usamos imageSource direto no source */}
      <Image source={imageSource} style={styles.image} />
      
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      
      <View style={styles.row}>
        <Text style={styles.ratingText}>⭐ {rating}</Text>
        <Text style={styles.soldText}>{soldCount} vendidos</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.distance}>{distance}</Text>
      </View>
      
      <Text style={styles.price}>{price}</Text>
    </TouchableOpacity>
  );
};