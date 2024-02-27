import {configureStore} from '@reduxjs/toolkit';
import homeReducer from './Reducers/HomeReducer';
import combineSaga from './AppSagas/Appsaga';
import createSagaMiddleware from 'redux-saga';
import reactotron from 'reactotron-react-native'; // <- From the Library
import AppReactotron from '../DevConfig/ReactotronConfig';
import categoryReducer from './Reducers/CategoryReducer';
import accountReducer from './Reducers/AccountReducer'; // <-- From My Dev File
const sagaMonitor = reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({sagaMonitor});

// Overall RootReducer
const rootReducer = {
  home: homeReducer,
  category: categoryReducer,
  account: accountReducer,
};
// App Store Declaration down here -->
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
  // devTools: true, // <- Comment while Taking Build
  // enhancers: [AppReactotron.createEnhancer()], // <- Comment while Taking Build
});
// Running And Configuring Saga
sagaMiddleware.run(combineSaga);
export default store;
