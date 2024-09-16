import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, useWindowDimensions, View} from 'react-native';
import {Button, MD2Colors, Text, TextInput} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import AHButton from '../../../Components/AHButton';
import {useNavigation} from '@react-navigation/native';
import {
  showBottomFeedBack,
  showToastError,
} from '../../../Components/Toasts/ToastsFeedBack';
import {getIsGuestUser} from '../../../Storage/LocalStorage';
import {getUserDetails} from '../../../Storage/AppLocalStorage/UserStorageData';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {HapticFeedback} from '../../../HelperFuntions/helpers';
import {TextView} from '../../../Components/AHText';
import AHTextInput from '../../../Components/AHTextInput';
import {textTheme} from '../../../Themes/themes';
const RecommendationScreen = () => {
  const [product, setProduct] = useState('');
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [isGuestUser, setIsGuestUser] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const status = useSelector(state => state.category.status);
  useEffect(() => {
    getIsGuestUser().then(r => {
      setIsGuestUser(r);
    });
    getUserDetails().then(r => {
      console.log(JSON.stringify(r.user));
      setUser(r.user);
    });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark}}>
      <HeaderComponent name={'Recommend Product'} showHeader={false} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginVertical: 15,
          marginHorizontal: 10,
        }}>
        {status?.status === 201 ? (
          <>
            <FastImage
              style={{
                width: width * 0.9,
                height: height / 2.2,
                margin: 1,
              }}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../../assets/Images/checked.png')}
            />
            <TextView
              style={{color: MD2Colors.white, padding: 5, alignSelf: 'center'}}>
              Product Recommendation for {product} is Successful,We will Review
              it and add it to marketplace
            </TextView>
            <Button
              style={{
                width: width * 0.71,
                borderRadius: 8,
                borderColor: MD2Colors.teal100,
                borderWidth: 1,
                alignSelf: 'center',
                marginVertical: 5,
              }}
              labelStyle={{
                fontFamily: textTheme.bold.fontFamily,
              }}
              onPress={() => {
                HapticFeedback();
                navigation.goBack();
              }}>
              Go Back
            </Button>
          </>
        ) : (
          <>
            <KeyboardAvoidingView behavior={'padding'}>
              <TextView
                style={{
                  color: MD2Colors.white,
                  fontSize: 18,
                  alignSelf: 'center',
                }}>
                Product Recommendation
              </TextView>
              <AHTextInput
                value={product}
                placeholder={'Product Name'}
                onChangeText={e => setProduct(e)}
                style={{
                  width: width * 0.8,
                  backgroundColor: Colors.light,
                  marginVertical: 15,
                  fontSize: 19,
                }}
                textColor={MD2Colors.black}
                activeOutlineColor={MD2Colors.black}
                mode={'outlined'}
                outlineColor={MD2Colors.black}
                placeholderTextColor={MD2Colors.black}
              />
            </KeyboardAvoidingView>
            <Button
              style={{
                width: width * 0.71,
                borderRadius: 8,
                borderColor: MD2Colors.teal100,
                borderWidth: 1,
                alignSelf: 'center',
                marginVertical: 5,
              }}
              textColor={MD2Colors.tealA100}
              labelStyle={{
                fontFamily: textTheme.bold.fontFamily,
              }}
              icon={'book-edit'}
              loading={loading}
              onPress={() => {
                HapticFeedback();

                setLoading(true);
                if (product === '') {
                  showToastError('Product Name Is Empty');
                  setLoading(false);
                  return;
                }
                dispatch({
                  type: 'POST_RECOMMEND',
                  payload: {
                    name: product,
                    user_id: user?.id,
                  },
                });
                if (status?.status === 201) {
                  setLoading(false);
                  setSuccess(true);
                }
                //  navigation.goBack();
              }}>
              Suggest This Product
            </Button>
          </>
        )}
      </View>
    </View>
  );
};
export default React.memo(RecommendationScreen);
