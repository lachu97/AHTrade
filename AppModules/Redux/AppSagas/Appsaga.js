import {delay, takeLatest, put, all} from 'redux-saga/effects';
import {addHome} from '../Reducers/HomeReducer';
import reactotron from 'reactotron-react-native';
import {authRootSaga} from './AuthSaga';
import {supaBaseClient} from '../../SupaBase/Client/supabaseClient';
import {
  addCategoryData,
  addFilterProductData,
  addProductData,
} from '../Reducers/CategoryReducer';
import {data} from '../../MockData/MockDatas';
import {showBottomFeedBack} from '../../Components/Toasts/ToastsFeedBack';
import {
  flushCache,
  getCategorysDetails,
  getProductsDetails,
  storeProductsDetails,
} from '../../Storage/AppLocalStorage/ProductsStorage';

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
    yield delay(500);
    let cacheResult = getCategorysDetails();
    if (cacheResult) {
      console.log('iam inside');
      yield put(addCategoryData(JSON.parse(cacheResult)));
      return;
    }
    const {data: category, error} = yield supaBaseClient
      .from('category')
      .select('*');
    if (error) {
      showBottomFeedBack(`error in fetching ${error.message}`);
    }
    // const data = [
    //   {
    //     id: 1,
    //     name: 'Rice',
    //     image:
    //       'https://ik.imagekit.io/atlas17/category/rice.png?updatedAt=1707916499116',
    //   },
    //   {
    //     id: 2,
    //     name: 'Tea',
    //     image:
    //       'https://ik.imagekit.io/atlas17/category/green-tea.png?updatedAt=1707916339548',
    //   },
    //   {
    //     id: 3,
    //     name: 'Coffee',
    //     image:
    //       'https://ik.imagekit.io/atlas17/category/beans.png?updatedAt=1707916316753',
    //   },
    // ];
    if (category) {
      yield put(addCategoryData(category));
    }
  } catch (e) {}
}

function* getProductData() {
  try {
    yield delay(500);
    // let prodData = data[1].productData;
    let cacheResult = getProductsDetails();
    if (cacheResult) {
      console.log('iam inside');
      yield put(addProductData(JSON.parse(cacheResult)));
      return;
    }

    let {data: products, error} = yield supaBaseClient
      .from('products')
      .select('*')
      .range(0, 10);
    if (error) {
      showBottomFeedBack(`error in fetching ${error.message}`);
    }
    // if (data) {
    //   yield put(addProductData(data));
    // }
    console.log('Data ==>' + JSON.stringify(data));
    console.log('Products ==>' + JSON.stringify(products));
    if (products) {
      yield storeProductsDetails(products);
      yield put(addProductData(products));
    }
  } catch (e) {}
}
function* filterProductsByID(action) {
  try {
    yield delay(10);
    const {id} = action.payload;
    let productResult = data[1].productData.filter(
      itm => itm.categoryId === id,
    );
    if (productResult) {
      yield put(addFilterProductData(productResult));
    }
  } catch (e) {}
}
function* rootSaga() {
  yield all([
    takeLatest('ADDHOME', addHomeSaga),
    takeLatest('SOMETHI', addSomething),
    takeLatest('GET_CATEGORY', getCategoryData),
    takeLatest('GET_PRODUCT', getProductData),
    takeLatest('GET_PRODUCT_BY_ID', filterProductsByID),
  ]);
}
function* combineSaga() {
  yield all([rootSaga(), authRootSaga()]);
}
export default combineSaga;
