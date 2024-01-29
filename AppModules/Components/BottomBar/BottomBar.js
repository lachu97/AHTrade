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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;
const bottomItems = [
  {name: 'Home', icon: 'home', route: 'Home'},
  {name: 'Cart', icon: 'cart', route: 'Home'},
  {name: 'Account', icon: 'account', route: 'Home'},
  {
    name: 'Live-Chat',
    icon: 'chat',
    route: 'Chat',
  },
];
const BottomBar = ({navigation}) => {


  return (
    <Surface
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT,
          backgroundColor: MD2Colors.transparent,
        },
      ]}>
      {bottomItems.map((itm, idx) => (
        <TouchableRipple onPress={() => navigation.navigate(itm.route)} style={{padding:10}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons name={itm.icon} size={25} color={MD2Colors.grey50} />
            <Text
              style={{
                alignSelf: 'center',
                marginVertical: 5,
                color: MD2Colors.white,
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
