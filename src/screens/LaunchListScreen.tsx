import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, View, SafeAreaView, StyleSheet, Text } from 'react-native';

import { getAllLaunches } from '../api/api';
import LaunchPreviewCard from '../components/LaunchPreviewCard';

const SCREEN_HORIZONTAL_PADDING = 10;

const ItemSeparator = () => <View style={styles.separator} />;

const LaunchListScreen = () => {
  const [launches, setLaunches] = useState(null);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await getAllLaunches();
        setLaunches(response);
      } catch (err) {}
    };

    fetchLaunches();
  }, []);

  const screenWidth = Dimensions.get('window').width;

  const keyExtractor = useCallback((launch, index) => {
    return (launch?.flight_number || index).toString();
  }, []);

  const renderItem = useCallback(({ item }) => {
    const cardWidth = screenWidth - 2 * SCREEN_HORIZONTAL_PADDING;
    return <LaunchPreviewCard launch={item} width={cardWidth}></LaunchPreviewCard>;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.launchListContentContainer}
        data={launches || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparator}
        style={styles.launchListContainer}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  separator: {
    height: 10,
  },
  launchListContentContainer: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  launchListContainer: {
    marginBottom: 60,
  },
});

export default LaunchListScreen;
