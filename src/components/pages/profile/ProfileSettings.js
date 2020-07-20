import React, { Component } from 'react';
import store from "../../../Store"
import { connect } from "react-redux";
import { addSuccessMessage } from '../../../actions/successMessage/success_message';
import DefaultForm from '../../shared/tables/DefaultForm';
import { Row, Col, Card, CardBody, CardHeader, ButtonGroup, Button } from 'reactstrap';
import QRGen from './QRGen';
import getLoggedInUser from '../../../actions/login/get_logged_in_user';
import postUserProfile from '../../../actions/userprofile/post_userprofile';
import UpdateSetting from './UpdateSetting';
import editUserProfile from '../../../actions/userprofile/edit_userprofile';
import { Config } from '../../../Config';
import PrintDoc from './PDFGen';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

let dataFormat = {
  photo: [],
  name: "",
  address: "",
  postal: "",
  city: "",
  // slug: ""
}

let errorFormat = {
  name: false,
  address: false,
  postal: false,
  city: false,
  photo: false
}

let requiredKeys = [ "name", "address", "postal", "city", "photo"]

class ProfileSettings extends Component {
  // id = this.props.match.params.id
  state = {
    data: {...dataFormat},
    error: {...errorFormat},
    imagepaths: {},
    qrshow: false,
    slugdata: ""
  }

  componentDidMount(){
    let { success } = this.props.getLoggedInUser
    if(success){
        let editable = success.data
        let {...data} = editable
        let pathImage = editable.photo ? { photo: [editable.photo] } : {photo: []}
        data.photo = editable.photo ? [editable.photo] : []
        data.slug = Config.qr_url+ "/" + editable.slug + "/menu"
        this.setState({data : {...this.state.data, ...data}, imagepaths : pathImage, slugdata: editable.slug})
    }else{
      store.dispatch(getLoggedInUser())
    }
  }

  onChange(e) {
    let { name } = e.target;
    let { value } = e.target;
    let { files } = e.target;
    let data = this.state.data;
    let err = this.state.error;
    if(name === "photo"){
      let im =  {...this.state.imagepaths}
        let impath= URL.createObjectURL(files[0])
        im.photo = [impath]
        data[name] = [files[0]]
      this.setState({imagepaths : im})
    }else{
      data[name] = value
    }
    err[name] = false
    if(name === "slug"){
      this.setState({
        qrshow: false,
        slugdata: ""
      })
    }
    this.setState({ data, error: err });
  }

  removeImage(i){
    let paths = {...this.state.imagepaths}
    let data = this.state.data
    paths[i.name].splice(i.index,1)
    data[i.name].splice(i.index,1)
    this.setState({ imagepaths: paths, data })
  }

  onCancel() {
    // this.setState({data: dataFormat, error: dataFormat})
    this.props.history.push("/dashboard")
  }

  onSubmit() {
      let {data, error, imagepaths} = {...this.state}
      let dataKeys = Object.keys(error)
        for(let i = 0; i< dataKeys.length; i++){
          if((data[dataKeys[i]] === "" || data[dataKeys[i]].length<1) && requiredKeys.includes(dataKeys[i])){
            error[dataKeys[i]] = true 
          }
          if(this.id){
            error.image = false
          }
        }
        let checkedVal = Object.values(error)
        if(checkedVal.includes(true)){
          this.setState({error: {...error}})
        }else{
          let proData = {...data}
          if(data.photo.length && !data.photo[0].name){
            delete proData.photo
           }
          let finalData = new FormData()
          for (const key of Object.keys(proData)){
            if(key === "photo"){               
             finalData.append(`photo`,proData.photo[0])
            }if(key === "slug"){
            }else{
              finalData.append(key, proData[key])
            }
          }
          store.dispatch(editUserProfile(finalData))
          // if(this.props.getLoggedInUser.success && this.props.getLoggedInUser.success.data.name ){
          //   console.log("edit")
          //   store.dispatch(editUserProfile(finalData))
          // }else{
          //   console.log("post")
          // store.dispatch(postUserProfile(finalData))
          // }
        }
  }

