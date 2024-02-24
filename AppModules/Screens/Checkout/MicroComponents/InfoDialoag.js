import React from 'react';
import {Button, Dialog, Text} from 'react-native-paper';
import {ScrollView} from 'react-native';

const InfoDialoag = ({isVisible, onDismiss}) => {
  return (
    <Dialog visible={isVisible} onDismiss={onDismiss}>
      <Dialog.Title>Why Processing Fee ?</Dialog.Title>
      <Dialog.ScrollArea>
        <ScrollView contentContainerStyle={{padding: 2}}>
          <Text numberOfLines={10}>
            At AHTrade, we implement a nominal processing fee of $4.99 to ensure
            the authenticity of each order. This fee helps us prevent duplicate
            and repeat orders, ensuring that every transaction is genuine and
            providing you with a secure and reliable shopping experience
          </Text>
          <Text numberOfLines={2}>
            Thank You, your understanding is highly Appreciated
          </Text>
        </ScrollView>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button icon={'alert-circle-check-outline'} onPress={onDismiss}>OK,Got it</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
export default React.memo(InfoDialoag);
