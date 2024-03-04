import React, {useEffect, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {Button, MD2Colors} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {captureOrders} from './PayPalAPIs';
import {useDispatch, useSelector} from 'react-redux';
import WebView from 'react-native-webview';
import {HeaderComponent} from '../../Components/HeaderComponent';
const paypalDataAction = () => ({
  type: 'GET_PAYPAL_DATA',
});
const PayPalCheckout = () => {
  const dispatch = useDispatch();
  const paypalData = useSelector(state => state.paypal.payPalData);
  const [url, setUrl] = useState(null);
  const {width, height} = useWindowDimensions();
  const [id, setID] = useState(null);
  useEffect(() => {
    if (paypalData.length === 0) {
      return;
    }
    setID(paypalData.id);
    let links = paypalData.links?.filter(item => item.rel === 'approve');
    setUrl(links.href);
  }, [paypalData]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.dark,
        justifyContent: 'flex-start',
        //alignItems: 'center',
      }}>
      <HeaderComponent />
      <Button
        textColor={MD2Colors.teal200}
        style={{borderWidth: 1, borderColor: MD2Colors.teal200}}
        onPress={() => {
          // captureOrders();
          dispatch(paypalDataAction());
        }}>
        Pay with PayPal
      </Button>
      <WebView
        style={{
          width: width * 0.9,
          height: height * 0.7,
        }}
        source={{
          uri: url,
        }}
      />
    </View>
  );
};
export default React.memo(PayPalCheckout);
