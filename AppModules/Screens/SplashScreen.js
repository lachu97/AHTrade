import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet, Dimensions, Animated} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedIn} from '../Storage/LocalStorage';
const height = Math.floor(Dimensions.get('window').height);
const width = Math.floor(Dimensions.get('window').width);
const SplashScreen = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  // const realm = useRealm();
  // const authData = useQuery(Auth);
  useEffect(() => {
    const logInFunctionzCheck = async () => {
      let loggedIn = await getLoggedIn();
      console.log(`Logged In = ${loggedIn}`)
      setTimeout(() => {
        if (loggedIn) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        } else {
          navigation.navigate('AuthStack');
        }
      }, 1200);
    };
    //dispatch({type: 'GET_LOGIN'});
    //dispatch(addDimensions({height: height, width: width}));
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.01,
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
    logInFunctionzCheck();
    return () => {
      animation.stop();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.container, {transform: [{scale: scaleValue}]}]}>
        <Image
          style={styles.logo}
          source={require('../assets/Images/appLogo.png')}
        />
      </Animated.View>
    </View>
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
  gradientText: {
    fontSize: 24,
  },
});
export default React.memo(SplashScreen);
