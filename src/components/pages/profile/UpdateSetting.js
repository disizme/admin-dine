import React, { Component } from 'react';
import store from "../../../Store"
import { connect } from "react-redux";
import { addSuccessMessage } from '../../../actions/successMessage/success_message';
import DefaultForm from '../../shared/tables/DefaultForm';
import editUserSettings from '../../../actions/userprofile/edit_usersettings';
import postUserSettings from '../../../actions/userprofile/post_usersettings';

let dataFormat = {
  // "username":"",
  "old_password": "",
  "new_password": "",
  "retype_password": ""
}

let errorFormat = {
  // "username": false,
  "old_password": false,
  "new_password": false,
  "retype_password": false
}

let requiredKeys = [ "old_password", "new_password", "retype_password"]

class UpdateSetting extends Component {
  id = this.props.match.params.id
  state = {
    data: {...dataFormat},
    error: {...errorFormat},
    load: false,
  }

  componentDidMount(){
    // if(this.id){
    //   const {success} = this.props.fetchCustomers
    //   if(success && success.data){
    //     let editable = success.data.find(i => i.id === parseInt(this.id))
    //       this.setState({data: editable })
    //     }else {
    //       this.props.history.push("/customers")
    //     }
    //   }
  }

  onChange(e) {
    let { name } = e.target;
    let { value } = e.target;
    let { data, error } = { ...this.state };
    data[name] = value;
    error[name] = false
    this.setState({ data: {...data}, error: {...error}});
  }

  onCancel() {
    this.props.history.push(`/dashboard`)
  }

  onSubmit(key) {
      let {data, error} = {...this.state}
      let dataKeys = Object.keys(error)
      for(let i = 0; i< dataKeys.length; i++){
        if((data[dataKeys[i]] === "") && requiredKeys.includes(dataKeys[i])){
          error[dataKeys[i]] = true
        }
      }
      let checkedVal = Object.values(error)
      if(checkedVal.includes(true)){
        this.setState({error: {...error}})
      }else{
        this.setState({load: true})
        let finalData = new FormData()
        for (const key of Object.keys(data)){
            finalData.append(key, data[key])
        }
        store.dispatch(editUserSettings(finalData))

        // if(this.id){
        //   store.dispatch(editUserSettings(data))
        // }else {
        //   store.dispatch(postUserSettings(data))
        // }
      }
  }

  componentDidUpdate(prevProps) {
    let { postUserSettings, editUserSettings } = this.props;
    if (postUserSettings !== prevProps.postUserSettings) {
        let { success, error } = postUserSettings;
        if (success) {
          store.dispatch(addSuccessMessage({
            message: { variant: `success`, message: success.data.message || success.data.msg, title: `` }
          }))
          // store.dispatch(fetchCustomers())
          // this.props.history.push("/dashboard")
          this.setState({data : {...dataFormat}, error: {...errorFormat}})
        }
        else if (error) {
        }
    }
    if (editUserSettings !== prevProps.editUserSettings) {
      let { success, error } = editUserSettings;
      if (success) {
        store.dispatch(addSuccessMessage({
          message: { variant: `success`, message: success.data.message || success.data.msg || "Password changed successfully.", title: `` }
        }))
        // store.dispatch(fetchCustomers())
        this.setState({data : {...dataFormat}, error: {...errorFormat}})
        this.props.history.push("/")
      }
      else if (error) {
      }
  }
  }

  // addOption = () => {
  //   const {options, optionalField} = this.state
  //   let optional = optionalField
  //   optional[`option${options+1}`] = {name: "", value: ""}
  //   this.setState({
  //     options: options+1,
  //     optionalField: {...optionalField, ...optional}
  //   })
  // }

  render() {
    let { data, load, error} = { ...this.state }
    let inputs = [
      {
        name: 'old_password',
        placeholder: 'Old Password',
        value: data.old_password,
        type: 'password',
        required: true,
        error: error.old_password
      },
      {
        name: 'new_password',
        placeholder: 'New Password',
        value: data.new_password,
        type: 'password',
        required: true,
        error: error.new_password
      },
      {
        name: 'retype_password',
        placeholder: 'Retype Password',
        value: data.retype_password,
        type: 'password',
        required: true,
        error: error.retype_password
      }
    ]
    
    return (
      <div>
        <DefaultForm
          title={"Update Credential"}
          onChange={(e) => this.onChange(e)}
          onSubmit={(e) => {
            this.onSubmit(e)
          }}
          showFull={true}
          removeCancel={true}
          inputs={inputs}
          onCancel={() => this.onCancel()}
          load= {load}
          buttonText={"Change Password"}
          // customButton={{name: "send"}}
          // options={options}
          // optionalField={optionalField}
          // addOpt={this.addOption}
          // updateOption ={(e) => this.updateOption(e)}
          // processing={this.props.getPlan.processing}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  let { postUserSettings, editUserSettings } = state
  return {
    postUserSettings, editUserSettings
  }
}

export default connect(mapStateToProps)(UpdateSetting)