  componentDidUpdate(prevProps) {
    let { postUserProfile, getLoggedInUser } = this.props;
    if (postUserProfile !== prevProps.postUserProfile) {
        let { success } = postUserProfile;
        if (success) {
          store.dispatch(addSuccessMessage({
            message: { variant: `success`, message: "Your Profile is created. " || success.data.msg, title: `` }
          }))
        //   let editable = success.data
        // let {...data} = editable
        // let pathImage =  { photo: [editable.photo] } 
        // data.photo = [editable.photo] 
        // this.setState({data : {...this.state.data, ...data}, imagepaths : pathImage, slugdata: editable.slug})
          // store.dispatch(fetchBanner())
          // window.location.reload()
        }

    // }
    // if (editBanner !== prevProps.editBanner) {
    //   let { success } = editBanner;
    //   if (success) {
    //     store.dispatch(addSuccessMessage({
    //       message: { variant: `success`, message: success.data.message || success.data.msg, title: `` }
    //     }))
    //     store.dispatch(fetchBanner())
    //     this.props.history.push("/banner")
    //   }
     
     }

    if(prevProps.getLoggedInUser !== getLoggedInUser){
      if(getLoggedInUser.success){
        let editable = getLoggedInUser.success.data
        let {...data} = editable
        let pathImage = editable.photo ? { photo: [editable.photo] } : {photo: []}
        data.photo = editable.photo ? [editable.photo] : []
        data.slug = Config.qr_url+ "/" + editable.slug + "/menu"
        this.setState({data : {...this.state.data, ...data}, imagepaths : pathImage, slugdata: editable.slug})
      }
    }
     
  }

  generateQR = () => {
    let {success} = this.props.getLoggedInUser
    if(success){
      let slugname = success.data && success.data.slug
      this.setState({
        qrshow: !this.state.qrshow,
        slugdata: slugname
      })
    }else{
      store.dispatch(addSuccessMessage({
              message: { variant: `error`, message: "Could not find Slug. Update your Profile first.", title: `` }
        }))
    }
    // this.setState({
    //   qrshow: !this.state.qrshow,
    //   slugdata: this.state.data.slug
    // })
  }

  render() {
    let { data, error} = { ...this.state }
    const { imagepaths } = this.state
    let inputs = [
      {
        name: "name",
        placeholder: "Restaurant Name",
        type: "text",
        required: false,
        value: data.name,
      },
      {
        name: 'photo',
        placeholder: "Logo Upload",
        multiple: false,
        error: error.photo,
        type: "file",
        // required: this.id ? false : true,
        icon: "icon-cloud-upload",
        // disabled: this.id ? true : false,
        acceptable: "image/jpeg,image/gif,image/png,image/x-eps"
      },
      {
        name: "address",
        placeholder: "Address",
        type: "text",
        required: false,
        value: data.address,
      },
      {
        name: "postal",
        placeholder: "Postal",
        type: "text",
        required: false,
        value: data.postal,
      },
      {
        name: "city",
        placeholder: "City",
        type: "text",
        required: false,
        value: data.city,
      },
      {
        name: "slug",
        placeholder: "Slug for your menu",
        type: "text",
        required: false,
        value: data.slug,
        disabled: true
      }
    ]

    return (
      <div>
        <DefaultForm
          title={"Update Your Settings"}
          onChange={(e) => this.onChange(e)}
          onSubmit={() => {
            this.onSubmit()
          }}
          buttonText={"Save"}
          showFull={true}
          removeCancel={true}
          inputs={inputs}
          impaths = {imagepaths}
          onRemove = {(e) => this.removeImage(e)}
          onCancel={() => this.onCancel()}
          // processing={this.props.postBanner.processing}
        />

         <Row className="app align-items-center" style={{ minHeight: '0vh'}}>
            <Col xs='12'>
              <Card>
              <CardHeader style={{
                  display: "flex", justifyContent: "space-between", flexGrow: "1", alignItems: "center",
                  padding: "0.55rem 1.25rem"
                }}>
                  <div>
                    Your QR code</div>
                </CardHeader>
                <CardBody className="p-4">
                  <div className="text-center">
                  {!this.state.qrshow ? <Button className="brand-btn" onClick={() => {this.generateQR()}}>
                    Generate Instructions
                  </Button>
                  : <>
                  <div className="mx-auto">
                  <QRGen slug={this.state.slugdata} pagefor={"checkin"} data={this.props.getLoggedInUser.success.data} />
                  </div>
                  </>
                  }
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

        <UpdateSetting {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { getLoggedInUser, postUserProfile } = state
  return {
    getLoggedInUser, postUserProfile
  }
}

export default connect(mapStateToProps)(ProfileSettings)
