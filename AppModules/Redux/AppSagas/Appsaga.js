import {delay, takeLatest, put, all} from 'redux-saga/effects';
import {addHome} from '../Reducers/HomeReducer';
import reactotron from 'reactotron-react-native';
import {authRootSaga} from './AuthSaga';
import {supaBaseClient} from '../../SupaBase/Client/supabaseClient';
import {addCategoryData, addProductData} from '../Reducers/CategoryReducer';
import {data} from '../../MockData/MockDatas';

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
    yield delay(4500);
    // const {data, error} =
    // yield supaBaseClient.from('category').select('*');
    const data = [
      {
        id: 5,
        name: 'Rice',
        image:
          'https://ik.imagekit.io/atlas17/category/rice.png?updatedAt=1707916499116',
      },
      {
        id: 4,
        name: 'Tea',
        image:
          'https://ik.imagekit.io/atlas17/category/green-tea.png?updatedAt=1707916339548',
      },
      {
        id: 3,
        name: 'Coffee',
        image:
          'https://ik.imagekit.io/atlas17/category/beans.png?updatedAt=1707916316753',
      },
    ];
    if (data) {
      yield put(addCategoryData(data));
    }
  } catch (e) {}
}

function* getProductData() {
  try {
    yield delay(4500);
    let prodData = data[1].productData;
    if (prodData) {
      yield put(addProductData(prodData));
    }
  } catch (e) {}
}
function* rootSaga() {
  yield all([
    takeLatest('ADDHOME', addHomeSaga),
    takeLatest('SOMETHI', addSomething),
    takeLatest('GET_CATEGORY', getCategoryData),
    takeLatest('GET_PRODUCT', getProductData),
  ]);
}
function* combineSaga() {
  yield all([rootSaga(), authRootSaga()]);
}
export default combineSaga;
