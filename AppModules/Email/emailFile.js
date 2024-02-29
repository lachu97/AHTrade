import Config from 'react-native-config';
import axios from 'axios';

let EMAIL_URL = 'https://api.elasticemail.com/v4/emails/transactional';

let apiKey = Config.EMAIL_API_KEY;

let emailData = {
  Recipients: {
    To: ['stellarworks03@gmail.com'],
    CC: ['betelguesebusiness@gmail.com'],
    BCC: ['betelguesebusiness@gmail.com'],
  },
  Content: {
    Body: [
      {
        ContentType: 'HTML',
        Content: 'string',
        Charset: 'string',
      },
    ],
    EnvelopeFrom: 'betelguesebusiness@gmail.com',
    From: 'betelguesebusiness@gmail.com',
    ReplyTo: 'betelguesebusiness@gmail.com',
    Subject: 'Hello!',
  },
};

export const sendEmailAction = data => ({
  type: 'SEND_EMAIL',
  payload: {
    data: emailData,
  },
});
export const configureEmailData = async emailDatas => {
  const config = {
    headers: {
      'X-ElasticEmail-ApiKey': `${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorizations: `${apiKey}`,
    },
  };
  let result = await axios.post(EMAIL_URL, {message:emailDatas}, config);
  return result.data;
};
