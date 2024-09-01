import React, {useEffect, useState} from 'react';
import {FlatList, LayoutAnimation, View} from 'react-native';
import {MD2Colors, Text} from 'react-native-paper';
import myOrdersStyles from '../styles/MyOrdersStyles';
import {HeaderComponent} from '../../../Components/HeaderComponent';
import LottieView from 'lottie-react-native';
import AHText, {TextView} from '../../../Components/AHText';
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const myorders = useSelector(state => state.myOrder.myOrdersData);
  useEffect(() => {
    const initialise = async () => {
      try {
        getIsGuestUser().then(r => setGuestUser(r));
        getUserDetails().then(r => {
          setUser(r.user);
          dispatch(getMyOrdersAction(r.user.id));
        });
      } catch (e) {
      } finally {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setLoading(false);
      }
    };
    initialise();
  }, [dispatch]);
  return (
    <View style={myOrdersStyles.container}>
      <HeaderComponent />
      <View style={{flex: 1}}>
        {loading ? (
          <>
            <LottieView
              source={require('../../../assets/anim/myLoading8.json')}
              autoPlay
              loop
              style={{height: 54, width: 80, alignSelf: 'center'}}
            />
            <Text style={{color: MD2Colors.tealA100, textAlign: 'center'}}>
              Loading MyOrders...
            </Text>
          </>
        ) : (
          <View>
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <TextView
                    style={{
                      color: MD2Colors.white,
                      padding: 5,
                      margin: 2,
                      fontSize: 15,
                    }}>
                    Your Past Orders
                  </TextView>
                );
              }}
              initialNumToRender={10}
              ListEmptyComponent={() => {
                return (
                  <View>
                    <AHText
                      name={'Currently No Orders to Show'}
                      style={{
                        color: MD2Colors.white,
                        alignSelf: 'center',
                        fontSize: 22,
                      }}
                    />
                    <TextView
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
                );
              }}
              data={myorders}
              renderItem={({item}) => <MyOrdersCard item={item} />}
            />
          </View>
        )}
        {isGuestUser ? (
          <AHText
            name={'Your are Logged In as Guest User,Try Logging In'}
            style={{color: MD2Colors.white, alignSelf: 'center', fontSize: 22}}
          />
        ) : null}
      </View>
    </View>
  );
};
export default React.memo(MyOrdersScreen);
