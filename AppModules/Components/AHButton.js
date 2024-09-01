import * as React from 'react';
import {Button, MD2Colors} from 'react-native-paper';
import {textTheme} from '../Themes/themes';

const AHButton = props => {
  const {onPress, name} = props;
  return (
    <Button
      onPress={onPress}
      textColor={MD2Colors.black}
      labelStyle={{
        fontFamily: textTheme.regular.fontFamily,
      }}
      buttonColor={MD2Colors.purple100}
      {...props}>
      {name}
    </Button>
  );
};

export default React.memo(AHButton);
