import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const width = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    color: Colors.dark,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:10,
    paddingVertical:15
  },
  textInput: {
    backgroundColor: Colors.light,
    marginVertical:10,
    fontSize: 19,
    width: width * 0.8,
    height: 54,
  },
});
