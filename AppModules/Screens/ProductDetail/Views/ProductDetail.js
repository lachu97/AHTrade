import React from 'react';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {View} from 'react-native';
import productStyles from '../styles/ProductDetailStyles';
const ProductDetail = () => {
  return (
    <View style={productStyles.container}>
      <HeaderComponent />
    </View>
  );
};
export default React.memo(ProductDetail)
