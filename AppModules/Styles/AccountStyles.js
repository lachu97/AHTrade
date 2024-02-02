import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MD2Colors} from 'react-native-paper';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  listItemStyles: {
    marginHorizontal: 13,
  },
  listIconStyles: {
    color: MD2Colors.white,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    color: MD2Colors.white,
    fontWeight: 'bold',
    fontSize: 12.7,
    paddingHorizontal: 5,
    fontFamily: 'sans-serif',
  },
});
