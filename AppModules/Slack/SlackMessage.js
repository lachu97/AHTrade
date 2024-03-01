import {Platform} from 'react-native';
import axios from 'axios';
import {SLACK_GROUP_URL} from '../Constants/AppConstants';
export const makeMessage = orderDetails => {
  const orderMessage = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `New Order Update: OS = ${
            Platform.OS === 'ios' ? 'ios' : 'android'
          }`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Order Details \n',
              },
            ],
          },
          {
            type: 'rich_text_list',
            style: 'bullet',
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Product ID: ',
                  },
                  {
                    type: 'text',
                    text: `${orderDetails.item.pid}`,
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Commodity Name: ',
                  },
                  {
                    type: 'text',
                    text: `${orderDetails.item.title}`,
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Quantity: ',
                  },
                  {
                    type: 'text',
                    text: `${
                      orderDetails.quantity + '' + orderDetails.item.unit
                    } `,
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Price: ',
                  },
                  {
                    type: 'text',
                    text: `$ ${orderDetails.price} / ${orderDetails.item.unit}`,
                    style: {
                      bold: true,
                    },
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Total Order Value : ',
                  },
                  {
                    type: 'text',
                    text: `$ ${Math.ceil(
                      orderDetails.price * orderDetails.quantity,
                    )}`,
                    style: {
                      bold: true,
                    },
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Incoterm: ',
                  },
                  {
                    type: 'text',
                    text: `${orderDetails.incoterm}(${orderDetails.contact.port})`,
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Packaging Type: ',
                  },
                  {
                    type: 'text',
                    text: `${orderDetails.packaging}`,
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Payment Term: ',
                  },
                  {
                    type: 'text',
                    text: `${orderDetails.payment}`,
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Shipment Type: ',
                  },
                  {
                    type: 'text',
                    text: `${orderDetails.mode}`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Contact Details\n',
              },
            ],
          },
          {
            type: 'rich_text_list',
            style: 'bullet',
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Name: ',
                  },
                  {
                    type: 'text',
                    text: `${orderDetails.contact.name}`,
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Contact info: ',
                  },
                  {
                    type: 'text',
                    text: `${orderDetails.contact.phone}`,
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Company Name: ',
                  },
                  {
                    type: 'text',
                    text: `${orderDetails.contact.company}`,
                    style: {
                      bold: true,
                    },
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Email: ',
                  },
                  {
                    type: 'text',
                    text: `${orderDetails.contact.email}`,
                    style: {
                      bold: true,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  return orderMessage;
};

export const sendMessageToSlack = async data => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  axios
    .post(SLACK_GROUP_URL, data, config)
    .then(r => {
      console.log(r.data);
      return r.data;
    })
    .catch(e => {
      console.error(e.message);
      return e.message;
    });
};

export const sendOrderMessageToSlackAction = message => ({
  type: 'SEND_ORDER_MESSAGE_TO_SLACK',
  payload: {
    data: message,
  },
});
