import React from 'react';
import {useColorScheme} from 'react-native';
import {MD2Colors, Text} from 'react-native-paper';
import {isIos} from '../HelperFuntions/helpers';
import {textTheme} from '../Themes/themes';
const AHText = props => {
  const darkTheme = useColorScheme() === 'dark';
  return (
    <Text
      style={[
        {
          fontFamily: textTheme.regular.fontFamily,
          color: isIos()
            ? MD2Colors.black
            : darkTheme
            ? MD2Colors.white
            : MD2Colors.grey900,
        },
        props.style,
      ]}
      {...props}>
      {props.name}
    </Text>
  );
};
export const TextView = props => {
  const darkTheme = useColorScheme() === 'dark';
  return (
    <Text
      style={[
        {
          color: props.style?.color
            ? props.style?.color
            : isIos()
            ? MD2Colors.black
            : darkTheme
            ? MD2Colors.white
            : MD2Colors.grey900,
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
