import React, {useEffect} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Text} from 'react-native-paper';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {useDispatch, useSelector} from 'react-redux';
import WebView from 'react-native-webview';
import Toast from 'react-native-simple-toast';
import {showMiddleFeedBack} from '../../../Components/Toasts/ToastsFeedBack';
import {useNavigation, useRoute} from '@react-navigation/native';
const nowPaymentsAction = data => ({
  type: 'GET_NOWPAYMENTS_DATA',
  payload: {
    data: data,
  },
});
const NowpaymentScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const result = route.params?.item;
  const orderObject = route.params?.orderObject;
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const paymentLink = useSelector(state => state.nowPayment.approveLink);
  const onNavChange = data => {
    const {url} = data;
    console.log('Nav Change' + JSON.stringify(data));

    if (url.includes('https://atlashorizon.in/success/')) {
      showMiddleFeedBack('Payment Success');
      navigation.navigate('Success', {
        item: result,
        orderObject: orderObject,
      });
    }
    if (url.includes('https://atlashorizon.in/cancel/')) {
      showMiddleFeedBack('Payment Failure,Try Again');
      navigation.goBack();
    }
  };
  useEffect(() => {
    const getPaymentDetails = () => {
      dispatch(nowPaymentsAction());
    };
    getPaymentDetails(orderObject);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.dark,
        justifyContent: 'flex-start',
      }}>
      <HeaderComponent />
      {paymentLink ? (
        <WebView
          source={{
            uri: paymentLink,
          }}
          style={{
            flex: 1,
            alignSelf: 'center',
            width: width * 0.98,
            height: height * 0.9,
          }}
          onNavigationStateChange={onNavChange}
          javaScriptEnabled={true}
        />
      ) : null}
    </View>
  );
};
export default React.memo(NowpaymentScreen);
