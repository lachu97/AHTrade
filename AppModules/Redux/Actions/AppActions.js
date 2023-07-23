import { ADD_LOGIN_STATE, GET_LOGIN_STATE, INITIALISE_LOGIN } from "./Constants";

export const fetchLoginStateAction = () => ({
  type: GET_LOGIN_STATE,
});
export const addLoginStateAction = data => ({
  type: ADD_LOGIN_STATE,
  payload: data,
});

export const initialiseRealmAction = () => ({
  type: INITIALISE_LOGIN
})
