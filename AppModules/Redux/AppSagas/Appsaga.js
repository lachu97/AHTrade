import {delay, takeLatest, put, all} from 'redux-saga/effects';
import {addHome} from '../Reducers/HomeReducer';
import reactotron from 'reactotron-react-native';
import {authRootSaga} from './AuthSaga';
import {supaBaseClient} from '../../SupaBase/Client/supabaseClient';
import {addCategoryData} from '../Reducers/CategoryReducer';

function* addHomeSaga() {
  try {
    yield delay(500);

    yield put(addHome('Hey Iam from the saga'));
    reactotron.log('Iam inside saga and i ran');
  } catch (e) {
    reactotron.error(
      'Iam inside saga and i ran with a problem = \n' + e.message,
    );
  }
}
function* addSomething(action) {
  try {
    let data = action.payload;
    yield delay(100);

    yield put(addHome(data));
    reactotron.log('Iam inside saga and i ran');
  } catch (e) {
    reactotron.error(
      'Iam inside saga and i ran with a problem == \n' + e.message,
    );
  }
}
function* getCategoryData() {
  try {
    const {data, error} = yield supaBaseClient.from('category').select('*');
    if (data) {
      yield put(addCategoryData(data));
    }
  } catch (e) {}
}
function* rootSaga() {
  yield all([
    takeLatest('ADDHOME', addHomeSaga),
    takeLatest('SOMETHI', addSomething),
    takeLatest('GET_CATEGORY', getCategoryData),
  ]);
}
function* combineSaga() {
  yield all([rootSaga(), authRootSaga()]);
}
export default combineSaga;
