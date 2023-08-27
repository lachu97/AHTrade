import React, {useCallback, useState} from 'react';
import {View, Pressable, KeyboardAvoidingView} from 'react-native';
import {
  Text,
  Provider as PaperProvider,
  DefaultTheme, MD2Colors,
} from "react-native-paper";
import styles from './Authstyles/LoginStyles';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import { Colors } from "react-native/Libraries/NewAppScreen";
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Update the label text color here
    primary: 'black', // Replace 'red' with any color you prefer
  },
};
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmail = useCallback(text => setEmail(text), []);
  const handlePassword = useCallback(text => setPassword(text), []);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>Login</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text style={styles.textStyles}>Register</Text>
      </Pressable>
      <KeyboardAvoidingView behavior={'padding'} style={styles.formContainer}>
        <TextInput
          // label="Email"
          value={email}
          placeholder={"Enter Email"}
          placeholderTextColor={Colors.black}
          onChangeText={handleEmail}
          style={styles.textInput}
          mode={'outlined'}
          autoComplete={"email"}
          outlineColor={MD2Colors.black}
          autoCorrect
          textColor={MD2Colors.black}
          inputMode={'email'}
          keyboardType={'email-address'}
          activeOutlineColor={MD2Colors.black}
        />
        <TextInput
          // label="Password"
          value={password}
          placeholder={"Enter Password"}
          activeOutlineColor={MD2Colors.black}
          placeholderTextColor={Colors.black}
          onChangeText={handlePassword}
          style={styles.textInput}
          textColor={MD2Colors.black}
          mode={'outlined'}
          autoComplete={"email"}
          autoCorrect
          secureTextEntry
        />
      </KeyboardAvoidingView>
    </View>
  );
};
export default React.memo(Login);
