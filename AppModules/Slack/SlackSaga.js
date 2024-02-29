import {delay, takeLatest, all} from 'redux-saga/effects';
import {sendMessageToSlack} from './SlackMessage';
function* sendOrderMessageToSlackSaga(action) {
  try {
    yield sendMessageToSlack(action.payload.data);
  } catch (e) {}
}

export function* slackRootSaga() {
  yield all([
    takeLatest('SEND_ORDER_MESSAGE_TO_SLACK', sendOrderMessageToSlackSaga),
  ]);
}
