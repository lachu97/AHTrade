import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
const AppReactotron = Reactotron.configure({
  name: 'AHTrade App',
}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux()) // Redux Support
  .use(sagaPlugin()) // Saga Support
  .connect(); // let's connect!
export default AppReactotron;
