import React from 'react';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {Dimensions, ScrollView, View} from 'react-native';
import productStyles from '../styles/ProductDetailStyles';
import {useRoute} from '@react-navigation/native';
import {MD2Colors, Text} from 'react-native-paper';
import {AHWhiteText} from '../../../Components/AHText';
import FastImage from 'react-native-fast-image';
const height = Dimensions.get('window').height;
const ProductDetail = () => {
  const route = useRoute();
  let item = route.params?.item;

  return (
    <View style={productStyles.container}>
      <HeaderComponent showHeader={true} name={'Product Detail'} />
      <FastImage
        style={{
          width: '95%',
          height: height / 3,
          alignSelf: 'center',
          padding: 5,
        }}
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: item.image,
          priority: FastImage.priority.normal,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
          padding: 1,
          alignItems: 'center',
          alignContent: 'center',
          flex: 0.2,
        }}>
        <Text
          style={{
            flex: 0.5,
            color: MD2Colors.white,
            fontSize: 22,
            marginHorizontal: 10,
            marginVertical: 5,
            padding: 6,
          }}
          variant={'bodyMedium'}>
          {item.name}
        </Text>
        <Text
          style={{
            color: MD2Colors.white,
            textAlign: 'center',
            marginVertical: 5,
            flex: 0.5,
            alignSelf: 'center',
            marginHorizontal: 10,
          }}
          variant={'bodyLarge'}>
          $ {item.price}
        </Text>
      </View>
    </View>
  );
};
export default React.memo(ProductDetail);
