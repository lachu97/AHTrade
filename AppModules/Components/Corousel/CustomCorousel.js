import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {MD2Colors} from 'react-native-paper';
import {HapticFeedback} from '../../HelperFuntions/helpers';
import Toast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');
const IMAGE_HEIGHT = height / 3.2;

const bannerImages = [
  {
    id: 1,
    imageUrl: require('../../assets/Images/img1.png'),
  },
  {
    id: 2,
    imageUrl: require('../../assets/Images/img2.png'),
  },
  {
    id: 3,
    imageUrl: require('../../assets/Images/img3.png'),
  },
];

const CustomCarousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerImages.length;
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = useCallback(
    ({item}) => (
      <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />
    ),
    [],
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={bannerImages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        initialScrollIndex={0}
        initialNumToRender={1}
        windowSize={3}
        style={{
          margin: 2,
        }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      />

      <View style={styles.pagination}>
        {bannerImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: MD2Colors.lightBlue700,
  },
  inactiveDot: {
    backgroundColor: MD2Colors.white,
  },
});

export default React.memo(CustomCarousel);
