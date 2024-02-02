import React, {useCallback} from 'react';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {Dimensions, ScrollView, View} from 'react-native';
import productStyles from '../styles/ProductDetailStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Button,
  MD2Colors,
  MD3Colors,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {AHWhiteText} from '../../../Components/AHText';
import FastImage from 'react-native-fast-image';
import AHButton from '../../../Components/AHButton';
import {showBottomFeedBack} from '../../../Components/Toasts/ToastsFeedBack';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  let item = route.params?.item;
  const onImportPress = useCallback(() => {
    navigation.navigate('Import', {
      item: item,
    });
  }, [item, navigation]);
  const onPlaceBidPress = useCallback(() => {
    navigation.navigate('PlaceBid', {
      item: item,
    });
  }, [item, navigation]);

  return (
    <View style={productStyles.container}>
      <HeaderComponent showHeader={false} name={'Product Detail'} />
      <FastImage
        style={{
          width: '95%',
          height: height / 2.7,
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
        <View>
          <Text
            style={{
              flexGrow: 0.7,
              color: MD2Colors.white,
              fontSize: 22,
              marginHorizontal: 10,
              marginVertical: 5,
              padding: 6,
            }}
            numberOfLines={2}
            variant={'bodyMedium'}>
            {item.name}
          </Text>
          <Text
            style={{
              color: MD2Colors.white,
              textAlign: 'center',
              marginVertical: 5,
              marginHorizontal: 15,
              alignSelf: 'flex-start',
              fontSize: 22,
              fontWeight: 'bold',
              flexGrow: 0.2,
            }}
            variant={'bodyLarge'}>
            $ {item.price} / MT
          </Text>
        </View>
      </View>
      <View
        style={{
          width: width * 0.94,
          backgroundColor: MD2Colors.transparent,
          marginHorizontal: 10,
          padding: 2,
          flexGrow: 0.18,
          marginVertical: 5,
        }}>
        <TouchableRipple
          onPress={() => {
            showBottomFeedBack(`${item.description}`);
          }}
          style={{
            borderWidth: 1,
            borderColor: MD3Colors.secondary0,
            flex: 1,
            borderRadius: 8,
            padding: 1,
            elevation: 5,
          }}>
          <Text
            numberOfLines={4}
            style={{
              flex: 1,
              fontWeight: 'bold',
              color: MD2Colors.white,
              padding: 5,
            }}>
            {item.description}
          </Text>
        </TouchableRipple>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width * 0.94,
          flex: 1,
          bottom: 8,
          position: 'absolute',
          backgroundColor: MD2Colors.transparent,
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: 10,
        }}>
        <AHButton
          style={{flex: 1, margin: 2, borderRadius: 8}}
          icon={'import'}
          name={'Import'}
          onPress={onImportPress}
        />
        <AHButton
          style={{flex: 1, margin: 2, borderRadius: 8}}
          icon={'chevron-right-circle-outline'}
          name={'Place Bid'}
          onPress={onPlaceBidPress}
        />
      </View>
    </View>
  );
};
export default React.memo(ProductDetail);
