import React from 'react';
import {View, Text, useColorScheme, StyleSheet, Platform} from 'react-native';
import {TouchableRipple, Surface} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {MD2Colors} from 'react-native-paper';
import {TextView} from '../AHText';
import {textTheme} from '../../Themes/themes';
import {isIos} from '../../HelperFuntions/helpers'; // assuming you have a custom text component

const TrendingCard = ({image, title, onPress, isTrending = false}) => {
  const darkTheme = useColorScheme() === 'dark';

  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, 0.2)"
      borderless
      style={styles.touchable}>
      <Surface style={styles.surface} elevation={8}>
        {isTrending && (
          <View style={styles.trendingBadge}>
            <Text style={styles.trendingText}>🔥</Text>
          </View>
        )}

        <View style={styles.content}>
          <FastImage
            source={{
              uri: image,
              priority: FastImage.priority.high,
            }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
          <TextView
            numberOfLines={1}
            userSelect={'text'}
            style={[
              styles.title,
              {
                color: isIos()
                  ? MD2Colors.black
                  : darkTheme
                  ? MD2Colors.white
                  : MD2Colors.grey900,
                fontFamily: textTheme.bold.fontFamily,
              },
            ]}>
            {title}
          </TextView>
        </View>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 8,
    margin: 5,
    height: 120,
    width: 120,
  },
  surface: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#FF6F61',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  trendingBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF6F61',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  trendingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  image: {
    height: 52,
    width: 52,
  },
  title: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TrendingCard;
