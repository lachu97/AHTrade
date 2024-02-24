import React from 'react';
import {ScrollView, View} from 'react-native';
import {MD2Colors, Text} from 'react-native-paper';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import CheckoutCardComponent, {
  ContactDetailsComponent,
} from '../MicroComponents/CheckoutCardComponent';

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const result = route.params?.item;
  console.log(JSON.stringify(result));
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark}}>
      <HeaderComponent showHeader name={'Checkout'} />
      <ScrollView style={{flex: 1, marginVertical: 5, padding: 5, bottom: 10}}>
        <CheckoutCardComponent result={result} />
        <ContactDetailsComponent contact={result.contact} />
      </ScrollView>
      <View style={{flex: 0.08}}>
        <Text>iam here</Text>
      </View>
    </View>
  );
};
export default React.memo(CheckoutScreen);
