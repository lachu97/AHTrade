import React from 'react';
import {FlatList, Linking, View} from 'react-native';
import {HeaderComponent} from '../Components/HeaderComponent';
import accountStyles from '../Styles/AccountStyles';
import BottomBar from '../Components/BottomBar/BottomBar';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {List, MD2Colors, Text, Tooltip} from 'react-native-paper';
import CountryFlag from 'react-native-country-flag';
import {storeIsLoggedIn} from '../Storage/LocalStorage';
import {supaBaseClient} from '../SupaBase/Client/supabaseClient';
import {PRIVACY_POLICY_LINK} from '../Constants/AppConstants';
import {showBottomFeedBack} from '../Components/Toasts/ToastsFeedBack';
const profileSection = [
  {title: 'My Account Details', icon: 'account', route: 'Account'},
  {title: 'Contact Details', icon: 'phone', route: 'Contact Details'},
  {title: 'My Bids', icon: 'gamma', route: 'MyBids'},
  {title: 'Log out', icon: 'export', route: 'logout'},
];
const settingsSection = [
  {title: 'About Us', icon: 'star-settings', route: 'AboutUs'},
  {title: 'Privacy Policy', icon: 'powershell', route: 'Privacy'},
  {title: 'App Version', icon: 'target', route: 'Version'},
  {title: 'Report a Bug', icon: 'bug', route: 'Bug'},
  {title: 'Delete My Account', icon: 'delete', route: 'Delete'},
];
const renderItems = ({item}) => {
  return (
    <List.Item
      style={accountStyles.listItemStyles}
      left={() => <List.Icon color={MD2Colors.white} icon={item.icon} />}
      titleStyle={accountStyles.listIconStyles}
      title={item.title}
      onPress={async () => {
        if (item.route === 'Privacy') {
          console.log('iam here');
          let canOpen = await Linking.canOpenURL(PRIVACY_POLICY_LINK);
          if (canOpen) {
            showBottomFeedBack('Opening Link in Browser');
            await Linking.openURL(PRIVACY_POLICY_LINK);
          } else {
            showBottomFeedBack('Cant open Link');
          }
        }
      }}
    />
  );
};
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
                if (item.route === 'logout') {
                  storeIsLoggedIn(false);

                  //  const {error} = await supaBaseClient.auth.signOut();

                  //  console.log(`Error in SignOut = ${JSON.stringify(error)}`);
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'AuthStack'}],
                  });
                }
              }}
            />
          );
        }}
      />
    </List.Section>
  );
};
const SettingListSection = () => {
  return (
    <List.Section style={{marginHorizontal: 10}}>
      <List.Subheader style={{color: MD2Colors.white}}>Settings</List.Subheader>
      <FlatList data={settingsSection} renderItem={renderItems} />
    </List.Section>
  );
};
const AccountScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={accountStyles.container}>
      <HeaderComponent />
      <ProfileListSection navigation={navigation} />
      <SettingListSection />
      <View style={accountStyles.bottomContainer}>
        <Tooltip title={'Made In India Logo'} enterTouchDelay={0}>
          <Text style={accountStyles.text}>Made in India</Text>
        </Tooltip>
        <CountryFlag isoCode={'in'} size={14} />
      </View>
      <BottomBar navigation={navigation} activeTab={'More'} />
    </View>
  );
};
export default React.memo(AccountScreen);
