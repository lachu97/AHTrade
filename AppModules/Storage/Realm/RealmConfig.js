import React from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
class Auth extends Realm.Object {
  static schema = {
    name: 'Authentication',
    properties: {
      _id: 'int',
      name: 'string',
      loggedIn: 'string',
    },
    primaryKey: '_id',
  };
}
const realmConfig = new Realm({schema: [Auth]});
export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
export default Auth;
