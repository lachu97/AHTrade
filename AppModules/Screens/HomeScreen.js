import React, {useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
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
        <Text>HomeScreen</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default React.memo(HomeScreen);
