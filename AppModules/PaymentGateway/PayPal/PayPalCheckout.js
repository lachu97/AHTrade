import React, {useEffect, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {Button, MD2Colors} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import WebView from 'react-native-webview';
import {HeaderComponent} from '../../Components/HeaderComponent';
const paypalDataAction = () => ({
  type: 'GET_PAYPAL_DATA',
});
const PayPalCheckout = () => {
  const dispatch = useDispatch();
  const paypalData = useSelector(state => state.paypal.payPalData);
  const url = useSelector(state => state.paypal.approveLink);
  const {width, height} = useWindowDimensions();
  const [id, setID] = useState(null);
  useEffect(() => {
    if (paypalData.length === 0) {
      return;
    }
    setID(paypalData.id);
  }, [paypalData]);
  useEffect(() => {
    console.log(`URL = ${url}`);
  }, [url]);
  const onMessage = data => {
    console.log('onMessage' + JSON.stringify(data));
  };
  const onNavChange = data => {
    console.log('Nav Change' + JSON.stringify(data));
  };
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
      {url ? (
        <WebView
          style={{
            flex: 1,
            alignSelf: 'center',
            width: width * 0.98,
            height: height * 0.9,
          }}
          onMessage={onMessage}
          onNavigationStateChange={onNavChange}
          source={{
            uri: url,
          }}
          javaScriptEnabled={true}
        />
      ) : null}
    </View>
  );
};
export default React.memo(PayPalCheckout);
