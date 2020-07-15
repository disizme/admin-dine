import React from 'react'
import Categories from './Categories'
import NewCategory from './NewCategory'
// import connect from "react-redux/es/connect/connect";
// import store from '../../../Store'
// import {addSuccessMessage} from "../../../actions/successMessage/success_message";
// import TabPage from '../../shared/tables/TabPage';

function FoodCategoryUI(props) {
  let {path} = props.match

  return (<>
  {/* <TabPage {...props} inputs={Inputs}> */}
      {path === "/emenu/food-category" ? 
        <Categories {...props}/>
          : <NewCategory {...props}/>}
    {/* </TabPage> */}
    </>
  )

}


export default FoodCategoryUI
