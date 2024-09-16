import React, {useCallback} from 'react';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {Dimensions, ScrollView, View} from 'react-native';
import productStyles from '../styles/ProductDetailStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {List, MD2Colors, Text, TouchableRipple} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import AHButton from '../../../Components/AHButton';
import {
  showBottomFeedBack,
  showMiddleFeedBack,
} from '../../../Components/Toasts/ToastsFeedBack';
import {getLongName, HapticFeedback} from '../../../HelperFuntions/helpers';
import {TextView} from '../../../Components/AHText';
import {textTheme} from '../../../Themes/themes';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  let item = route.params?.item;
  const onImportPress = useCallback(() => {
    HapticFeedback('impactLight');
    if (!item.isAvailable) {
      showMiddleFeedBack(
        'Product Currently not Available,Try Again Sometime Later',
      );
      return;
    }

    navigation.navigate('Import', {
      item: item,
    });
  }, [item, navigation]);
  const onPlaceBidPress = useCallback(() => {
    HapticFeedback('impactLight');
    if (!item.isAvailable) {
      showMiddleFeedBack(
        'Product Currently not Available,Try Again Sometime Later',
      );
      return;
    }

    navigation.navigate('PlaceBid', {
      item: item,
    });
  }, [item, navigation]);

  return (
    <View style={productStyles.container}>
      <HeaderComponent showHeader={true} name={`${item.title}`} />
      <ScrollView style={{flex: 1, bottom: 54, marginTop: 54}}>
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
            <TextView
              style={{
                flexGrow: 0.7,
                color: MD2Colors.white,
                fontSize: 26,
                marginHorizontal: 10,
                marginVertical: 5,
                padding: 6,
                fontWeight: '500',
              }}
              numberOfLines={2}
              variant={'headlineSmall'}>
              {item.title}
            </TextView>
          </View>
          <TextView
            style={{
              color: item.isAvailable ? MD2Colors.tealA100 : MD2Colors.red400,
              textAlign: 'center',
              marginVertical: 15,
              marginHorizontal: 25,
              alignSelf: 'flex-start',
              fontSize: 12,
              fontWeight: 'bold',
              flexGrow: 0.2,
            }}
            variant={'bodyLarge'}>
            {item.isAvailable ? 'In Stock' : 'Out of Stock'}
          </TextView>
        </View>
        <View
          style={{
            width: width * 0.94,
            backgroundColor: MD2Colors.transparent,
            marginHorizontal: 10,
            padding: 2,
            flexGrow: 0.38,
            marginVertical: 5,
          }}>
          <List.Item
            title={'Price :'}
            titleStyle={{
              fontWeight: 'bold',
              color: MD2Colors.white,
              padding: 5,
              fontSize: 14,
              marginHorizontal: 10,
              fontFamily: textTheme.bold.fontFamily,
            }}
            right={() => (
              <TextView
                style={{
                  color: MD2Colors.white,
                  textAlign: 'center',
                  marginVertical: 5,
                  marginHorizontal: 25,
                  alignSelf: 'flex-start',
                  fontSize: 17,
                  fontWeight: 'bold',
                  flexGrow: 0.2,
                }}
                variant={'bodyLarge'}>
                $ {item.price} / {getLongName(item.unit)}
              </TextView>
            )}
          />
          <List.Item
            title={'MOQ :'}
            titleStyle={{
              fontWeight: 'bold',
              color: MD2Colors.white,
              padding: 5,
              fontSize: 14,
              marginHorizontal: 10,
              fontFamily: textTheme.bold.fontFamily,
            }}
            right={() => (
              <TextView
                style={{
                  color: MD2Colors.white,
                  textAlign: 'center',
                  marginVertical: 5,
                  marginHorizontal: 25,
                  alignSelf: 'flex-start',
                  fontSize: 16,
                  fontWeight: 'bold',
                  flexGrow: 0.2,
                }}
                variant={'bodyLarge'}>
                {item.moq} {getLongName(item.unit)}
              </TextView>
            )}
          />
          <TextView
            style={{
              color: MD2Colors.white,
              textAlign: 'center',
              marginVertical: 10,
              marginHorizontal: 32,
              alignSelf: 'flex-start',
              fontSize: 16,
              fontWeight: 'bold',
              flexGrow: 0.2,
            }}
            variant={'bodyLarge'}>
            Description:
          </TextView>
          <TouchableRipple
            onPress={() => {
              showBottomFeedBack(`${item.description}`);
            }}
            style={{
              flex: 1,
              borderRadius: 8,
              padding: 1,
              elevation: 1,
              marginHorizontal: 25,
            }}>
            <TextView
              numberOfLines={4}
              style={{
                flex: 1,
                fontWeight: 'bold',
                color: MD2Colors.white,
                padding: 5,
              }}>
              {item.description}
            </TextView>
          </TouchableRipple>
          <List.Item
            title={'Delivery :'}
            titleStyle={{
              fontWeight: 'bold',
              color: MD2Colors.white,
              padding: 5,
              fontSize: 16,
              marginHorizontal: 15,
              fontFamily: textTheme.bold.fontFamily,
            }}
          />
          <TextView
            numberOfLines={5}
            style={{
              fontWeight: '500',
              color: MD2Colors.white,
              marginHorizontal: 10,
              fontSize: 14.5,
              padding: 2,
              textAlign: 'center',
            }}>
            {item.delivery}
          </TextView>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          width: width * 0.95,
          flex: 1,
          bottom: 8,
          position: 'absolute',
          backgroundColor: MD2Colors.transparent,
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: 10,
        }}>
        <AHButton
          style={{
            flex: 1,
            margin: 2,
            borderRadius: 6,
            backgroundColor: MD2Colors.tealA100,
          }}
          icon={'import'}
          name={'Import Item'}
          labelStyle={{
            fontFamily: textTheme.bold.fontFamily,
          }}
          mode={'contained'}
          onPress={onImportPress}
        />
        {/*<AHButton*/}
        {/*  style={{flex: 1, margin: 2, borderRadius: 8}}*/}
        {/*  icon={'chevron-right-circle-outline'}*/}
        {/*  name={'Place Bid'}*/}
        {/*  onPress={onPlaceBidPress}*/}
        {/*/>*/}
      </View>
    </View>
  );
};
export default React.memo(ProductDetail);
