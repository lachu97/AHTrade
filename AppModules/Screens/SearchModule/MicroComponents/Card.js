import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Surface, Text, TouchableRipple} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AHButton from '../../../Components/AHButton';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const cardWidth = width * 0.93;
const cardHeight = Math.floor(height / 5);
const SearchCardItem = ({navigation}) => {
  return (
    <TouchableRipple
      onPress={() => {
        navigation.navigate('ProductDetail');
      }}>
      <Surface style={styles.card} elevation={5}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItem: 'center',
            padding: 10,
          }}>
          <View style={{width: cardWidth / 3}}>
            <MaterialCommunityIcons name={'arrow-left'} size={20} />
          </View>
          <View style={{}}>
            <Text
              style={{width: cardWidth / 2}}
              variant={'headlineMedium'}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              titledddddjddjdddddddhdh
            </Text>
            <Text
              style={{width: cardWidth / 2}}
              variant={'bodyMedium'}
              numberOfLines={2}>
              body
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Text variant={'bodySmall'}>MOQ</Text>
              <Text variant={'bodySmall'}>Min Price $-</Text>
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
                icon={'clock-time-ten-outline'}
                style={{borderRadius: 8}}
                name={'Place Bid'}
                onPress={() => navigation.navigate('PlaceBid')}
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
