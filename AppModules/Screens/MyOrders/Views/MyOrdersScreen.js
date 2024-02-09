import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import myOrdersStyles from '../styles/MyOrdersStyles';
import {HeaderComponent} from '../../../Components/HeaderComponent';

const MyOrdersScreen = () => {
  return (
    <View style={myOrdersStyles.container}>
      <HeaderComponent />
      <Text>MyOrders</Text>
    </View>
  );
};
export default React.memo(MyOrdersScreen);
