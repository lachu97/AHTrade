import {getBidList} from '../LocalStorage/BidDatabase';

export const getBidListFromStorage = async () => {
  let result = await getBidList();
  if (result) {
    return result;
  }
  return false;
};
