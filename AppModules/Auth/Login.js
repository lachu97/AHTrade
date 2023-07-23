import React, {useCallback, useState} from 'react';
import {View, Pressable, KeyboardAvoidingView} from 'react-native';
import {
  Text,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import styles from './Authstyles/LoginStyles';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
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
          label="Email"
          value={email}
          placeholder={"Enter Email"}
          onChangeText={handleEmail}
          style={styles.textInput}
          mode={'outlined'}
          autoComplete={"email"}
          autoCorrect
          inputMode={'email'}
          keyboardType={'email-address'}
          right={<TextInput.Icon icon="MailIcon" />}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
export default React.memo(Login);
