import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {MD2Colors, Surface, Text, TouchableRipple} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import AHButton from '../../../Components/AHButton';
import {HapticFeedback, isIos} from '../../../HelperFuntions/helpers';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const cardWidth = width * 0.93;
const cardHeight = Math.floor(height / 5);
const SearchCardItem = ({navigation, item}) => {
  return (
    <TouchableRipple
      onPress={() => {
        HapticFeedback();
        navigation.navigate('ProductDetail', {
          item: item,
        });
      }}>
      <Surface style={styles.card} elevation={5}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItem: 'center',
            padding: 10,
          }}>
          <View style={{width: cardWidth / 3, margin: 5}}>
            <FastImage
              style={{
                flex: 1,
                margin: 1,
                borderColor: MD2Colors.white,
                borderWidth: 0.7,
                borderRadius: 10,
              }}
              source={{
                uri: item.image,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{marginHorizontal: 6}}>
            <Text
              style={{
                width: cardWidth / 2,
                fontSize: 18,
                fontWeight: 'bold',
                marginHorizontal: 2,
              }}
              variant={'headlineMedium'}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {item.title}
            </Text>
            {/*<Text*/}
            {/*  style={{width: cardWidth / 2}}*/}
            {/*  variant={'bodyMedium'}*/}
            {/*  numberOfLines={2}>*/}
            {/*  {item.description}*/}
            {/*</Text>*/}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 5,
                marginHorizontal: 2,
              }}>
              <Text variant={'bodySmall'} style={styles.textStyles}>
                MOQ :{item.moq}
                {item.unit}
              </Text>
              <Text variant={'bodySmall'} style={styles.textStyles}>
                Price : ${item.price}/{item.unit}
              </Text>
            </View>
            <Text
              style={{width: cardWidth / 2, marginHorizontal: 2}}
              variant={'bodySmall'}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              Shipment by Air / Ocean
            </Text>
            <View
              style={{
                flex: 1,
                marginVertical: 2,
                position: 'absolute',
                bottom: 0,
                width: '100%',
              }}>
              <AHButton
                icon={'export'}
                style={{borderRadius: 8, marginLeft: 5}}
                name={'Import'}
                labelStyle={styles.textStyles}
                onPress={() => {
                  HapticFeedback();
                  navigation.navigate('Import', {
                    item: item,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </Surface>
    </TouchableRipple>
  );
};
const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    margin: 3,
    flex: 1,
    borderColor: MD2Colors.teal700,
    borderWidth: 0.8,
    borderRadius: 8,
  },
  textStyles: {
    fontSize: isIos() ? 12.5 : 13.6,
    fontWeight: 'bold',
  },
});
export default React.memo(SearchCardItem);
