import React, {useRef, useState} from 'react';
import {Button, Dialog, MD2Colors, Text} from 'react-native-paper';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AHTextInput from '../../../Components/AHTextInput';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {showMiddleFeedBack} from '../../../Components/Toasts/ToastsFeedBack';
import PhoneInput from 'react-native-phone-number-input';
import {HapticFeedback, validateEmail} from '../../../HelperFuntions/helpers';
const width = Dimensions.get('window').width;

const ContactDetailsDialog = props => {
  const {isVisible, hideDialog, onSuccess} = props;
  const typeData = useRef({});
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState('');
  const [email, setEmail] = useState(
    typeData.current.email ? typeData.current.email : '',
  );
  const [name, setName] = useState(
    typeData.current.name ? typeData.current.name : '',
  );
  const [address, setAddress] = useState(
    typeData.current.address ? typeData.current.address : '',
  );
  const [phone, setPhone] = useState(
    typeData.current.phone ? typeData.current.phone : '',
  );
  const [company, setCompany] = useState(
    typeData.current.company ? typeData.current.company : '',
  );
  const [port, setPort] = useState(
    typeData.current.port ? typeData.current.port : '',
  );
  return (
    <Dialog visible={isVisible} onDismiss={hideDialog}>
      <Dialog.Title style={{fontSize: 15, fontWeight: '400'}}>
        Enter Contact Details
      </Dialog.Title>
      <Dialog.ScrollArea>
        <ScrollView contentContainerStyle={{paddingHorizontal: 1}}>
          <KeyboardAvoidingView>
            <AHTextInput
              value={email}
              placeholder={'Email'}
              keyboardType={'email-address'}
              style={styles.inputStyles}
              onChangeText={e => setEmail(e)}
            />
            <AHTextInput
              value={name}
              placeholder={'Name'}
              style={styles.inputStyles}
              onChangeText={e => setName(e)}
            />
            {/*<AHTextInput*/}
            {/*  value={phone}*/}
            {/*  placeholder={'Phone'}*/}
            {/*  keyboardType={'numeric'}*/}
            {/*  style={styles.inputStyles}*/}
            {/*  onChangeText={e => setPhone(e)}*/}
            {/*/>*/}
            <PhoneInput
              ref={phoneInput}
              keyboardType={'numeric'}
              containerStyle={styles.phoneInputStyles}
              textContainerStyle={{
                backgroundColor: Colors.light,
              }}
              textInputProps={{
                placeholderTextColor: MD2Colors.black,
              }}
              textInputStyle={{
                height: 42,
                color: MD2Colors.black,
              }}
              defaultCode={'US'}
              value={phone}
              onChangeText={text => {
                setPhone(text);
              }}
              onChangeFormattedText={text => {
                setFormattedValue(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
            <AHTextInput
              value={company}
              style={styles.inputStyles}
              placeholder={'Company '}
              onChangeText={e => setCompany(e)}
            />
            <AHTextInput
              value={port}
              placeholder={'Destination Port of ...'}
              style={styles.inputStyles}
              onChangeText={e => setPort(e)}
            />
            <AHTextInput
              value={address}
              placeholder={'Address'}
              style={styles.inputStyles}
              onChangeText={e => setAddress(e)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button
          icon={'arrow-left-bottom'}
          onPress={() => {
            HapticFeedback();
            typeData.current = {
              name,
              email,
              phone,
              company,
              address,
              port,
            };
            const checkValid = phoneInput.current?.isValidNumber(phone);

            if (!checkValid) {
              showMiddleFeedBack('Enter a Valid Phone');
              return;
            }
            let result = validateEmail(email);
            if (!result) {
              showMiddleFeedBack('Provide a Valid Email');
              return;
            }
            const isEmpty = Object.values(typeData.current).some(
              value => !value || value.trim() === '',
            );
            if (isEmpty) {
              showMiddleFeedBack(
                'One of the Details is Empty, Provide all Details',
              );
            } else {
              onSuccess([
                {value: name, title: 'Name'},
                {value: email, title: 'Email'},
                {value: formattedValue, title: 'Phone'},
                {value: company, title: 'Company'},
                {value: address, title: 'Address'},
                {value: port, title: 'Port'},
              ]);
              typeData.current = {
                name,
                email,
                phone,
                company,
                address,
                port,
              };
              setTimeout(() => {
                hideDialog();
              }, 250);
            }
          }}>
          Done
        </Button>
        <Button icon={'cancel'} onPress={() => hideDialog()}>
          Cancel
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
const styles = StyleSheet.create({
  inputStyles: {
    width: width * 0.74,
    marginVertical: 4,
    backgroundColor: Colors.light,
  },
  phoneInputStyles: {
    width: width * 0.74,
    marginVertical: 4,
    backgroundColor: Colors.light,
    borderColor: MD2Colors.black,
    borderWidth: 1,
  },
});
export default React.memo(ContactDetailsDialog);
