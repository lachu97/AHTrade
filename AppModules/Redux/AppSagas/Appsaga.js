import {delay, takeLatest, put, all} from 'redux-saga/effects';
import {addHome} from '../Reducers/HomeReducer';
import reactotron from 'reactotron-react-native';
import {authRootSaga} from './AuthSaga';
import {supaBaseClient} from '../../SupaBase/Client/supabaseClient';
import {
  addCategoryData,
  addFilterProductData,
  addPriceDetailsData,
  addProductData,
  addStatus,
} from '../Reducers/CategoryReducer';
import {
  showBottomFeedBack,
  showToastError,
} from '../../Components/Toasts/ToastsFeedBack';
import {
  getCategoryDetails,
  getPriceDetails,
  getProductsDetails,
  storeCategoryDetails,
  storePriceDetails,
  storeProductsDetails,
} from '../../Storage/AppLocalStorage/ProductsStorage';
import {rootEmailSaga} from '../../Email/EmailSaga';
import {slackRootSaga} from '../../Slack/SlackSaga';
import {checkoutSaga} from '../../Screens/Checkout/Saga/CheckoutSaga';
import {payPalRootSaga} from '../../PaymentGateway/PayPal/PaypalSaga';
import {addMyOrdersData} from '../../Screens/MyOrders/MyOrderReducer/MyOrderReducer';
import {
  getFCMTokenDetails,
  setFCMTokenDetails,
} from '../../Storage/AppLocalStorage/FCMTokenStorage';
import axios from 'axios';
import {Platform} from 'react-native';
import {nowPaymentsSaga} from '../../PaymentGateway/CryptoPayment/NowPaymentsPG/NowpaymentsSaga';

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
  } catch (e) {}
}
function* getCategoryDataSaga() {
  try {
    yield delay(500);
    let cacheResult = getCategoryDetails();
    if (cacheResult) {
      console.log('iam inside category Data');
      yield put(addCategoryData(JSON.parse(cacheResult)));
      return;
    }
    const {data: category, error} = yield supaBaseClient
      .from('category')
      .select('*');
    if (error) {
      showToastError(`error in fetching ${error.message}`);
      return;
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
      yield storeCategoryDetails(category);
      yield put(addCategoryData(category));
    }
  } catch (e) {}
}

function* getProductDataSaga() {
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
      showToastError(`error in fetching ${error.message}`);
      return;
    }
    if (products) {
      yield storeProductsDetails(products);
      yield put(addProductData(products));
    }
  } catch (e) {}
}
function* filterProductsByIDSaga(action) {
  try {
    yield delay(10);
    const {id} = action.payload;
    let cacheResult = getProductsDetails();
    if (cacheResult) {
      let productResult = JSON.parse(cacheResult).filter(
        itm => itm?.catID === id,
      );
      if (productResult.length > 0) {
        yield put(addFilterProductData(productResult));
      } else {
        yield put(addFilterProductData([]));
      }
    }
  } catch (e) {}
}

function* getPriceDetailsSage() {
  try {
    let cacheResult = getPriceDetails();
    if (cacheResult) {
      console.log('iam inside');
      yield put(addPriceDetailsData(JSON.parse(cacheResult)));
      return;
    }
    let {data: priceDetails, error} = yield supaBaseClient
      .from('priceDetails')
      .select('*');
    if (error) {
      showToastError(`error in fetching ${error.message}`);
      return;
    }
    if (priceDetails) {
      yield storePriceDetails(priceDetails);
      yield put(addPriceDetailsData(priceDetails));
    }
  } catch (e) {}
}
function* postRecommendProductSaga(action) {
  try {
    const {name, user_id} = action.payload;
    const {data: status, error} = yield supaBaseClient
      .from('recommedation')
      .insert([{name: name, quantity: 1, user_id: user_id}]);
    if (error) {
      console.error(error.message());
      return;
    }
    yield put(addStatus({status: 201, message: 'Successfully Added Row'}));
  } catch (e) {}
}
function* getMyOrdersSaga(action) {
  try {
    const user_id = action.payload.user_id;
    yield delay(240);

    let {data: order_test, error} = yield supaBaseClient
      .from('order_test')
      .select('*')
      .eq('user_id', user_id);
    if (error) {
      console.error(`Error ${error.message}`);
      return;
    }
    if (order_test) {
      yield put(addMyOrdersData(order_test));
    }
  } catch (e) {}
}
function* postFCMTokenSaga(action) {
  try {
    const {token, user_id, os} = action.payload.data;
    let alreadyInserted = yield getFCMTokenDetails();
    console.log('FCm Datas=' + alreadyInserted);

    if (alreadyInserted) {
      return;
    }
    let insertData = {
      token: token,
      user_id: user_id,
      os: os,
    };
    const {error} = yield supaBaseClient
      .from('firebase_token')
      .insert([insertData]);
    if (!error) {
      console.log('inserted succesffully');
      setFCMTokenDetails(true);
    }
  } catch (e) {}
}
function* postFCMtoSlack(action) {
  try {
    const token = action.payload;
    let postData = {
      text: `FCM Token 
 ${token} \n OS = ${Platform.OS === 'ios' ? 'iOS' : 'Android'} `,
    };
    axios.post(
      'https://hooks.slack.com/services/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',
      postData,
      {
        headers: {},
      },
    );
  } catch (e) {}
}
function* rootSaga() {
  yield all([
    takeLatest('ADDHOME', addHomeSaga),
    takeLatest('SOMETHI', addSomething),
    takeLatest('GET_CATEGORY', getCategoryDataSaga),
    takeLatest('GET_PRODUCT', getProductDataSaga),
    takeLatest('GET_PRODUCT_BY_ID', filterProductsByIDSaga),
    takeLatest('GET_PRICE_DETAILS', getPriceDetailsSage),
    takeLatest('POST_RECOMMEND', postRecommendProductSaga),
    takeLatest('GET_MY_ORDERS', getMyOrdersSaga),
    takeLatest('POST_FCM_TOKEN', postFCMTokenSaga),
    takeLatest('POST_FCM_TOKEN_SLACK', postFCMtoSlack),
  ]);
}
function* combineSaga() {
  yield all([
    rootSaga(),
    authRootSaga(),
    rootEmailSaga(),
    slackRootSaga(),
    checkoutSaga(),
    payPalRootSaga(),
    nowPaymentsSaga(),
  ]);
}
export default combineSaga;
