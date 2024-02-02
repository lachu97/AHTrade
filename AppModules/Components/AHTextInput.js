import React from 'react';
import {StyleSheet} from "react-native";
import {MD2Colors, TextInput} from 'react-native-paper';
import {Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen'; // Import your color definitions
const width = Dimensions.get('window').width;

const AHTextInput = props => {
  const {value, placeholder, onChangeText} = props;
  const inputStyles = {
    backgroundColor: Colors.light,
    marginVertical: 10,
    fontSize: 19,
    width: width * 0.77,
    height: 54,
  };
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor={MD2Colors.black}
      onChangeText={onChangeText}
      mode={'outlined'}
      outlineColor={MD2Colors.black}
      autoCorrect
      style={StyleSheet.compose(props.style, inputStyles)}
      textColor={MD2Colors.black}
      activeOutlineColor={MD2Colors.black}
      {...props}
    />
  );
};
export default React.memo(AHTextInput);
