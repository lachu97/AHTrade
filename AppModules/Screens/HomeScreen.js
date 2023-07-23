import React, {useEffect, useState} from 'react';
import {View, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styles from '../Styles/HomeStyles';
import Shimmer from '../ShimmerEffects/shimmer';
import YourShimmer from '../ShimmerEffects/shimmer2';
const act = () => ({type: 'ADDHOME'});
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showEffect, setShowEffect] = useState(true);
  useEffect(() => {
    dispatch(act());
    setTimeout(() => {
      setShowEffect(false);
    }, 1599);
  }, []);
  const handlePress = () => {
    console.log('pressed');
    navigation.navigate('Detail');
  };
  return (
    <View style={styles.container}>
      <YourShimmer visible={showEffect}>
        <Pressable onPress={handlePress}>
          <Text style={styles.textStyle}>HomeScreen</Text>
          <Text style={styles.textStyle}>HomeScreen 2</Text>
        </Pressable>
      </YourShimmer>
    </View>
  );
};
export default React.memo(HomeScreen);
