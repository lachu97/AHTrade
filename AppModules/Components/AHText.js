import React from 'react';
import {StyleSheet} from 'react-native';
import {MD2Colors, Text} from 'react-native-paper';
import {isIos} from '../HelperFuntions/helpers';
import {textTheme} from '../Themes/themes';
const AHText = props => (
  <Text
    style={[
      {
        fontFamily: textTheme.regular.fontFamily,
      },
      props.style,
    ]}
    {...props}>
    {props.name}
  </Text>
);
export const TextView = props => {
  return (
    <Text
      style={[
        {
          color: props.style?.color ? props.style?.color : MD2Colors.black,
          fontFamily: props.style?.fontFamily
            ? props.style?.fontFamily
            : textTheme.regular.fontFamily,
          fontWeight: props.style?.fontWeight ? props.style?.fontWeight : '500',
        },
        props?.style,
      ]}>
      {props?.children}
    </Text>
  );
};
// export default React.memo(TextView);
export default React.memo(AHText);
