import React, {useCallback, useState} from 'react';
import {View, Pressable, KeyboardAvoidingView} from 'react-native';
import { MD2Colors, Text, TextInput} from 'react-native-paper';
import styles from './Authstyles/RegisterStyles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AHText from '../Components/AHText';
import AHTextInput from '../Components/AHTextInput';
import AHButton from '../Components/AHButton';
const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState(false);
  const handleSubmit = useCallback(() => {}, []);
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
      <KeyboardAvoidingView behavior={'padding'} style={styles.formContainer}>
        <AHTextInput
          value={name}
          placeholder={'Name'}
          onChangeText={e => setName(e)}
          autoFocus
          style={styles.textInput}
          autoComplete={'name'}
          onChange={e => console.log(e.nativeEvent.text)}
          right={<TextInput.Icon icon={'alpha-a-box'} />}
        />
        <AHTextInput
          value={email}
          placeholder={'Email'}
          onChangeText={e => setEmail(e)}
          style={styles.textInput}
          inputMode={'email'}
          keyboardType={'email-address'}
          autoComplete={'email'}
          right={<TextInput.Icon icon={'email'} />}
        />
        <AHTextInput
          value={company}
          placeholder={'Company Name'}
          onChangeText={e => setCompany(e)}
          style={styles.textInput}
          right={<TextInput.Icon icon={'alpha-c'} />}
        />
        <AHTextInput
          value={phone}
          placeholder={'Contact No'}
          onChangeText={e => setPhone(e)}
          style={styles.textInput}
          autoComplete="tel"
          keyboardType="phone-pad"
          inputMode="tel"
          right={<TextInput.Icon icon={'phone'} />}
        />
        <AHTextInput
          value={country}
          placeholder={'Country'}
          onChangeText={e => setCountry(e)}
          style={styles.textInput}
          autoComplete="country"
          keyboardType="default"
          inputMode="tel"
          right={<TextInput.Icon icon={'weather-sunny'} />}
        />
        <View style={styles.iAgree}>
          <Pressable
            style={{marginHorizontal: 5}}
            onPress={() => setStatus(prevState => !prevState)}>
            <MaterialCommunityIcons
              name={
                status ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
              }
              size={24}
              color={MD2Colors.white}
            />
          </Pressable>
          <Text style={styles.iAgreeText}>I, agree to Privacy Policy & T&C</Text>
        </View>
        <AHButton
          name={'Submit'}
          onPress={handleSubmit}
          style={styles.buttonStyles}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
export default React.memo(Register);
