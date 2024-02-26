import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import WebView from 'react-native-webview';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const WebViewScreen = () => {
  const route = useRoute();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let urlFromRoute = route.params?.url;
    setUrl(urlFromRoute);
    console.log(urlFromRoute);
  }, [route.params?.url]);
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark}}>
      <HeaderComponent name={route.params?.title} showHeader={true} />
      {loading ? (
        <ActivityIndicator
          style={{marginVertical: 5}}
          color={MD2Colors.white}
          size={'small'}
          animating
        />
      ) : null}
      <WebView
        style={{flex: 1, marginTop: 1}}
        source={{
          uri: url,
        }}
        javaScriptEnabled={true}
        renderLoading={() => (
          <ActivityIndicator
            style={{marginVertical: 5}}
            color={MD2Colors.black}
            size={'small'}
            animating
          />
        )}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};
export default React.memo(WebViewScreen);
