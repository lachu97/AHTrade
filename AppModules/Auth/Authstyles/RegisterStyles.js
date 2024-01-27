import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MD2Colors} from "react-native-paper";
const width = Dimensions.get('window').width
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    // alignItems:'center',
    //  justifyContent:'center',
  },
  textStyles: {
    color: Colors.light,
    fontSize: 18,
    alignSelf: 'center',
    marginVertical: 10,
  },
  textInput: {
    backgroundColor: Colors.light,
    marginVertical: 10,
    fontSize: 19,
    width: width * 0.835,
    height: 54,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:10,
    paddingVertical:1
  },
  iAgree :{
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical:10
  },
  iAgreeText : {color: MD2Colors.white, textAlign: 'center', fontSize: 15},
  buttonStyles:{
    width: width*0.835,
    marginVertical:5
  }
});
