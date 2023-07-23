import {put, takeLatest, call, all} from 'redux-saga/effects';
import Realm from 'realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from '../../Storage/Realm/RealmConfig';
import {INITIALISE_LOGIN} from '../Actions/Constants';

async function isRealmInitialized() {
  try {
    const value = await AsyncStorage.getItem('RealmInitialized');
    return value !== null;
  } catch (error) {
    console.error('Error reading AsyncStorage:', error);
    return false;
  }
}
async function setRealmInitialized() {
  try {
    await AsyncStorage.setItem('RealmInitialized', 'true');
  } catch (error) {
    console.error('Error setting AsyncStorage:', error);
  }
}
function* handleInitializeRealm() {
  try {
    const isInitialized = yield call(isRealmInitialized);
    if (isInitialized) {
      // If already initialized, return without creating a new instance
      console.log('Realm is already initialized');
      return;
    }

    // Get or create the Realm instance
    const realm = yield call(Realm.open, {schema: [Auth]});

    // Write initial data to Realm
    yield call([realm, realm.write], () => {
      // Example: Writing initial data to the 'Dog' collection
      realm.create('Auth', {
        _id: 1,
        name: 'Atlashorizon Test Account',
        loggedIn: 'true',
      });
      // Add more initial data as needed
    });

    // Mark Realm as initialized in AsyncStorage
    yield call(setRealmInitialized);

    // Dispatch an action to update the Redux state with the initialized data (optional)
    // In this example, we're not using the Redux state update
    // since we're just initializing the data in Realm, but you can
    // use it if you need to update your app's state.
    // yield put({ type: 'INITIALIZE_REALM_SUCCESS', payload: {} });
  } catch (error) {
    // Handle any errors here
    console.error('Error initializing data in Realm:', error);
  }
}
// function* addLoginStateSaga(action) {
//   const {data} = action.payload;
//   try {
//     const realm = yield call(Realm.open, {schema: []});
//   } catch (e) {
//     console.error(`Error = ${e.message()}`);
//   }
// }
export function* realmRootSaga() {
  yield all([takeLatest(INITIALISE_LOGIN, handleInitializeRealm)]);
}
