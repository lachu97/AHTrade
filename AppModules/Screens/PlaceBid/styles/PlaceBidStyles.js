import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MD2Colors} from 'react-native-paper';
const width = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignContent: 'center',
  },
  boxContainer: {
    justifyContent: 'center',
    //flex: 1,
    backgroundColor: MD2Colors.transparent,
    width: width,
    alignContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  headline: {
    marginVertical: 30,
    padding: 10,
    color: MD2Colors.white,
    fontSize: 36,
    //backgroundColor:MD2Colors.white,
    flex: 1,
    textAlign: 'center',
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:50
  },
});
