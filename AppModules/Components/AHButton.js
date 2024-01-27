import * as React from 'react';
import {Button, MD2Colors} from 'react-native-paper';

const AHButton = props => {
  const {icon, mode, onPress, name} = props;
  return (
    <Button
      icon={icon}
      mode={mode}
      onPress={onPress}
      textColor={MD2Colors.black}
      buttonColor={MD2Colors.purple100}
      {...props}>
      {name}
    </Button>
  );
};

export default React.memo(AHButton);
