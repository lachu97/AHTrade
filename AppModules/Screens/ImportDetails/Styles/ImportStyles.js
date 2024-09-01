import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MD2Colors} from 'react-native-paper';
import {textTheme} from '../../../Themes/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignContent: 'center',
  },
  titleStyles: {
    color: MD2Colors.white,
    fontFamily: textTheme.bold.fontFamily,
    fontWeight: '600',
  },
  editText: {
    color: MD2Colors.yellow400,
    textDecorationLine: 'underline',
    fontSize: 11,
    fontWeight: 'bold',
  },
  valueStyles: {
    color: MD2Colors.white,
    marginRight: 6,
    fontSize: 17,
    fontWeight: 'bold',
  },
});
