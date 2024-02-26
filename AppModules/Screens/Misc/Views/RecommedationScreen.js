import React, {useState} from 'react';
import {KeyboardAvoidingView, useWindowDimensions, View} from 'react-native';
import {Button, MD2Colors, Text, TextInput} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import AHButton from '../../../Components/AHButton';
import {useNavigation} from '@react-navigation/native';
import {showBottomFeedBack} from '../../../Components/Toasts/ToastsFeedBack';
const RecommendationScreen = () => {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark}}>
      <HeaderComponent name={'Product Recommendation'} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginVertical: 15,
          marginHorizontal: 10,
        }}>
        <KeyboardAvoidingView behavior={'padding'}>
          <Text
            style={{color: MD2Colors.white, fontSize: 18, alignSelf: 'center'}}>
            Product Recommendation
          </Text>
          <TextInput
            value={product}
            placeholder={'Product Name'}
            onChangeText={e => setProduct(e)}
            style={{
              width: width * 0.8,
              backgroundColor: Colors.light,
              marginVertical: 15,
              fontSize: 19,
            }}
            textColor={MD2Colors.black}
            activeOutlineColor={MD2Colors.black}
            mode={'outlined'}
            outlineColor={MD2Colors.black}
            placeholderTextColor={MD2Colors.black}
          />
        </KeyboardAvoidingView>
        <Button
          style={{
            width: width * 0.71,
            borderRadius: 8,
            borderColor: MD2Colors.teal100,
            borderWidth: 1,
            alignSelf: 'center',
            marginVertical: 5,
          }}
          icon={'book-edit'}
          loading={loading}
          onPress={() => {
            setLoading(true);
            if (product === '') {
              showBottomFeedBack('Product Name Is Empty');
              setLoading(false);
              return;
            }
            setTimeout(() => {
              setLoading(false);
              navigation.goBack();
            }, 2000);
          }}>
          Suggest Product
        </Button>
      </View>
    </View>
  );
};
export default React.memo(RecommendationScreen);
