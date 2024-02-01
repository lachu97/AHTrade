import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Appbar,
  FAB,
  Icon,
  MD2Colors,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRef, useState} from 'react';

const BOTTOM_APPBAR_HEIGHT = 70;
const bottomItems = [
  {name: 'Home', icon: 'home', route: 'Home'},
  {name: 'Category', icon: 'menu', route: 'CategorySearch'},
  {
    name: 'My Bids',
    icon: 'gamma',
    route: 'Chat',
  },
  {name: 'Account', icon: 'account', route: 'Account'},

];
const BottomBar = ({navigation, activeTab}) => {
  return (
    <Surface
      elevation={6}
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT,
        },
      ]}>
      {bottomItems.map((itm, idx) => (
        <TouchableRipple
          key={idx}
          onPress={() => {
            if (itm.route === 'CategorySearch') {
              navigation.navigate(itm.route, {
                name: 'Spices',
              });
              return;
            }
            navigation.navigate(itm.route);
          }}
          style={{padding: 10}}>
          <View style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={itm.icon}
              size={itm.name === activeTab ? 28 : 25}
              color={
                itm.name === activeTab ? MD2Colors.pink50 : MD2Colors.grey50
              }
            />
            <Text
              style={{
                alignSelf: 'center',
                marginVertical: 5,
                color:
                  itm.name === activeTab ? MD2Colors.pink50 : MD2Colors.white,
                fontSize: itm.name === activeTab ? 15 : 12,
              }}>
              {itm.name}
            </Text>
          </View>
        </TouchableRipple>
      ))}
    </Surface>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: Colors.dark,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default React.memo(BottomBar);
