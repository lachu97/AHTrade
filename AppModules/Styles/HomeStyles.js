import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'sans-serif',
    color: Colors.light,
  },
  buttonContainer: {
    width: 150,
    height: 33,
    alignSelf:'center'
  },
});
