import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HeaderComponent} from '../Components/HeaderComponent';
import {getUserDetails} from '../Storage/AppLocalStorage/UserStorageData';
import {List, MD2Colors, Text} from 'react-native-paper';
import {dateFormat} from '../HelperFuntions/helpers';
import {getIsGuestUser} from '../Storage/LocalStorage';
import {getContactsDetails} from '../Storage/AppLocalStorage/ContactsStorage';

const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [isGuestUser, setIsGuestUser] = useState(false);

  useEffect(() => {
    getIsGuestUser().then(r => {
      setIsGuestUser(r);
    });
    getUserDetails().then(r => setUser(r.user));
    getContactsDetails().then(r => {
      console.log(`${JSON.stringify(r)}`);
      setAddress(r);
    });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.dark}}>
      <HeaderComponent showHeader={true} name={'My Profile'} />
      {isGuestUser ? (
        <Text
          numberOfLines={2}
          style={{
            color: MD2Colors.white,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          You are Logged in as a Guest User
        </Text>
      ) : (
        <List.Section>
          <List.Subheader style={{color: MD2Colors.white}}>
            Personal Details
          </List.Subheader>
          <List.Item
            titleStyle={{
              color: MD2Colors.white,
              fontSize: 17,
              fontWeight: 'bold',
            }}
            title={'Email'}
            right={() => (
              <Text style={{color: MD2Colors.white}}>{user.email}</Text>
            )}
          />
          <List.Item
            titleStyle={{
              color: MD2Colors.white,
              fontSize: 17,
              fontWeight: 'bold',
            }}
            title={'Phone'}
            right={() => (
              <Text style={{color: MD2Colors.white}}>
                {user.phone ? user.phone : 'Not Available'}
              </Text>
            )}
          />
          <List.Item
            titleStyle={{
              color: MD2Colors.white,
              fontSize: 17,
              fontWeight: 'bold',
            }}
            title={'Created On'}
            right={() => (
              <Text style={{color: MD2Colors.white}}>
                {dateFormat(user.created_at)}
              </Text>
            )}
          />
          <List.Item
            titleStyle={{
              color: MD2Colors.white,
              fontSize: 17,
              fontWeight: 'bold',
            }}
            title={'Updated On'}
            right={() => (
              <Text style={{color: MD2Colors.white}}>
                {dateFormat(user.updated_at)}
              </Text>
            )}
          />
          <List.Item
            titleStyle={{
              color: MD2Colors.white,
              fontSize: 17,
              fontWeight: 'bold',
            }}
            title={'Status'}
            right={() => (
              <Text style={{color: MD2Colors.greenA700}}>Active</Text>
            )}
          />
          <List.Subheader style={{color: MD2Colors.white}}>
            Address
          </List.Subheader>
          {address ? (
            <List.Subheader style={{color: MD2Colors.white}}>
              Address
            </List.Subheader>
          ) : (
            <Text
              numberOfLines={2}
              style={{
                color: MD2Colors.white,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                marginVertical: 15,
                marginHorizontal: 5,
                padding: 5,
              }}>
              No Address Available for the user,Try Placing an Order to Get
              Address Details
            </Text>
          )}
        </List.Section>
      )}
    </View>
  );
};
export default React.memo(ProfileScreen);
