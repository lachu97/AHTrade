import React, {useCallback, useEffect, useState} from 'react';
import {View, LayoutAnimation, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../Styles/HomeStyles';
import {HomeHeaderComponent} from '../Components/HeaderComponent';
import CategoryList from '../Components/Lists/CategoryList';
import AHText from '../Components/AHText';
import ProductList from '../Components/Lists/ProductsLists';
import BottomBar from '../Components/BottomBar/BottomBar';
import {layoutAnimConfig} from '../Constants/AppConstants';
import messaging from '@react-native-firebase/messaging';
import {isIos} from '../HelperFuntions/helpers';
import {getUserDetails} from '../Storage/AppLocalStorage/UserStorageData';
import {getFCMTokenDetails} from '../Storage/AppLocalStorage/FCMTokenStorage';
import {getIsGuestUser} from '../Storage/LocalStorage';
import {addIsGuestUser} from '../Redux/Reducers/HomeReducer';
const act = () => ({type: 'ADDHOME'});
const width = Dimensions.get('window').width;
const getCategoryData = () => ({type: 'GET_CATEGORY'});
const getProductData = () => ({type: 'GET_PRODUCT'});
const postFCMTokenAction = data => ({
  type: 'POST_FCM_TOKEN',
  payload: {
    data: data,
  },
});
const postFCMTokenSlackAction = data => ({
  type: 'POST_FCM_TOKEN_SLACK',
  payload: data,
});
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [categoryLoading, setCategoryLoading] = useState(false);

  let catData = useSelector(state => state.category.categoryData);
  let prodData = useSelector(state => state.category.productData);
  useEffect(() => {
    getIsGuestUser()
      .then(r => {
        dispatch(addIsGuestUser(r));
      })
      .catch(er => console.error(er.message));
  }, [dispatch]);
  useEffect(() => {
    const getFCMToken = async id => {
      await messaging().registerDeviceForRemoteMessages();

      // Get the token
      const token = await messaging().getToken();
      let pastToken = getFCMTokenDetails();
      if (pastToken) {
        return;
      }
      let data = {
        token: token,
        user_id: id,
        os: isIos() ? 'ios' : 'android',
      };

      dispatch(postFCMTokenAction(data));
      if (__DEV__) {
        console.log('Posting to Slack');
        dispatch(postFCMTokenSlackAction(token));
      }
    };
    if (!isIos()) {
      getUserDetails().then(r => {
        if (r.user.id) {
          getFCMToken(r?.user?.id);
        }
      });
    }
  }, [dispatch]);
  useEffect(() => {
    const loadCategory = () => {
      try {
        setCategoryLoading(true);
        dispatch(getCategoryData());
        dispatch(getProductData());
      } catch (e) {
      } finally {
        LayoutAnimation.configureNext(layoutAnimConfig);
        setCategoryLoading(false);
      }
    };
    loadCategory();
  }, [dispatch]);
  const ListHeader = useCallback(() => {
    return (
      <View style={{marginVertical: 5, padding: 2}}>
        <AHText style={styles.textStyle} name={'Category'} />
        <CategoryList data={catData} />
        <AHText style={styles.textStyle} name={'Products'} />
      </View>
    );
  }, [catData]);
  return (
    <View style={styles.container}>
      <HomeHeaderComponent />

      <View style={{marginVertical: 1, padding: 1, flex: 1}}>
        <ProductList data={prodData} ListHeader={ListHeader} />
      </View>
      <View style={{flex: 0.04}}>
        <BottomBar navigation={navigation} activeTab={'Home'} />
      </View>
    </View>
  );
};
export default React.memo(HomeScreen);
