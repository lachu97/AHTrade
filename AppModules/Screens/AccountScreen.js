import React from 'react';
import {FlatList, View} from 'react-native';
import {HeaderComponent} from '../Components/HeaderComponent';
import accountStyles from '../Styles/AccountStyles';
import BottomBar from '../Components/BottomBar/BottomBar';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {List, MD2Colors} from 'react-native-paper';
const profileSection = [
  {title: 'My Account Details', icon: 'account', route: 'Account'},
  {title: 'Contact Details', icon: 'phone', route: 'Contact Details'},
  {title: 'My Bids', icon: 'gamma', route: 'MyBids'},
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
      onPress={() => console.log(item.route)}
    />
  );
};
const ProfileListSection = () => {
  return (
    <List.Section style={{marginHorizontal: 10}}>
      <List.Subheader style={{color: MD2Colors.white}}>
        My Account
      </List.Subheader>
      <FlatList data={profileSection} renderItem={renderItems} />
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
      <ProfileListSection />
      <SettingListSection />

      <BottomBar navigation={navigation} activeTab={'Account'} />
    </View>
  );
};
export default React.memo(AccountScreen);
