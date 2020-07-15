import React from 'react';

const FoodItemsUI = React.lazy(()=> import ('./components/pages/fooditems/FoodItemsUI'));
const FoodCategoryUI = React.lazy(() => import('./components/pages/foodcategory/CategoryUI'));
const CustomersUI = React.lazy(() => import('./components/pages/customers/CustomersUI'));
const Profile = React.lazy(() => import('./components/pages/profile/Profile'))
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const FullPageModal = React.lazy(() => import('./components/shared/messages/FullPageModal'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/emenu', exact: true, name: 'E-Menu', component: FoodItemsUI},
  { path: '/emenu/food-items', exact: true, name: 'Food Items', component: FoodItemsUI},
  { path: '/emenu/food-items/new', exact: true, name: 'New Item', component: FoodItemsUI},
  { path: '/emenu/food-items/:id/edit', exact: true, name: 'Edit Item', component: FoodItemsUI},
  { path: '/emenu/food-category', exact: true, name: 'Food Category', component: FoodCategoryUI},
  { path: '/emenu/food-category/new', exact: true, name: 'New Category', component: FoodCategoryUI},
  { path: '/emenu/food-category/:id/edit', exact: true, name: 'E-MenEdit Category', component: FoodCategoryUI},
  { path: '/customers', exact: true, name: 'Customers', component: CustomersUI},
  { path: '/settings', exact: true, name: 'Settings', component: Profile},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/full-page-modal', name: 'Full Page Modal', component: FullPageModal },
];

export default routes;
