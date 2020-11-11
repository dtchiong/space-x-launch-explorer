import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const IMAGE_WIDTH = 100;

const LaunchPreviewCard = ({ launch, width }) => {
  return (
    <View style={[styles.container, { width }]}>
      <Image resizeMode="cover" source={{ uri: launch.links.mission_patch_small }} style={styles.image}></Image>
      <View style={styles.infoContainer}>
        <Text>{launch.mission_name}</Text>
        <Text style={styles.launchDetails} numberOfLines={4}>
          {launch.details}
        </Text>
      </View>
    </View>
  );
};

export default LaunchPreviewCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: '100%',
    height: 100,
    backgroundColor: 'gray',
    flexDirection: 'row',
  },
  image: {
    height: IMAGE_WIDTH,
    width: IMAGE_WIDTH,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  launchDetails: {
    marginTop: 5,
  },
});
