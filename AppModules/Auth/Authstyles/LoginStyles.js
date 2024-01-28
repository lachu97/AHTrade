import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MD2Colors} from "react-native-paper";
const width = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    color: Colors.light,
    fontSize: 27,
    fontWeight: 'bold',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 15,
  },
  textInput: {
    backgroundColor: Colors.light,
    marginVertical: 10,
    fontSize: 19,
    width: width * 0.8,
    height: 54,
  },
  guestTextStyles:{
    marginVertical: 15,
    backgroundColor: MD2Colors.teal500,
    padding: 10,
    borderRadius: 10,
  }
});
