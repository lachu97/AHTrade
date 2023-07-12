import React, {useEffect} from 'react';
import {View, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styles from '../Styles/HomeStyles';
const act = () => ({type: 'ADDHOME'});
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(act());
  }, []);
  const handlePress = () => {
    console.log('pressed');
    navigation.navigate('Detail');
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Text style={styles.textStyle}>HomeScreen</Text>
      </Pressable>
    </View>
  );
};
export default React.memo(HomeScreen);
