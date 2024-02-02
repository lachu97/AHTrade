import React from 'react';
import {View} from 'react-native';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import {useRoute} from '@react-navigation/native';
import {MD2Colors, Text} from 'react-native-paper';
import {Colors} from "react-native/Libraries/NewAppScreen";

const Success = () => {
  const route = useRoute();

  return (
    <View style={{flex:1,backgroundColor:Colors.dark}}>
      <HeaderComponent />
      <Text style={{color: MD2Colors.white}}>
        {route.params.details.quantity}
      </Text>
      <Text style={{color: MD2Colors.white}}>
        {route.params.details.bidPrice}
      </Text>
    </View>
  );
};
export default React.memo(Success);
