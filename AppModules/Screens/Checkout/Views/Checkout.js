import React, {useEffect, useState} from 'react';
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
import {getUserDetails} from '../../../Storage/AppLocalStorage/UserStorageData';
import {addOrderDetails} from '../Reducers/CheckoutReducer';
import PaymentInfoBanner from '../MicroComponents/PaymentInfoBanner';
import {PaymentBanks} from '../../../Constants/AppConstants';
import {HapticFeedback} from '../../../HelperFuntions/helpers';
import {showToastSuccess} from '../../../Components/Toasts/ToastsFeedBack';
import {TextView} from '../../../Components/AHText';
import {textTheme} from '../../../Themes/themes';

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [showInfo, setInfo] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserDetails().then(r => {
      setUser(r.user);
    });
    setTimeout(() => {
      setPaymentInfo(true);
    }, 2200);
  }, []);
  const result = route.params?.item;
  console.log(JSON.stringify(result));
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark}}>
      <HeaderComponent showHeader name={'Checkout'} />
      <ScrollView style={{flex: 1, marginVertical: 4, padding: 5, bottom: 15}}>
        <PaymentInfoBanner
          isVisible={paymentInfo}
          onDismiss={() => setPaymentInfo(false)}
          message={PaymentBanks}
        />

        <CheckoutCardComponent result={result} />
        <ContactDetailsComponent
          contact={result.contact}
          navigation={navigation}
        />
      </ScrollView>
      <View
        style={{
          flex: 0.11,
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
          <TextView
            style={{color: MD2Colors.white, margin: 1, fontWeight: 'bold'}}>
            We charge a Processing Fee of $ 9.99,
          </TextView>
          <TouchableRipple
            onPress={() => {
              setInfo(true);
            }}>
            <TextView style={{color: MD2Colors.tealA200}}> Why ?</TextView>
          </TouchableRipple>
        </View>
        <AHButton
          name={'Pay & Complete Order'}
          icon={'cart-arrow-right'}
          onPress={() => {
            HapticFeedback('impactMedium');

            setLoading(true);
            // dispatch(sendEmailAction())
            let orderObject = {
              productID: result.item.pid,
              user_id: user?.id ? user?.id : null,
              shipmentType: result.mode.toString(),
              packagingType: result?.packaging.toString(),
              price: parseInt(result.price, 10),
              quantity: parseInt(result.quantity, 10),
              incoterm: result.incoterm.toString(),
              destination: result.contact.port.toString(),
              email: result.contact.email.toString(),
              phone: result.contact?.phone.toString(),
              product_name: result.item?.title.toString(),
              user_name: result.contact?.name.toString(),
              payment: result.payment.toString(),
              unit: result.item?.unit,
            };
            dispatch(addOrderDetails(orderObject));
            // getPayPalAccessToken();
            //   dispatch(postOrderToDBAction(orderObject));
            //showBottomFeedBack('Order Created Successfully ');
            setTimeout(() => {
              setLoading(false);
              showToastSuccess('Moving to Payments');

              navigation.navigate('NowPayments', {
                item: result,
                orderObject: orderObject,
              });
            }, 1200);
          }}
          loading={loading}
          style={{
            width: width * 0.94,
            margin: 2,
            borderRadius: 8,
            backgroundColor: MD2Colors.tealA100,
          }}
          labelStyle={{
            fontFamily: textTheme.bold.fontFamily,
          }}
        />
      </View>
      <InfoDialoag isVisible={showInfo} onDismiss={() => setInfo(false)} />
    </View>
  );
};
export default React.memo(CheckoutScreen);
