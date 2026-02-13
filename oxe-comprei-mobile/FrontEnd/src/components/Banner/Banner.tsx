import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { styles } from './Banner.style';

interface BannerProps {
  source: ImageSourcePropType;
}

export const Banner = ({ source }: BannerProps) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
    </View>
  );
};