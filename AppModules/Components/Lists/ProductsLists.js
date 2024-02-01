import React from 'react';
import {Dimensions, FlatList, Image, Pressable, View} from 'react-native';
import AHText from '../AHText';
import {Surface, Avatar, TouchableRipple, MD2Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AHButton from '../AHButton';
import FastImage from 'react-native-fast-image';
const width = Dimensions.get('window').width;
const cardWidth = width * 0.47;
const height = Dimensions.get('window').height;
const cardHeight = Math.floor(height / 3);

const ProductCard = ({item, navigation}) => {
  return (
    <TouchableRipple
      onPress={() => {
        navigation.navigate('ProductDetail');
      }}>
      <Surface
        style={{
          width: cardWidth,
          alignItems: 'center',
          margin: 5,
          padding: 5,
          height: cardHeight,
        }}
        elevation={3}>
        <FastImage
          style={{width: cardWidth - 5, height: cardHeight / 2}}
          source={{
            uri: item.image,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <AHText variant={'headlineSmall'} name={item.name} />
        <View
          style={{
            flex: 1,
            marginVertical: 8,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            marginHorizontal: 2,
          }}>
          <AHButton
            icon={'clock-time-ten-outline'}
            style={{borderRadius: 8}}
            name={'Place Bid'}
            onPress={() =>
              navigation.navigate('PlaceBid', {
                item: item,
              })
            }
          />
        </View>
      </Surface>
    </TouchableRipple>
  );
};

const ProductList = ({data}) => {
  const navigation = useNavigation();
  const renderItems = ({item}) => (
    <ProductCard item={item} navigation={navigation} />
  );
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
