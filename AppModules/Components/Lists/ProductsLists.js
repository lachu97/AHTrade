import React from 'react';
import {Dimensions, FlatList, Image, Pressable, View} from 'react-native';
import AHText from '../AHText';
import {Surface, Avatar, TouchableRipple, MD2Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AHButton from '../AHButton';
import FastImage from 'react-native-fast-image';
import {isIos} from '../../HelperFuntions/helpers';
const width = Dimensions.get('window').width;
const cardWidth = width * 0.47;
const height = Dimensions.get('window').height;
const cardHeight = Math.floor(height / 3);

const ProductCard = ({item, navigation}) => {
  return (
    <TouchableRipple
      onPress={() => {
        navigation.navigate('ProductDetail', {
          item: item,
        });
      }}>
      <Surface
        style={{
          width: cardWidth,
          alignItems: 'center',
          margin: 5,
          padding: 5,
          height: cardHeight,
          borderRadius: 10,
        }}
        elevation={4}>
        <FastImage
          style={{width: cardWidth - 5, height: cardHeight / 2}}
          source={{
            uri: item.image,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <AHText variant={'bodyLarge'} numberOfLines={1} name={item.name} />
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
            icon={'import'}
            style={{borderRadius: 8, marginVertical: 3}}
            labelStyle={{
              color: MD2Colors.black,
              fontSize: 17,
              fontWeight: 'bold',
            }}
            name={'Import'}
            onPress={() =>
              navigation.navigate('Import', {
                item: item,
              })
            }
          />
          <AHButton
            icon={'chevron-right-circle-outline'}
            style={{borderRadius: 8}}
            labelStyle={{
              color: MD2Colors.black,
              fontSize: 17,
              fontWeight: 'bold',
            }}
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

const ProductList = ({data,ListHeader}) => {
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
      ListHeaderComponent={ListHeader}
      keyExtractor={(item, index) => `${index}`}
    />
  );
};
export default React.memo(ProductList);
