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

import fetchCustomers from '../actions/customers/fetch_customers';
import editCustomers from '../actions/customers/edit_customers';
import postCustomers from '../actions/customers/post_customers';
import deleteCustomers from '../actions/customers/delete_customers';

const allReducers = combineReducers({
  loading, successMessage,
  postUserProfile, editUserProfile, postUserSettings, editUserSettings,
  fetchFoodItems, editFoodItems, postFoodItems, deleteFoodItems,
  fetchFoodCategory, editFoodCategory, postFoodCategory, deleteFoodCategory,
  fetchCustomers, editCustomers, postCustomers, deleteCustomers,
  getLoginRequest, getLoggedInUser, getSignupRequest,
});


export default allReducers;
