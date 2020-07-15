import React from 'react'
import Customers from './Customers'
import NewCustomer from './NewCustomer'

// import connect from "react-redux/es/connect/connect";
// import {fetchBanner} from '../../../actions/banners/fetch_banners'
// import store from '../../../Store'
// import {addSuccessMessage} from "../../../actions/successMessage/success_message";
// import TabPage from '../../shared/tables/TabPage';


function CustomersUI(props) {
  let {path} = props.match

  return (<>
  {/* <TabPage {...props} inputs={Inputs}> */}
      {path === "/customers" ? 
        <Customers {...props}/>
          : <NewCustomer {...props}/>}
    {/* </TabPage> */}
    </>
  )

}


export default CustomersUI
