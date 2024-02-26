import React, {useCallback, useRef, useState} from 'react';
import {View, Pressable, KeyboardAvoidingView} from 'react-native';
import {
  Divider,
  MD2Colors,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import styles from './Authstyles/RegisterStyles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AHText from '../Components/AHText';
import AHTextInput from '../Components/AHTextInput';
import AHButton from '../Components/AHButton';
import LoadingModal from '../Components/Modals/LoadingModal';
import {validateEmail} from '../HelperFuntions/helpers';
import {
  showBottomFeedBack,
  showMiddleFeedBack,
} from '../Components/Toasts/ToastsFeedBack';
import {supaBaseClient} from '../SupaBase/Client/supabaseClient';
import {setUserDetails} from '../Storage/AppLocalStorage/UserStorageData';
import {setIsGuestUser, storeIsLoggedIn} from '../Storage/LocalStorage';
import PhoneInput from 'react-native-phone-number-input';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const Register = () => {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const phoneInput = useRef(null);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textStatus, setTextStatus] = useState(true);
  const handleSubmit = useCallback(async () => {
    try {
      if (!status) {
        showMiddleFeedBack('Agree to Privacy Policy');
        return;
      }

      let result = validateEmail(email);

      if (!result) {
        console.log('Not a valid email');
        showMiddleFeedBack('Provide a Valid Email');
        emailRef.current.focus();
        return;
      }
      if (password === '') {
        showMiddleFeedBack('Provide a Valid Password');
        return;
      }
      const checkValid = phoneInput.current?.isValidNumber(value);
      if (!checkValid) {
        showMiddleFeedBack('Enter a Valid Phone');
        return;
      }
      console.log(`Value-${formattedValue}`);
      console.log(`Value-${typeof formattedValue}`);
      setLoading(true);
      const {data, error} = await supaBaseClient.auth.signUp({
        email: email,
        password: password,
        phone: formattedValue,
      });
      if (error) {
        showBottomFeedBack('UnExpected Error Occurred,Try Again');
        return;
      }
      console.log('Success' + JSON.stringify(data));
      if (data) {
        await setUserDetails(data);
        await storeIsLoggedIn(true);
        await setIsGuestUser(false);
        navigation.navigate('Home');
      }
    } catch (e) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1350);
    }
  }, [email, formattedValue, password, status, value]);
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'flex-start',
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialCommunityIcons
            name={'arrow-left'}
            size={27}
            color={MD2Colors.white}
          />
        </Pressable>
      </View>
      <AHText name={'Sign Up'} style={styles.textStyles} />
      <Divider />
      <KeyboardAvoidingView behavior={'padding'} style={styles.formContainer}>
        <TextInput
          ref={emailRef}
          value={email}
          placeholder={'Email'}
          onChangeText={e => setEmail(e)}
          style={styles.textInput}
          outlineColor={MD2Colors.black}
          placeholderTextColor={MD2Colors.black}
          inputMode={'email'}
          keyboardType={'email-address'}
          autoComplete={'email'}
          textColor={MD2Colors.black}
          activeOutlineColor={MD2Colors.black}
          right={<TextInput.Icon icon={'email'} color={MD2Colors.black} />}
        />
        <AHTextInput
          value={password}
          placeholder={'Password'}
          onChangeText={e => setPassword(e)}
          style={styles.textInput}
          secureTextEntry={textStatus}
          right={
            <TextInput.Icon
              icon={textStatus ? 'eye-off' : 'eye'}
              color={MD2Colors.black}
              onPress={() => setTextStatus(prev => !prev)}
            />
          }
        />
        <PhoneInput
          ref={phoneInput}
          containerStyle={styles.textInput}
          textContainerStyle={{
            backgroundColor: Colors.light,
          }}
          textInputStyle={{
            height: 53,
            color: MD2Colors.black,
          }}
          defaultCode={'IN'}
          value={value}
          onChangeText={text => {
            setValue(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <TouchableRipple
          style={{marginHorizontal: 5}}
          onPress={() => setStatus(prevState => !prevState)}>
          <View style={styles.iAgree}>
            <MaterialCommunityIcons
              name={
                status ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
              }
              size={24}
              color={MD2Colors.white}
            />
            <Text style={styles.iAgreeText}>
              I, agree to Privacy Policy & T&C
            </Text>
          </View>
        </TouchableRipple>

        <AHButton
          name={'Submit'}
          onPress={handleSubmit}
          style={styles.buttonStyles}
        />
      </KeyboardAvoidingView>
      <LoadingModal isVisible={loading} />
    </View>
  );
};
export default React.memo(Register);
