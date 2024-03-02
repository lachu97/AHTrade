import React, {useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import AHText from '../AHText';
import {
  Surface,
  Text,
  TouchableRipple,
  MD2Colors,
  Button,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AHButton from '../AHButton';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
const width = Dimensions.get('window').width;
const cardWidth = width * 0.47;
const height = Dimensions.get('window').height;
const cardHeight = Math.floor(height / 3);

const ProductCard = ({item, navigation}) => {
  const [imageLoad, setImageLoad] = useState(false);
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
          onLoadStart={() => setImageLoad(true)}
          onLoadEnd={() => setImageLoad(false)}
          resizeMode={FastImage.resizeMode.contain}>
          {imageLoad ? (
            <LottieView
              autoPlay
              loop
              style={{width: cardWidth - 5, height: cardHeight / 2}}
              source={require('../../assets/anim/myLoading8.json')}
            />
          ) : null}
        </FastImage>
        <AHText
          variant={'bodyLarge'}
          numberOfLines={1}
          style={{marginVertical: 3, fontSize: 16.5, fontWeight: '500'}}
          name={item.title}
        />
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

const ProductList = ({data, ListHeader}) => {
  const navigation = useNavigation();
  const renderItems = ({item}) => (
    <ProductCard item={item} navigation={navigation} />
  );
  return (
    <FlatList
      style={{margin: 1, backgroundColor: MD2Colors.transparent}}
      data={data}
      renderItem={renderItems}
      numColumns={2}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={() => (
        <View style={{width: width}}>
          <LottieView
            autoPlay
            loop
            source={require('../../assets/anim/myLoading8.json')}
            style={{
              flex: 1,
              height: 64,
              width: width,
            }}
          />
        </View>
      )}
      ListFooterComponent={() => (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 15,
          }}>
          {data.length > 0 ? (
            <>
              <Text style={{color: MD2Colors.white}}>
                We are Expanding,Try Suggesting Products
              </Text>
              <Button
                style={{
                  width: width * 0.51,
                  borderRadius: 8,
                  borderColor: MD2Colors.teal100,
                  borderWidth: 1,
                  alignSelf: 'center',
                  marginVertical: 5,
                }}
                icon={'book-edit'}
                onPress={() => navigation.navigate('Recommendation')}>
                Suggest Products
              </Button>
            </>
          ) : null}
        </View>
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
};
export default React.memo(ProductList);
