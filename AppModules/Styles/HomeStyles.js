import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {textTheme} from '../Themes/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    //  alignItems: 'center',
    //  justifyContent: 'center',
  },
  textStyle: {
    fontFamily: textTheme.bold.fontFamily,
    color: Colors.light,
    fontSize: 24,
    margin: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    width: 150,
    height: 33,
    alignSelf: 'center',
  },
  categoryListHeader: {
    marginTop: 20,
    marginVertical: 10,
  },
});
