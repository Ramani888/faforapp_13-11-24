import {configureStore} from '@reduxjs/toolkit';
import userLogin from './slices/login';
import userDetails from './slices/getUserDetails';
import cashoutRequest from './slices/cashoutRequest';
import unilevelWithdrawRequest from './slices/unilevelWithdrawRequest';
import balanceRequest from './slices/balanceRequest';
import productVoucherRequest from './slices/productVoucherRequest';
import getLeadership from './slices/getLeadership';
import walletConversion from './slices/walletConversion';
import getReport from './slices/getReport';
import getDirectTeamList from './slices/getDirectTeamList';
import getMyOrders from './slices/getMyOrders';
import logout from './slices/logout';

export const store = configureStore({
  reducer: {
    userLogin,
    userDetails,
    cashoutRequest,
    unilevelWithdrawRequest,
    balanceRequest,
    productVoucherRequest,
    getLeadership,
    walletConversion,
    getReport,
    getDirectTeamList,
    getMyOrders,
    logout,
  },
});
