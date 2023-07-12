import React from 'react';
import {View, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import styles from './Authstyles/LoginStyles';
import {useNavigation} from '@react-navigation/native';
const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>Login</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text style={styles.textStyles}>Register</Text>
      </Pressable>
    </View>
  );
};
export default React.memo(Login);
