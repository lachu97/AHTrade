import React from 'react';
import {
  Appbar,
  MD2Colors,
  Avatar,
  Text,
  TouchableRipple,
  Icon,
  Tooltip,
} from 'react-native-paper';
import {Pressable, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AHText from './AHText';

export const HeaderComponent = ({backAction, title, icon, onPress}) => {
  return (
    <Appbar.Header style={{height: 54}} mode={'small'}>
      <Appbar.BackAction onPress={backAction} />
      <Appbar.Content title={title} />
      <Appbar.Action icon={icon} onPress={onPress} />
    </Appbar.Header>
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
          <Tooltip title={'Logo'}>
            <Icon
              source={require('../assets/Images/appLogo.png')}
              size={28}
              //   color={MD2Colors.white}
            />
          </Tooltip>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <Tooltip title={'Title'}>
            <Text
              style={{
                color: MD2Colors.grey50,
                marginHorizontal: 8,
                padding: 1,
                alignSelf: 'center',
                fontSize: 16.5,
                fontWeight: 'bold',
              }}>
              Atlashorizon
            </Text>
          </Tooltip>
        </TouchableRipple>
      </View>

      <View style={{marginHorizontal: 10}}>
        <TouchableRipple
          onPress={() => {
            console.log('d');
          }}>
          <Avatar.Text label={'GT'} size={30} />
        </TouchableRipple>
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
