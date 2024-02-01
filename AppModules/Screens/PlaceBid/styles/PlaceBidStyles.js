import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MD2Colors} from "react-native-paper";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignContent:'center',
  },
  boxContainer:{
    justifyContent:'center',
    flex:1,
    backgroundColor: MD2Colors.transparent
  }
});
