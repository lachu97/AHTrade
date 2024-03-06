import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {MD2Colors, Text} from 'react-native-paper';
import myOrdersStyles from '../styles/MyOrdersStyles';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import LottieView from 'lottie-react-native';
import AHText from '../../../Components/AHText';
import {getIsGuestUser} from '../../../Storage/LocalStorage';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails} from '../../../Storage/AppLocalStorage/UserStorageData';
import MyOrdersCard from '../MicroComponets/MyOrdersCard';
const getMyOrdersAction = id => ({
  type: 'GET_MY_ORDERS',
  payload: {
    user_id: id,
  },
});
const MyOrdersScreen = () => {
  const [isGuestUser, setGuestUser] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const myorders = useSelector(state => state.myOrder.myOrdersData);
  useEffect(() => {
    getIsGuestUser().then(r => setGuestUser(r));
    getUserDetails().then(r => {
      setUser(r.user);
      console.log('User Id = ' + JSON.stringify(r.user.id));
      setTimeout(() => {
        dispatch(getMyOrdersAction(r.user.id));
      }, 1500);
    });
  }, [dispatch]);
  return (
    <View style={myOrdersStyles.container}>
      <HeaderComponent />
      <View style={{flex: 1}}>
        {isGuestUser ? (
          <AHText
            name={'Your are Logged In as Guest User,Try Logging In'}
            style={{color: MD2Colors.white, alignSelf: 'center', fontSize: 22}}
          />
        ) : null}
        {myorders.length === 0 ? (
          <View>
            <AHText
              name={'Currently No Orders to Show'}
              style={{
                color: MD2Colors.white,
                alignSelf: 'center',
                fontSize: 22,
              }}
            />
            <AHText
              name={' Try Placing an Order !!'}
              style={{
                color: MD2Colors.white,
                alignSelf: 'center',
                fontSize: 22,
              }}
            />
            <LottieView
              style={{flex: 1}}
              source={require('../../../assets/anim/underConstruction.json')}
              autoPlay
              loop
            />
          </View>
        ) : (
          <View>
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <Text
                    style={{
                      color: MD2Colors.white,
                      padding: 5,
                      margin: 2,
                      fontSize: 15,
                    }}>
                    Your Past Orders
                  </Text>
                );
              }}
              initialNumToRender={10}
              data={myorders}
              renderItem={({item}) => <MyOrdersCard item={item} />}
            />
          </View>
        )}
      </View>
    </View>
  );
};
export default React.memo(MyOrdersScreen);
