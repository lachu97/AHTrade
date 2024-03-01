import {delay, takeLatest, all} from 'redux-saga/effects';
import {configureEmailData} from './emailFile';
function* sendEmailSaga(action) {
  try {
    const {data} = action.payload;
    yield delay(500);
    let response = yield configureEmailData(data);
    console.log('MY RESULt FoR EMAIL' + response);
  } catch (e) {}
}

export function* rootEmailSaga() {
  yield all([takeLatest('SEND_EMAIL', sendEmailSaga)]);
}
