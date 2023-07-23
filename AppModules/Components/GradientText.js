import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

const ShimmerText = ({
  text,
  duration = 4000,
  colors = ['#dddddd', '#bdb9b9', '#f3f0f0'],
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 2,
        duration,
        useNativeDriver: false,
      }),
    );

    shimmerAnimation.start();

    return () => {
      shimmerAnimation.stop();
    };
  }, [animatedValue, duration]);

  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0.5, 1.5, 2.5],
    outputRange: [colors[0], colors[1], colors[2]],
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, style, {color: interpolatedColor}]}>
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ShimmerText;
