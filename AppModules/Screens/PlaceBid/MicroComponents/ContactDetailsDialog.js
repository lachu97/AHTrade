import React, {useRef, useState} from 'react';
import {Button, Dialog, Text} from 'react-native-paper';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AHTextInput from '../../../Components/AHTextInput';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {showMiddleFeedBack} from "../../../Components/Toasts/ToastsFeedBack";
const width = Dimensions.get('window').width;

const ContactDetailsDialog = props => {
  const {isVisible, hideDialog, onSuccess} = props;
  const typeData = useRef({});
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
      <Dialog.Title>Enter your Contact Details</Dialog.Title>
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
            <AHTextInput
              value={phone}
              placeholder={'Phone'}
              keyboardType={'numeric'}
              style={styles.inputStyles}
              onChangeText={e => setPhone(e)}
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
          onPress={() => {
            typeData.current = {
              name,
              email,
              phone,
              company,
              address,
              port,
            };
            const isEmpty = Object.values(typeData.current).some(
              value => !value || value.trim() === '',
            );
            if (isEmpty) {
              showMiddleFeedBack('Please Provide the Details')
            } else {
              onSuccess([
                {value: name, title: 'Name'},
                {value: email, title: 'Email'},
                {value: phone, title: 'Phone'},
                {value: company, title: 'Company'},
                {value: address, title: 'Address'},
                {value: port, title: 'Port'},
              ]);
              setTimeout(() => {
                hideDialog();
              }, 250);
            }
          }}>
          Done
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
const styles = StyleSheet.create({
  inputStyles: {
    width: width * 0.73,
    marginVertical: 4,
    backgroundColor: Colors.light,
  },
});
export default React.memo(ContactDetailsDialog);
