import React, {useCallback, useState} from 'react';
import {
  View,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from 'react-native';
import {
  Text,
  Provider as PaperProvider,
  DefaultTheme,
  MD2Colors,
  HelperText,
  TouchableRipple,
} from 'react-native-paper';
import styles from './Authstyles/LoginStyles';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AHTextInput from '../Components/AHTextInput';
import AHButton from '../Components/AHButton';
import {setIsGuestUser, storeIsLoggedIn} from '../Storage/LocalStorage';
import {HapticFeedback, validateEmail} from '../HelperFuntions/helpers';
import {
  showBottomFeedBack,
  showMiddleFeedBack,
} from '../Components/Toasts/ToastsFeedBack';
import {supaBaseClient} from '../SupaBase/Client/supabaseClient';
import LoadingModal from '../Components/Modals/LoadingModal';
import {setUserDetails} from '../Storage/AppLocalStorage/UserStorageData';
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
  const [textStatus, setTextStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const handlePassword = useCallback(text => setPassword(text), []);
  const handleSignUp = useCallback(() => {
    HapticFeedback('impactMedium');
    navigation.navigate('Register');
  }, [navigation]);
  const handleSignIn = useCallback(async () => {
    try {
      HapticFeedback('impactMedium');
      Keyboard.dismiss();
      let result = validateEmail(email);

      if (!result) {
        console.log('Not a valid email');
        showMiddleFeedBack('Provide a Valid Email');
        return;
      }
      if (password === '') {
        showMiddleFeedBack('Provide a Valid Password');
        return;
      }
      setLoading(true);
      const {data, error} = await supaBaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        showBottomFeedBack(error.message.toString());
        console.log(`Error = ${JSON.stringify(error)}`);
        return;
      }
      if (data) {
        await setUserDetails(data);
        await storeIsLoggedIn(true);
        await setIsGuestUser(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        showBottomFeedBack('Login SuccessFull');

        console.log(`Result data = ${JSON.stringify(data)}`);
      }
    } catch (e) {
      console.error('Error=' + e.message());
    } finally {
      setLoading(false);
    }
  }, [email, navigation, password]);
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
          right={<TextInput.Icon icon={'email'} color={MD2Colors.black} />}
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
          autoCorrect
          secureTextEntry={textStatus}
          right={
            <TextInput.Icon
              icon={textStatus ? 'eye-off' : 'eye'}
              onPress={() => setTextStatus(prev => !prev)}
              color={MD2Colors.black}
            />
          }
        />
        <AHButton
          name={loading ? 'Loading...' : 'Login'}
          onPress={handleSignIn}
          loading={loading}
          mode={'contained'}
          style={{width: width * 0.8, marginVertical: 15, borderRadius: 8}}
          textColor={MD2Colors.black}
          buttonColor={MD2Colors.purple100}
        />
        <AHButton
          name={'Sign Up'}
          onPress={handleSignUp}
          mode={'contained'}
          style={{width: width * 0.8, borderRadius: 8}}
          textColor={MD2Colors.black}
          buttonColor={MD2Colors.purple100}
        />
        <TouchableRipple
          style={styles.guestTextStyles}
          onPress={() => {
            HapticFeedback('impactMedium');
            storeIsLoggedIn(false);
            setIsGuestUser(true);
            navigation.navigate('Home');
          }}>
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableRipple>
      </KeyboardAvoidingView>
    </View>
  );
};
export default React.memo(Login);
