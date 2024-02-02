import React, {useState} from 'react';
import {Button, Dialog} from 'react-native-paper';
import AHTextInput from '../../../Components/AHTextInput';

const BidDialog = ({
  isVisible,
  hideDialog,
  title,
  onSuccess,
  placeholder,
  keyBoardType,
}) => {
  const [text, setText] = useState('');
  return (
    <Dialog visible={isVisible} onDismiss={hideDialog}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <AHTextInput
          onChangeText={e => setText(e)}
          value={text}
          placeholder={placeholder}
          keyboardType={keyBoardType}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          onPress={() => {
            hideDialog();
            onSuccess(text);
          }}>
          Done
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
export const QuantityDialog = ({
  isVisible,
  hideDialog,
  title,
  onSuccess,
  placeholder,
  keyboardType,
}) => {
  const [text, setText] = useState('');
  return (
    <Dialog visible={isVisible} onDismiss={hideDialog}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <AHTextInput
          onChangeText={e => setText(e)}
          value={text}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          onPress={() => {
            hideDialog();
            onSuccess(text);
          }}>
          Done
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
export default React.memo(BidDialog);
