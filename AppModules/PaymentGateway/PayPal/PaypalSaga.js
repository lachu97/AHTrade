import {delay, takeLatest, put, all} from 'redux-saga/effects';
import {captureOrders} from './PayPalAPIs';
import {addPayPalData} from './PayPalReducer';

function* getPayPalDataSaga() {
  try {
    const response = yield captureOrders();
    yield put(addPayPalData(response));
  } catch (e) {}
}
export function* payPalRootSaga() {
  yield all([takeLatest('GET_PAYPAL_DATA', getPayPalDataSaga)]);
}
