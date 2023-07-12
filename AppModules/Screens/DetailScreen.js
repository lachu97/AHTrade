import React, {useEffect} from 'react';
import {View, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styles from '../Styles/DetailStyles';
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
    navigation.popToTop();
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Text style={styles.textStyle}> DetailScreen -Go Back</Text>
      </Pressable>
    </View>
  );
};
export default React.memo(DetailScreen);
