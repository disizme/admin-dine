import React from 'react'
import ProfileSettings from './ProfileSettings'
// import connect from "react-redux/es/connect/connect";
// import {fetchBanner} from '../../../actions/banners/fetch_banners'
// import store from '../../../Store'
// import {addSuccessMessage} from "../../../actions/successMessage/success_message";
// import TabPage from '../../shared/tables/TabPage';
// import {Inputs} from './bannerRoutes';

function Profile(props) {
  let {path} = props.match

  return (<>
  {/* <TabPage {...props} inputs={Inputs}> */}
      {/* {path === "/settings" ? 
        <BannerLibrary {...props}/> */}
         <ProfileSettings {...props}/>
    {/* </TabPage> */}
    </>
  )

}


export default Profile
