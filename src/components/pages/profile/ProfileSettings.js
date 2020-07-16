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

let dataFormat = {
  photo: [],
  name: "",
  address: "",
  postal: "",
  city: "",
  slug: ""
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
        console.log(success, "mount")
        let {...data} = editable
        let pathImage = !editable.photo ? { photo: [editable.photo] } : {}
        data.photo = !editable.photo ? [editable.photo] : []
        this.setState({data : {...this.state.data, ...data}, imagepaths : pathImage, slugdata: editable.slug})
    }else{
      store.dispatch(getLoggedInUser())
    }
  }

  componentDidUpdate(prevProps){
    let {getLoggedInUser} = this.props
    if(prevProps.getLoggedInUser !== getLoggedInUser){
      if(getLoggedInUser.success){
        let editable = getLoggedInUser.success.data
        let {...data} = editable
        let pathImage = !editable.photo ? { photo: [editable.photo] } : {}
        data.photo = !editable.photo ? [editable.photo] : []
        this.setState({data : {...this.state.data, ...data}, imagepaths : pathImage, slugdata: editable.slug})
      }
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
      let {data, error} = {...this.state}
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
          let finalData = new FormData()
          for (const key of Object.keys(data)){
            if(key === "photo"){
                finalData.append(`photo`,data.photo[0])
            }else{
              finalData.append(key, data[key])
            }
          }
          // if(this.id){
          //   if(!data.image.length || !data.image[0].name){
          //     finalData.delete("image")
          //   }
          //   if(!data.image_mobile.length || !data.image_mobile[0].name){
          //     finalData.delete("image_mobile")
          //   }
          //   store.dispatch(editBanner(finalData))
          // }else{
          store.dispatch(postUserProfile(finalData))
          // }
        }
  }

  componentDidUpdate(prevProps) {
    let { postUserProfile } = this.props;
    if (postUserProfile !== prevProps.postUserProfile) {
        let { success } = postUserProfile;
        if (success) {
          store.dispatch(addSuccessMessage({
            message: { variant: `success`, message: success.data.message || success.data.msg, title: `` }
          }))
          // store.dispatch(fetchBanner())
          window.location.reload()
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
                    Generate QR Code
                  </Button>
                  : <QRGen slug={this.state.slugdata} />
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
