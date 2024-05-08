import {takeLatest, put, all} from 'redux-saga/effects';
import axios from 'axios';
import reactotron from 'reactotron-react-native';
import {addNowPaymentData} from './NowpaymentReducer';
const isLive = true;
const captureInvoice = orderDetails => {
  let sandboxURL = 'https://api-sandbox.nowpayments.io/v1/invoice';
  let url = isLive ? 'https://api.nowpayments.io/v1/invoice' : sandboxURL;

  const SANDBOX_API_KEY = 'H80QCBX-45YMGZ8-NPS1Q30-ZHXBG9W';
  const API_KEY = isLive ? '43TWKX9-TANM4QT-HZ9TJTE-VC3X8YP' : SANDBOX_API_KEY;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${API_KEY}`,
    },
  };
  const data = {
    price_amount: 10,
    price_currency: 'usd',
    order_id: orderDetails?.productID,
    order_description: orderDetails?.product_name,
    ipn_callback_url: 'https://nowpayments.io',
    success_url: 'https://atlashorizon.in/success/',
    cancel_url: 'https://atlashorizon.in/cancel/',
  };
  return axios
    .post(url, JSON.stringify(data), config)
    .then(response => {
      reactotron.log(response.data);
      return response.data;
    })
    .catch(err => reactotron.log(err.message));
};
function* getNowpaymentsSaga(action) {
  try {
    const {data} = action.payload;
    reactotron.log('Inside the Saga ====>>>>' + data);
    const response = yield captureInvoice(data);
    yield put(addNowPaymentData(response));
  } catch (e) {}
}
export function* nowPaymentsSaga() {
  yield all([takeLatest('GET_NOWPAYMENTS_DATA', getNowpaymentsSaga)]);
}
