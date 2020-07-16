import React, { Component } from 'react';
import store from "../../../Store"
import { connect } from "react-redux";
import { addSuccessMessage } from '../../../actions/successMessage/success_message';
import DefaultForm from '../../shared/tables/DefaultForm';
import {fetchFoodCategory} from '../../../actions/foodcategory/fetch_food_category';
import {editFoodCategory} from '../../../actions/foodcategory/edit_food_category';
import {postFoodCategory} from '../../../actions/foodcategory/post_food_category';

let dataFormat = {
  "name": ""
}

let errorFormat = {
  "name": false
}

let requiredKeys = [ "name"]

class NewCategory extends Component {
  id = this.props.match.params.id
  state = {
    data: {...dataFormat},
    error: {...errorFormat},
    load: false,
  }

  componentDidMount(){
    if(this.id){
      const {success} = this.props.fetchFoodCategory
      if(success && success.data){
        let editable = success.data.find(i => i.id === parseInt(this.id))
          this.setState({data: editable })
        }else {
          this.props.history.push("/emenu/food-category")
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
    this.props.history.push(`/emenu/food-category`)
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
          store.dispatch(editFoodCategory(data))
        }else {
          store.dispatch(postFoodCategory(data))
        }
      }
  }

  componentDidUpdate(prevProps) {
    let { postFoodCategory, editFoodCategory } = this.props;
    if (postFoodCategory !== prevProps.postFoodCategory) {
        let { success, error } = postFoodCategory;
        if (success) {
          store.dispatch(addSuccessMessage({
            message: { variant: `success`, message: success.data.message || success.data.msg, title: `` }
          }))
          store.dispatch(fetchFoodCategory())
          this.props.history.push("/emenu/food-category")
        }
        else if (error) {
        }
    }
    if (editFoodCategory !== prevProps.editFoodCategory) {
      let { success, error } = editFoodCategory;
      if (success) {
        store.dispatch(addSuccessMessage({
          message: { variant: `success`, message: success.data.message || success.data.msg, title: `` }
        }))
        store.dispatch(fetchFoodCategory())
        this.props.history.push("/emenu/food-category")
      }
      else if (error) {
      }
  }
  }

  render() {
    let { data, load, error} = { ...this.state }
    let inputs = [
      {
        name: 'name',
        placeholder: 'Name',
        value: data.name,
        type: 'text',
        required: true,
        error: error.name
      },
      // {
      //   name: 'title',
      //   placeholder: 'Detail',
      //   value: data.title,
      //   type: 'text',
      //   required: true,
      //   error: error.title
      // }
    ]
    
    return (
      <div>
        <DefaultForm
          title={this.id ? "Edit Category" : "New Category"}
          onChange={(e) => this.onChange(e)}
          onSubmit={(e) => {
            this.onSubmit(e)
          }}
          inputs={inputs}
          buttonText={"Save"}
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
  let { postFoodCategory, editFoodCategory, fetchFoodCategory } = state
  return {
    postFoodCategory, editFoodCategory, fetchFoodCategory
  }
}

export default connect(mapStateToProps)(NewCategory)
