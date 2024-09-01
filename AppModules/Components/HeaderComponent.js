import React from 'react';
import {
  Appbar,
  MD2Colors,
  Avatar,
  Text,
  TouchableRipple,
  Icon,
  Tooltip,
  Badge,
} from 'react-native-paper';
import {Pressable, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AHText, {TextView} from './AHText';
import {useNavigation} from '@react-navigation/native';
import CountryFlag from 'react-native-country-flag';
import {HapticFeedback} from '../HelperFuntions/helpers';
export const HeaderComponent = ({showHeader = false, name = ''}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
      }}>
      <TouchableRipple
        hitSlop={{
          left: 10,
          top: 10,
          bottom: 10,
          right: 5,
        }}
        onPress={() => {
          HapticFeedback();

          navigation.goBack();
        }}>
        <MaterialCommunityIcons
          name={'arrow-left'}
          size={30}
          color={MD2Colors.white}
        />
      </TouchableRipple>
      {showHeader ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <AHText
            style={{alignSelf: 'center', color: MD2Colors.white}}
            variant={'headlineSmall'}
            name={name}
          />
        </View>
      ) : null}
    </View>
  );
};
export const HomeHeaderComponent = () => {
  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 5,
        }}>
        <TouchableRipple onPress={() => {}}>
          <Tooltip title={'Logo'} enterTouchDelay={1}>
            <Icon
              source={require('../assets/Images/appLogo.png')}
              size={28}
              //   color={MD2Colors.white}
            />
          </Tooltip>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <Tooltip title={'Title'} enterTouchDelay={1}>
            <TextView
              style={{
                color: MD2Colors.grey50,
                marginHorizontal: 8,
                padding: 1,
                alignSelf: 'center',
                fontSize: 16.5,
                fontWeight: 'bold',
              }}>
              AHTrade
            </TextView>
          </Tooltip>
        </TouchableRipple>
      </View>

      <View style={{marginHorizontal: 10}}>
        <Tooltip enterTouchDelay={5} title={'Country'}>
          <>{/*<CountryFlag isoCode={'in'} size={17} />*/}</>
        </Tooltip>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 54,
    flexDirection: 'row',
    backgroundColor: MD2Colors.transparent,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
