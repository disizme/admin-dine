import React from 'react'
// import connect from "react-redux/es/connect/connect";
// import {fetchBanner} from '../../../actions/banners/fetch_banners'
// import store from '../../../Store'
// import {addSuccessMessage} from "../../../actions/successMessage/success_message";
// import TabPage from '../../shared/tables/TabPage';
import FoodItems from './FoodItems';
import NewFoodItem from './NewFoodItem';

function FoodItemsUI(props) {
  let {path} = props.match

  return (<>
  {/* <TabPage {...props} inputs={Inputs}> */}
      {path === "/emenu/food-items"  || path === "/emenu"? 
        <FoodItems {...props}/>
          : <NewFoodItem {...props}/>}
    {/* </TabPage> */}
    </>
  )

}


export default FoodItemsUI
