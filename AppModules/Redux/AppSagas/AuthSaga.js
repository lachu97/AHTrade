import {put, all, call, takeLatest} from 'redux-saga/effects';
import {getLoggedIn, storeIsLoggedIn} from '../../Storage/LocalStorage';
import {addLogIn} from '../Reducers/HomeReducer';
import reactotron from 'reactotron-react-native';

function* getLogInValueSaga() {
  try {
    const value = yield call(getLoggedIn);
    reactotron.log('Value from Async == \n' + value);
    yield put(addLogIn(value));
  } catch (e) {}
}
function* setLogInValueSaga(action) {
  try {
    let value = action.payload;
    yield call(storeIsLoggedIn, value);
  } catch (e) {}
}

export function* authRootSaga() {
  yield all([
    takeLatest('ADD_LOGIN', setLogInValueSaga),
    takeLatest('GET_LOGIN', getLogInValueSaga),
  ]);
}
