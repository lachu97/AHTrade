import {delay, takeLatest, put, all} from 'redux-saga/effects';
import {supaBaseClient} from '../../../SupaBase/Client/supabaseClient';
function* postOrderToDBSaga(action) {
  try {
    const orderData = action.payload.data;
    yield delay(400);

    const {data, error} = yield supaBaseClient
      .from('order_test')
      .insert([orderData]);
    if (error) {
      console.error(`Error in Posting ${error.message}`);
      return;
    }
    if (data) {
      console.log('Success' + JSON.stringify(data));
    }
  } catch (e) {}
}

export function* checkoutSaga() {
  yield all([takeLatest('POST_ORDER_SAGA', postOrderToDBSaga)]);
}
