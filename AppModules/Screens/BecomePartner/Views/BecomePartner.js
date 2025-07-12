import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button, Text, useTheme, MD2Colors} from 'react-native-paper';
import styles from '../Styles/BecomePartnerStyles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import AHButton from '../../../Components/AHButton';
import {textTheme} from '../../../Themes/themes';
import {showToastInfo} from '../../../Components/Toasts/ToastsFeedBack';
import {useNavigation} from '@react-navigation/native';
const BecomePartnerScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    company: '',
    contactPerson: '',
    phone: '',
    email: '',
    commodities: '',
    message: '',
  });

  const handleChange = (field, value) => {
    setForm({...form, [field]: value});
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', form);
    // TODO: connect to API or backend
    showToastInfo('Thanks for Submitting your Details');
    navigation.goBack();
  };

  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderComponent showHeader={true} />
      <Text variant="titleLarge" style={styles.heading}>
        Become a Partner
      </Text>
      <Text variant="bodyMedium" style={styles.subheading}>
        Join our global network of reliable suppliers.
      </Text>
      <View style={{alignItems: 'center'}}>
        <KeyboardAvoidingView behavior={'padding'}>
          <TextInput
            label="Company Name"
            value={form.company}
            onChangeText={text => handleChange('company', text)}
            // style={styles.input}
            // value={email}
            placeholder={'Enter Company'}
            placeholderTextColor={Colors.black}
            // onChangeText={handleEmail}
            style={styles.input}
            // mode={'outlined'}
            outlineColor={MD2Colors.black}
            autoCorrect
            textColor={MD2Colors.black}
            activeOutlineColor={MD2Colors.black}
          />
          <TextInput
            label="Contact Person"
            value={form.contactPerson}
            onChangeText={text => handleChange('contactPerson', text)}
            style={styles.input}
          />
          <TextInput
            label="Phone / WhatsApp"
            value={form.phone}
            keyboardType="phone-pad"
            onChangeText={text => handleChange('phone', text)}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={form.email}
            keyboardType="email-address"
            onChangeText={text => handleChange('email', text)}
            style={styles.input}
          />
          <TextInput
            label="Commodities You Supply"
            value={form.commodities}
            onChangeText={text => handleChange('commodities', text)}
            style={styles.input}
          />
          <TextInput
            label="Message (Optional)"
            value={form.message}
            onChangeText={text => handleChange('message', text)}
            style={styles.input}
            multiline
            numberOfLines={4}
          />
        </KeyboardAvoidingView>
        <AHButton
          onPress={handleSubmit}
          style={{
            marginTop: 20,
            width: '86%',
            backgroundColor: MD2Colors.teal50,
            borderRadius: 8,
          }}
          labelStyle={{
            fontFamily: textTheme.bold.fontFamily,
            fontSize: 15,
          }}
          name={'Apply Now'}
        />
      </View>
    </ScrollView>
  );
};

export default React.memo(BecomePartnerScreen);
