import React, {useState} from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import {MD2Colors, Text, TouchableRipple} from 'react-native-paper';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import CheckoutCardComponent, {
  ContactDetailsComponent,
} from '../MicroComponents/CheckoutCardComponent';
import AHButton from '../../../Components/AHButton';
import InfoDialoag from '../MicroComponents/InfoDialoag';

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [showInfo, setInfo] = useState(false);
  const result = route.params?.item;
  console.log(JSON.stringify(result));
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark}}>
      <HeaderComponent showHeader name={'Checkout'} />
      <ScrollView style={{flex: 1, marginVertical: 5, padding: 5, bottom: 10}}>
        <CheckoutCardComponent result={result} />
        <ContactDetailsComponent
          contact={result.contact}
          navigation={navigation}
        />
      </ScrollView>
      <View
        style={{
          flex: 0.12,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
          width: width - 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 2,
          }}>
          <Text style={{color: MD2Colors.white, margin: 1}}>
            We charge Processing Fee of $ 4.99,
          </Text>
          <TouchableRipple
            onPress={() => {
              setInfo(true);
            }}>
            <Text> Why?</Text>
          </TouchableRipple>
        </View>
        <AHButton
          name={'Pay $ 4.99 & Complete Order'}
          icon={'cart-arrow-right'}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 5200);
          }}
          loading={loading}
          style={{width: width * 0.94, margin: 2, borderRadius: 8}}
        />
      </View>
      <InfoDialoag isVisible={showInfo} onDismiss={() => setInfo(false)} />
    </View>
  );
};
export default React.memo(CheckoutScreen);
