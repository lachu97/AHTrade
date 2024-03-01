import React, {useEffect, useState} from 'react';
import {Button, Dialog, MD2Colors, Text} from 'react-native-paper';
import {getUserDetails} from '../../../Storage/AppLocalStorage/UserStorageData';
import {getIsGuestUser} from '../../../Storage/LocalStorage';
import {View} from 'react-native';
import {supaBaseClient} from '../../../SupaBase/Client/supabaseClient';
import {showBottomFeedBack} from '../../../Components/Toasts/ToastsFeedBack';

const DeleteDialog = ({isVisible, onDismiss}) => {
  const [isGuestUser, setIsGuestUser] = useState(false);

  const [userDetails, setUser] = useState({});
  useEffect(() => {
    getIsGuestUser().then(r => {
      console.log(`isGuest User = ${typeof r} and ${r}`);
      setIsGuestUser(r);
    });
    const getMeUser = async () => {
      getUserDetails().then(r => {
        console.log(`${JSON.stringify(r.user)}`);

        setUser(r.user);
      });
    };
    getMeUser();
  }, []);

  return (
    <Dialog visible={isVisible} onDismiss={onDismiss}>
      <Dialog.Title>Delete My Account Request</Dialog.Title>
      <Dialog.Content>
        <>
          {isGuestUser ? (
            <Text>Your are Logged In as a Guest User</Text>
          ) : (
            <View>
              <Text>Submit Delete Request For Email: </Text>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {userDetails?.email}
              </Text>
            </View>
          )}
        </>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button
          onPress={() => {
            showBottomFeedBack(
              'Delete Request Submitted Successfully,will be deleted in 2-3 business days',
            );
            setTimeout(() => {
              onDismiss();
            }, 1500);
          }}>
          Submit
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default React.memo(DeleteDialog);
