import React from 'react';
import {MD2Colors, TextInput} from 'react-native-paper'; // Import your color definitions

const AHTextInput = props => {
  const {value, placeholder, onChangeText} = props;
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor={MD2Colors.black}
      onChangeText={onChangeText}
      mode={'outlined'}
      outlineColor={MD2Colors.black}
      autoCorrect
      textColor={MD2Colors.black}
      activeOutlineColor={MD2Colors.black}
      {...props}
    />
  );
};

export default React.memo(AHTextInput);
