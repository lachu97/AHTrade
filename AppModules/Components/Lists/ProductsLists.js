import React from 'react';
import {Dimensions, FlatList, Image, Pressable, View} from 'react-native';
import AHText from '../AHText';
import {Surface, Avatar, TouchableRipple, MD2Colors} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
const width = Dimensions.get('window').width;

const ProductCard = ({item,navigation}) => {
  return (
    <TouchableRipple onPress={() => {navigation.navigate('ProductDetail')}}>
      <Surface
        style={{
          width: width * 0.47,
          alignItems: 'center',
          margin: 5,
          padding: 5,
        }}
        elevation={3}>
        <Avatar.Image
          source={require('../../assets/Icons/spice.png')}
          size={54}
        />
        <AHText name={'Spices'} />
      </Surface>
    </TouchableRipple>
  );
};

const ProductList = ({data}) => {
    const navigation = useNavigation()
  const renderItems = ({item}) => <ProductCard item={item} navigation={navigation} />;
  return (
    <FlatList
      style={{margin: 2, backgroundColor: MD2Colors.transparent}}
      data={data}
      renderItem={renderItems}
      numColumns={2}
      keyExtractor={(item, index) => `${index}`}
    />
  );
};
export default React.memo(ProductList);
