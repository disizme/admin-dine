import { combineReducers } from 'redux';

import loading from './activateLoading/activate-loading';
import successMessage from './successMessage/success-message';

import getLoginRequest from './login/login-request';
import getLoggedInUser from './login/get-logged-in-user';
import getSignupRequest from './login/signup-request';

import editUserProfile from './userprofile/edit-userprofile';
import postUserProfile from './userprofile/post-userprofile';

import editUserSettings from './userprofile/edit-usersetting';
import postUserSettings from './userprofile/post-usersetting';

import fetchFoodItems from './fooditems/fetch-fooditems';
import editFoodItems from './fooditems/edit-fooditems';
import postFoodItems from './fooditems/post-fooditems';
import deleteFoodItems from './fooditems/delete-fooditems';

import fetchFoodCategory from './food-category/fetch-food-category';
import editFoodCategory from './food-category/edit-food-category';
import postFoodCategory from './food-category/post-food-category';
import deleteFoodCategory from './food-category/delete-food-category';

import fetchCustomers from './customers/fetch-customers';
import editCustomers from './customers/edit-customers';
import postCustomers from './customers/post-customers';
import deleteCustomers from './customers/delete-customers';

import fetchHourCount from './data-visual/fetch-hourcount';
import fetchDayCount from './data-visual/fetch-daycount';
import fetchMonthCount from './data-visual/fetch-monthcount';
import fetchPercentile from './data-visual/fetch-percentile';

import userProfile from './diners/admin/user-profile';
import fetchCategory from './diners/category/fetch-category';
import fetchFoodMenu from './diners/foodmenu/fetch-foodmenu';
import customerCheckin from './diners/customer/customer-checkin';
import customerOrder from './diners/customer/customer-order';

const allReducers = combineReducers({
  loading, successMessage,
  userProfile, fetchCategory, fetchFoodMenu,  customerCheckin, customerOrder,
  fetchHourCount, fetchDayCount, fetchMonthCount, fetchPercentile,
  postUserProfile, editUserProfile, postUserSettings, editUserSettings,
  fetchFoodItems, editFoodItems, postFoodItems, deleteFoodItems,
  fetchFoodCategory, editFoodCategory, postFoodCategory, deleteFoodCategory,
  fetchCustomers, editCustomers, postCustomers, deleteCustomers,
  getLoginRequest, getLoggedInUser, getSignupRequest,
});

export default allReducers;
