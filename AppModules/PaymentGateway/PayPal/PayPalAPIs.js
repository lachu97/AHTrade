import Config from 'react-native-config';
import {encode} from 'base-64';
import axios from 'axios';
import reactotron from 'reactotron-react-native';
import {getAccessToken, storeAccessToken} from './PaypalStorage';
export const getPayPalAccessToken = () => {
  const clientId = Config.PAYPAL_CLIENT_ID;
  const clientSecret = Config.PAYPAL_CLIENT_SECRET;
  const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = encode(credentials);
  const data = 'grant_type=client_credentials';

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedCredentials}`,
    },
  };
  axios
    .post(url, data, config)
    .then(response => {
      console.log('Paypal Data' + JSON.stringify(response.data));
      reactotron.log('Paypal Data' + JSON.stringify(response.data));
      let accessToken = response.data.access_token;
      let validity = response.data.expires_in;
      storeAccessToken(accessToken);
    })
    .catch(error => {
      console.error(error.response.data);
    });
};

export const captureOrders = () => {
  const clientId = Config.PAYPAL_CLIENT_ID;
  const clientSecret = Config.PAYPAL_CLIENT_SECRET;
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = encode(credentials);
  let config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedCredentials}`,
    },
  };
  let url = 'https://api-m.sandbox.paypal.com/v2/checkout/orders';
  let data = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '100.00',
        },
      },
    ],
  };
  return axios
    .post(url, JSON.stringify(data), config)
    .then(response => {
      reactotron.log(response.data);
      return response.data
    })
    .catch(err => reactotron.log(err.message));
};
