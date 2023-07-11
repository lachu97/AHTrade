import React, {useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
const smt = data => ({
  type: 'SOMETHI',
  payload: data,
});
const DetailScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(smt('Iam from the Detail Screen'));
  }, []);
  const handlePress = () => {
    console.log('pressed');
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Text>DetailScreen</Text>
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
export default React.memo(DetailScreen);
