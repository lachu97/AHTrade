import React, {useEffect, useState} from 'react';
import {FlatList, Linking, View} from 'react-native';
import {HeaderComponent} from '../Components/HeaderComponent';
import accountStyles from '../Styles/AccountStyles';
import BottomBar from '../Components/BottomBar/BottomBar';
import {useNavigation} from '@react-navigation/native';
import {List, MD2Colors, Text, Tooltip} from 'react-native-paper';
import CountryFlag from 'react-native-country-flag';
import {
  getIsGuestUser,
  setIsGuestUser,
  storeIsLoggedIn,
} from '../Storage/LocalStorage';
import {supaBaseClient} from '../SupaBase/Client/supabaseClient';
import {
  CONTACT_US,
  PRIVACY_POLICY_LINK,
  REFUND_RETURNS_POLICY_LINK,
  SHIPPING_POLICY,
  TERMS_AND_CONDITION,
} from '../Constants/AppConstants';
import {
  showBottomFeedBack,
  showMiddleFeedBack,
  showToastError,
  showToastInfo,
  showToastSuccess,
} from '../Components/Toasts/ToastsFeedBack';
import {useDispatch} from 'react-redux';
import DeleteDialog from './Misc/Views/DeleteDialog';
import {
  flushEverythingOnLogOut,
  flushUserOnLogOut,
} from '../Storage/AppLocalStorage/UserStorageData';
import {HapticFeedback} from '../HelperFuntions/helpers';
import {textTheme} from '../Themes/themes';
const profileSection = [
  {title: 'My Profile', icon: 'account', route: 'Account'},
  {title: 'My Orders', icon: 'gamma', route: 'MyOrders'},
  // {title: 'Log out', icon: 'export', route: 'logout'},
];
const settingsSection = [
  {title: 'Terms & Condition', icon: 'star-settings', route: 'Terms'},
  {title: 'Privacy Policy', icon: 'powershell', route: 'Privacy'},
  {title: 'Shipping Policy', icon: 'ship-wheel', route: 'Shipping'},
  {title: 'Returns & Refund Policy', icon: 'cash-refund', route: 'returns'},
  {title: 'Contact US', icon: 'phone', route: 'contact'},
  {title: 'App Version', icon: 'target', route: 'Version'},
  {title: 'Delete My Account', icon: 'delete', route: 'Delete'},
];
const ProfileListSection = ({navigation}) => {
  return (
    <List.Section style={{marginHorizontal: 10}}>
      <List.Subheader style={{color: MD2Colors.white}}>
        My Account
      </List.Subheader>
      <FlatList
        data={profileSection}
        renderItem={({item}) => {
          return (
            <List.Item
              style={accountStyles.listItemStyles}
              left={() => (
                <List.Icon color={MD2Colors.white} icon={item.icon} />
              )}
              titleStyle={accountStyles.listIconStyles}
              title={item.title}
              onPress={async () => {
                HapticFeedback();
                if (item.route === 'Account') {
                  navigation.navigate('Profile');
                  return;
                }
                if (item.route === 'MyOrders') {
                  navigation.navigate('MyOrders');
                }

                // if (item.route === 'logout') {
                //   const {error} = await supaBaseClient.auth.signOut();
                //   if (error) {
                //     showBottomFeedBack(`Error in Signout ${error.message}`);
                //     return;
                //   }
                //   await storeIsLoggedIn(false);
                //   await setIsGuestUser(true);
                //   flushUserOnLogOut();
                //   flushEverythingOnLogOut();
                //   setTimeout(() => {
                //     navigation.reset({
                //       index: 0,
                //       routes: [{name: 'AuthStack'}],
                //     });
                //     showMiddleFeedBack('Logged Out SuccessFully');
                //   }, 899);
                // }
              }}
            />
          );
        }}
      />
    </List.Section>
  );
};
const SettingListSection = ({onPressDelete, navigation}) => {
  return (
    <List.Section style={{marginHorizontal: 10}}>
      <List.Subheader
        style={{color: MD2Colors.white, fontFamily: textTheme.bold.fontFamily}}>
        Settings
      </List.Subheader>
      <FlatList
        data={settingsSection}
        renderItem={({item}) => {
          return (
            <List.Item
              style={accountStyles.listItemStyles}
              left={() => (
                <List.Icon color={MD2Colors.white} icon={item.icon} />
              )}
              titleStyle={accountStyles.listIconStyles}
              title={item.title}
              onPress={async () => {
                HapticFeedback();
                if (item.route === 'Privacy') {
                  navigation.navigate('WebView', {
                    url: PRIVACY_POLICY_LINK,
                    title: 'Privacy Policy',
                  });
                  return;
                }
                if (item.route === 'Terms') {
                  navigation.navigate('WebView', {
                    url: TERMS_AND_CONDITION,
                    title: 'Terms & Condition',
                  });
                  return;
                }
                if (item.route === 'contact') {
                  navigation.navigate('WebView', {
                    url: CONTACT_US,
                    title: 'Contact Us',
                  });
                  return;
                }
                if (item.route === 'Shipping') {
                  navigation.navigate('WebView', {
                    url: SHIPPING_POLICY,
                    title: 'Shipping Policy',
                  });
                  return;
                }
                if (item.route === 'returns') {
                  navigation.navigate('WebView', {
                    url: REFUND_RETURNS_POLICY_LINK,
                    title: 'Returns & Refund Policy',
                  });
                  return;
                }
                if (item.route === 'Version') {
                  showToastSuccess('App Version is 1.0.1');
                  return;
                }
                if (item.route === 'Delete') {
                  onPressDelete();
                }
              }}
            />
          );
        }}
      />
    </List.Section>
  );
};
const AccountScreen = () => {
  const navigation = useNavigation();
  const [showDelete, setDelete] = useState(false);
  const [isGuestUser, setGuestUser] = useState(true);
  useEffect(() => {
    getIsGuestUser().then(r => setGuestUser(r));
  }, []);

  return (
    <View style={accountStyles.container}>
      <HeaderComponent />
      <ProfileListSection navigation={navigation} />
      <List.Item
        title={isGuestUser ? 'Login' : 'Logout'}
        style={{marginHorizontal: 25}}
        titleStyle={accountStyles.listIconStyles}
        left={() => <List.Icon color={MD2Colors.white} icon={'logout'} />}
        onPress={async () => {
          if (isGuestUser) {
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'AuthStack'}],
              });
              showToastInfo('Moving to Login Page');
            }, 899);
          } else {
            const {error} = await supaBaseClient.auth.signOut();
            if (error) {
              showToastError(`Error in Signout ${error.message}`);
              return;
            }
            await storeIsLoggedIn(false);
            await setIsGuestUser(true);
            flushUserOnLogOut();
            await flushEverythingOnLogOut();
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'AuthStack'}],
              });
              showToastSuccess('Logged Out SuccessFully');
            }, 899);
          }
        }}
      />
      <SettingListSection
        onPressDelete={() => setDelete(true)}
        navigation={navigation}
      />
      <View style={accountStyles.bottomContainer}>
        <Tooltip title={'Made In India Logo'} enterTouchDelay={0}>
          <Text style={accountStyles.text}>Made in India</Text>
        </Tooltip>
        <CountryFlag isoCode={'in'} size={14} />
      </View>
      <DeleteDialog isVisible={showDelete} onDismiss={() => setDelete(false)} />
      <BottomBar navigation={navigation} activeTab={'More'} />
    </View>
  );
};
export default React.memo(AccountScreen);
