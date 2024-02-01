import React from 'react';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {View} from 'react-native';
import productStyles from '../styles/ProductDetailStyles';
import {useRoute} from "@react-navigation/native";
import {Text} from "react-native-paper";
const ProductDetail = () => {
    const route = useRoute();

  return (
    <View style={productStyles.container}>
      <HeaderComponent />
        <Text>{route.params?.item?.name}</Text>

    </View>
  );
};
export default React.memo(ProductDetail)
