import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet, Dimensions, Animated} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addDimensions} from '../Redux/Reducers/HomeReducer';
const height = Math.floor(Dimensions.get('window').height);
const width = Math.floor(Dimensions.get('window').width);
const SplashScreen = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.home.loggedIn);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  useEffect(() => {
    dispatch({type:'GET_LOGIN'});
    dispatch(addDimensions({height: height, width: width}));
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 1900,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    const timer = setTimeout(() => {
      if (loggedIn) {
        navigation.replace('Home');
      } else {
        navigation.navigate('AuthStack');
      }
    }, 2200);
    return () => {
      clearTimeout(timer);
      animation.stop();
    };
  }, []);
  return (
    <Animated.View
      style={[styles.container, {transform: [{scale: scaleValue}]}]}>
      <Image
        style={styles.logo}
        source={require('../assets/Images/appLogo.png')}
      />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark,
  },
  logo: {
    width: width / 4,
    height: width / 5,
  },
});
export default React.memo(SplashScreen);
