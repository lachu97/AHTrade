import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import {storage} from '../Storage/AppLocalStorage/ProductsStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AppReactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'AHTrade App',
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux()) // Redux Support
  .use(sagaPlugin()) // Saga Support
  .use(mmkvPlugin({storage}))
  .connect(); // let's connect!
export default AppReactotron;
