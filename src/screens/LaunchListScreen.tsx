import { FontAwesome } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Dimensions, FlatList, View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { getAllLaunches, DEFAULT_LIST_LIMIT } from '../api/api';
import LaunchPreviewCard from '../components/LaunchPreviewCard';

const SCREEN_HORIZONTAL_PADDING = 10;

const ItemSeparator = () => <View style={styles.separator} />;

const LaunchListScreen = () => {
  const [launches, setLaunches] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingPage, setIsFetchingPage] = useState(false);

  const isFetchingPageRef = useRef(false);

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

  const paginationComponent = () => {
    let pageNumbers = [];

    const firstPageNum = currentPage <= 3 ? 1 : currentPage - 2;
    const pageNumsToShow = 5;
    for (let i = firstPageNum; i < firstPageNum + pageNumsToShow; i++) {
      pageNumbers.push(i);
    }

    const onPressPageNum = (pageNumber) => {
      const offset = (pageNumber - 1) * DEFAULT_LIST_LIMIT;

      const fetchLaunches = async () => {
        isFetchingPageRef.current = true;
        setIsFetchingPage(true);
        try {
          const response = await getAllLaunches(offset);
          setLaunches(response);
          setCurrentPage(pageNumber);
        } catch (err) {
        } finally {
          setIsFetchingPage(false);
          isFetchingPageRef.current = false;
        }
      };

      if (!isFetchingPageRef.current) {
        fetchLaunches();
      }
    };

    return (
      <View style={styles.paginationComponent}>
        {pageNumbers.map((value, index) => {
          return (
            <TouchableOpacity
              disabled={isFetchingPage}
              onPress={() => onPressPageNum(value)}
              key={index.toString()}
              style={[styles.pageNumContainer, value === currentPage ? styles.pageNumUnderLine : undefined]}
            >
              <Text>{value}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const createLaunchButton = () => {
    const onPressLaunchButton = () => {
      console.log('navigating to create launch screen');
      // navigation.navigate("createLaunchScreen");
    };

    return (
      <TouchableOpacity onPress={onPressLaunchButton} style={styles.createLaunchButton}>
        <FontAwesome name="plus" size={32} color="black" />
      </TouchableOpacity>
    );
  };

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
      <View style={styles.paginationContainer}>
        <>
          {paginationComponent()}
          {createLaunchButton()}
        </>
      </View>
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
  paginationContainer: {
    left: 0,
    right: 0,
    bottom: 50,
    height: 50,
    width: '100%',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationComponent: {
    flexDirection: 'row',
  },
  pageNumContainer: {
    paddingHorizontal: 4,
  },
  pageNumUnderLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  createLaunchButton: {
    top: -5,
    position: 'absolute',
    bottom: 0,
    right: SCREEN_HORIZONTAL_PADDING,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 3,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  launchPlus: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 60,
    backgroundColor: 'white',
  },
});

export default LaunchListScreen;
