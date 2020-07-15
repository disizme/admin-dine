import React, { Component } from 'react';
import store from "../../../Store"
import { connect } from "react-redux";
import { addSuccessMessage } from '../../../actions/successMessage/success_message';
import DefaultForm from '../../shared/tables/DefaultForm';
import editCustomers from '../../../actions/customers/edit_customers';
import postCustomers from '../../../actions/customers/post_customers';
import fetchCustomers from '../../../actions/customers/fetch_customers';

let dataFormat = {
  "id": Math.floor(Math.random() * 10000) + 1,
  "name":""
}

let errorFormat = {
  "name": false
}

let requiredKeys = [ "name"]

class NewCustomer extends Component {
  id = this.props.match.params.id
  state = {
    data: {...dataFormat},
    error: {...errorFormat},
    load: false,
  }

  componentDidMount(){
    if(this.id){
      const {success} = this.props.fetchCustomers
      if(success && success.data){
        let editable = success.data.find(i => i.id === parseInt(this.id))
          this.setState({data: editable })
        }else {
          this.props.history.push("/customers")
        }
      }
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
    this.props.history.push(`/customers`)
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
        if(this.id){
          store.dispatch(editCustomers(data))
        }else {
          store.dispatch(postCustomers(data))
        }
      }
  }

  componentDidUpdate(prevProps) {
    let { postCustomers, editCustomers } = this.props;
    if (postCustomers !== prevProps.postCustomers) {
        let { success, error } = postCustomers;
        if (success) {
          store.dispatch(addSuccessMessage({
            message: { variant: `success`, message: success.data.message || success.data.msg, title: `` }
          }))
          store.dispatch(fetchCustomers())
          this.props.history.push("/customers")
        }
        else if (error) {
        }
    }
    if (editCustomers !== prevProps.editCustomers) {
      let { success, error } = editCustomers;
      if (success) {
        store.dispatch(addSuccessMessage({
          message: { variant: `success`, message: success.data.message || success.data.msg, title: `` }
        }))
        store.dispatch(fetchCustomers())
        this.props.history.push("/customers")
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
        name: 'name',
        placeholder: 'Customer Name',
        value: data.name,
        type: 'text',
        required: true,
        error: error.name
      }
    ]
    
    return (
      <div>
        <DefaultForm
          title={this.id ? "Edit Customer" : "New Customer"}
          onChange={(e) => this.onChange(e)}
          onSubmit={(e) => {
            this.onSubmit(e)
          }}
          inputs={inputs}
          onCancel={() => this.onCancel()}
          load= {load}
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
  let { postCustomers, editCustomers, fetchCustomers } = state
  return {
    postCustomers, editCustomers, fetchCustomers
  }
}

export default connect(mapStateToProps)(NewCustomer)
