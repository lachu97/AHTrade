import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MD2Colors} from 'react-native-paper';
import {textTheme} from '../../Themes/themes';
const width = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    // alignItems:'center',
    //  justifyContent:'center',
  },
  textStyles: {
    color: Colors.light,
    fontSize: 27,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: textTheme.bold.fontFamily,
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
    marginVertical: 15,
    paddingVertical: 1,
  },
  iAgree: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  iAgreeText: {
    color: MD2Colors.white,
    textAlign: 'center',
    fontSize: 15,
    marginHorizontal: 2,
  },
  buttonStyles: {
    width: width * 0.835,
    marginVertical: 8,
    borderRadius: 8,
  },
});
