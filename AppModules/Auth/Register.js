import React from 'react';
import {View, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import styles from './Authstyles/RegisterStyles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.textStyles}>Login</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          dispatch({type: 'ADD_LOGIN', payload: true});
          navigation.replace('Home');
        }}>
        <Text style={styles.textStyles}>Go to Home</Text>
      </Pressable>
    </View>
  );
};
export default React.memo(Register);
