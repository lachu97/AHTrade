import React from 'react';
import {StyleSheet, View} from 'react-native';
import Shimmer from 'react-native-shimmer-kit';

const YourShimmer = ({
  width = 95,
  height = 35,
  borderRadius = 12,
  duration = 1000,
  //colors = ['#726f6f', '#bab7b7', '#737171'],
  colors = ['#ebebeb', '#878686', '#ebebeb'],
  isReversed = false,
  children,
  visible,
}) => {
  return (
    <View style={visible ? styles.container : []}>
      {visible ? (
        <View style={{width, height}}>
          <Shimmer
            width={width}
            height={height}
            borderRadius={borderRadius}
            duration={duration}
            colors={colors}
            isReversed={isReversed}
          />
        </View>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
export default YourShimmer;
