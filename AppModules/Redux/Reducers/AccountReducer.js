import {createSlice} from '@reduxjs/toolkit';
import {getUserDetails} from '../../Storage/AppLocalStorage/UserStorageData';
import {getContactsDetails} from '../../Storage/AppLocalStorage/ContactsStorage';

const INITIAL_STATE = {
  user: null,
  contactDetails: null,
};
const accountReducer = createSlice({
  name: 'accountReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addUserData: (state, action) => {
      getUserDetails().then(r => (state.user = r?.user));
      // state.user = action.payload;
    },
    addContactsDetails: (state, action) => {
      getContactsDetails().then(r => {
        state.contactDetails = r?.reduce((result, {title, value}) => {
          if (title === 'Email') {
            result.email = value;
          }
          if (title === 'Phone') {
            result.phone = value;
          }
          if (title === 'Company') {
            result.company = value;
          }
          if (title === 'Address') {
            result.address = value;
          }
          if (title === 'Name') {
            result.name = value;
          }
          if (title === 'Port') {
            result.port = value;
          }
          return result;
        }, {});
      });
    },
  },
});
export const {addUserData, addContactsDetails} = accountReducer.actions;
export default accountReducer.reducer;
