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
import {HapticFeedback} from '../../HelperFuntions/helpers';

export const BOTTOM_APPBAR_HEIGHT = 55;
const bottomItems = [
  {name: 'Home', icon: 'home', route: 'Home'},
  {name: 'Category', icon: 'dots-grid', route: 'CategoryList'},
  {
    name: 'My Orders',
    icon: 'gamma',
    route: 'MyOrders',
  },
  {name: 'More', icon: 'format-list-bulleted', route: 'Account'},
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
          hitSlop={{
            top: 5,
            left: 6,
            right: 6,
            bottom: 5,
          }}
          onPress={() => {
            HapticFeedback('impactMedium');

            if (itm.route === 'CategorySearch') {
              navigation.navigate(itm.route, {
                name: 'Rice',
              });
              return;
            }
            navigation.navigate(itm.route);
          }}
          style={{padding: 3}}>
          <View style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={itm.icon}
              size={itm.name === activeTab ? 25 : 21}
              color={
                itm.name === activeTab ? MD2Colors.pink50 : MD2Colors.grey50
              }
            />
            <Text
              style={{
                alignSelf: 'center',
                marginVertical: 3,
                color:
                  itm.name === activeTab ? MD2Colors.pink50 : MD2Colors.white,
                fontSize: itm.name === activeTab ? 13 : 10,
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
