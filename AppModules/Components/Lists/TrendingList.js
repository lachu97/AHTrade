import React, {useMemo} from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TrendingCard from './TrendingCard';

const {width} = Dimensions.get('window');

const TrendingList = ({categories = []}) => {
  // Memoize 4 random categories when component mounts
  const trendingCategories = useMemo(() => {
    if (!categories.length) {
      return [];
    }
    const shuffled = [...categories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [categories]);

  return (
    <FlatList
      data={trendingCategories}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 10}}
      renderItem={({item}) => (
        <View style={styles.card}>
          <TrendingCard
            isTrending={true}
            title={item.title}
            image={item.image}
            onPress={() => {}}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.4,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 6,
  },
  name: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default TrendingList;
