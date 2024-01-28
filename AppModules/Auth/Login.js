import React, {useCallback, useState} from 'react';
import {View, Pressable, KeyboardAvoidingView, Dimensions} from 'react-native';
import {
  Text,
  Provider as PaperProvider,
  DefaultTheme,
  MD2Colors,
} from 'react-native-paper';
import styles from './Authstyles/LoginStyles';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AHTextInput from '../Components/AHTextInput';
import AHButton from '../Components/AHButton';
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Update the label text color here
    primary: 'black', // Replace 'red' with any color you prefer
  },
};
const width = Dimensions.get('window').width;
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmail = useCallback(text => setEmail(text), []);
  const handlePassword = useCallback(text => setPassword(text), []);
  const handleSignUp = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>Login</Text>

      <KeyboardAvoidingView behavior={'padding'} style={styles.formContainer}>
        <AHTextInput
          // label="Email"
          value={email}
          placeholder={'Enter Email'}
          placeholderTextColor={Colors.black}
          onChangeText={handleEmail}
          style={styles.textInput}
          mode={'outlined'}
          autoComplete={'email'}
          outlineColor={MD2Colors.black}
          autoCorrect
          textColor={MD2Colors.black}
          inputMode={'email'}
          keyboardType={'email-address'}
          activeOutlineColor={MD2Colors.black}
        />
        <AHTextInput
          // label="Password"
          value={password}
          placeholder={'Enter Password'}
          activeOutlineColor={MD2Colors.black}
          placeholderTextColor={Colors.black}
          onChangeText={handlePassword}
          style={styles.textInput}
          textColor={MD2Colors.black}
          mode={'outlined'}
          autoComplete={'email'}
          autoCorrect
          secureTextEntry
        />
        <AHButton
          name={'Login'}
          onPress={() => console.log('djdj')}
          mode={'contained'}
          style={{width: width * 0.8, marginVertical: 10}}
          textColor={MD2Colors.black}
          buttonColor={MD2Colors.purple100}
        />
        <AHButton
          name={'Sign Up'}
          onPress={handleSignUp}
          mode={'contained'}
          style={{width: width * 0.8}}
          textColor={MD2Colors.black}
          buttonColor={MD2Colors.purple100}
        />
        <Pressable
          style={styles.guestTextStyles}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{color: MD2Colors.white}}>Continue as Guest</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};
export default React.memo(Login);
