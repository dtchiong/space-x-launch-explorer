import React, { useEffect, useState } from 'react';
import { FlatList, View, SafeAreaView, StyleSheet, Text } from 'react-native';

import { getAllLaunches } from '../api/api';

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

  console.log('launches', launches);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Sup</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LaunchListScreen;
