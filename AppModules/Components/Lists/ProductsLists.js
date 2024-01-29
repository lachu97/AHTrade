import React from 'react';
import {Dimensions, FlatList, Image, Pressable, View} from 'react-native';
import AHText from '../AHText';
import {Surface, Avatar, TouchableRipple, MD2Colors} from 'react-native-paper';
const width = Dimensions.get('window').width;

const ProductCard = ({item}) => {
  return (
    <TouchableRipple onPress={() => {}}>
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
  const renderItems = ({item}) => <ProductCard item={item} />;
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
