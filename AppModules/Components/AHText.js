import React from 'react';
import {StyleSheet} from "react-native";
import {MD2Colors, Text} from 'react-native-paper';
const AHText = props => <Text {...props}>{props.name}</Text>;
export const AHWhiteText = props => (
  <Text
    style={StyleSheet.compose(props?.style, {color: MD2Colors.white})}
    {...props}>
    {props.name}
  </Text>
);
export default React.memo(AHText);
