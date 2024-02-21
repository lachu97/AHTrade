import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {MD2Colors, Surface, Text, TouchableRipple} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AHButton from '../../../Components/AHButton';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const cardWidth = width * 0.93;
const cardHeight = Math.floor(height / 5);
const SearchCardItem = ({navigation, item}) => {
  return (
    <TouchableRipple
      onPress={() => {
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
          <View style={{}}>
            <Text
              style={{width: cardWidth / 2}}
              variant={'headlineMedium'}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {item.name}
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
              }}>
              <Text variant={'bodySmall'}>MOQ : {item.quantity}</Text>
              <Text variant={'bodySmall'}>Min Price : $ {item.price}</Text>
            </View>
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
                onPress={() => {
                  console.log('iam pressed fr import');
                  console.log(JSON.stringify(item))
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
  },
});
export default React.memo(SearchCardItem);
