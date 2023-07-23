import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Shimmer = ({
  width = 200,
  height = 15,
  widthShimmer = 0.7,
  duration = 1000,
  colorShimmer = ['#ebebeb', '#c5c5c5', '#ebebeb'],
  reverse = false,
  autoRun = false,
  visible = false,
  backgroundColorBehindBorder = 'white',
  hasBorder = false,
  style,
  children,
}) => {
  const [beginShimmerPosition] = useState(new Animated.Value(-1));

  useEffect(() => {
    if (autoRun) {
      loopAnimated();
    }
  }, []);

  const loopAnimated = () => {
    const shimmerAnimated = getAnimated();
    shimmerAnimated.start(() => {
      if (!visible) {
        loopAnimated();
      }
    });
  };

  const getAnimated = () => {
    beginShimmerPosition.setValue(-1);
    return Animated.timing(beginShimmerPosition, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    });
  };

  const renderShimmer = () => {
    const beginPostioner = reverse ? 0.7 : -0.7;
    const endPosition = reverse ? -0.7 : 0.7;

    const newValue = beginShimmerPosition.interpolate({
      inputRange: [-1, 1],
      outputRange: [beginPostioner, endPosition],
    });

    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            transform: [{translateX: newValue}],
          }}>
          <LinearGradient
            colors={colorShimmer}
            style={{flex: 1}}
            start={{x: -1, y: 0.5}}
            end={{x: 2, y: 0.5}}
            locations={[widthShimmer, widthShimmer / 2 + 0.5, 1 - widthShimmer]}
          />
        </Animated.View>
        {((style && style.borderRadius) || hasBorder) &&
        Platform.OS === 'android' ? (
          <View
            style={{
              position: 'absolute',
              top: -40,
              bottom: -40,
              right: -40,
              left: -40,
              borderRadius: width / 2 + 40 / 2,
              borderWidth: 40,
              borderColor: backgroundColorBehindBorder,
            }}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View style={!visible ? [styles.container, style] : []}>
      {!visible ? (
        <View style={{width, height}}>{renderShimmer()}</View>
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

export default Shimmer;
