export const postOrderToDBAction = data => ({
  type: 'POST_ORDER_SAGA',
  payload: {
    data: data,
  },
});
