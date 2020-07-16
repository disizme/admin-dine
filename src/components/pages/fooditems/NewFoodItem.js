import React, { Component } from 'react';
import store from "../../../Store"
import { connect } from "react-redux";
import { addSuccessMessage } from '../../../actions/successMessage/success_message';
import DefaultForm from '../../shared/tables/DefaultForm';
import {fetchFooditems} from '../../../actions/fooditems/fetch_fooditem';
import {postFooditems} from '../../../actions/fooditems/post_fooditem';
import {editFooditems} from '../../../actions/fooditems/edit_fooditem';
import fetchFoodCategory from '../../../actions/foodcategory/fetch_food_category';


let dataFormat = {
  "name" : "",
  "price" : "",
  "description" : "",
  "image" : []
}

let errorFormat = {
  "name" : false,
  "price" : false,
  "description" : false,
  "image" : false
}

let requiredKeys = [ "name", "price", "description", "image"]

class NewFoodItem extends Component {
  id = this.props.match.params.id
  state = {
    data: {...dataFormat},
    error: {...errorFormat},
    load: false,
    imagepaths: {}
  }

  componentDidMount(){
    if(this.id){
      const {success} = this.props.fetchFoodItems
      if(success && success.data && success.data){
        let editable = success.data.data.find(i => i.id === parseInt(this.id))
        if(editable){
          let {...data} = editable
          let pathImage = { image: [editable.image] }
          data.image = [editable.image]
          this.setState({
              data: {...this.state.data, ...data},
            imagepaths: pathImage 
          })
        }else {
          this.props.history.push("/emenu/food-items")
        }
      }else{
        this.props.history.push("/emenu/food-items")
      }
    }
    if(!this.props.fetchFoodCategory.success){
      store.dispatch(fetchFoodCategory())
    }
  }

  onChange(e) {
    let { name } = e.target;
    let { value } = e.target;
    let { files } = e.target;
    let data = this.state.data;
    let err = this.state.error;
    if(name === "image"){
      let im =  {...this.state.imagepaths}
        let impath= URL.createObjectURL(files[0])
        im.image = [impath]
        data[name] = [files[0]]
      this.setState({imagepaths : im})
    }else{
      data[name] = value
    }
    err[name] = false
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
    this.props.history.push(`/emenu/food-items`)
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
            if(key === "image"){
                finalData.append(`image`,data.image[0])
            }else{
              finalData.append(key, data[key])
            }
          }
          if(this.id){
            if(!data.image.length || !data.image[0].name){
              finalData.delete("image")
            }
            store.dispatch(editFooditems(finalData))
          }else{
          store.dispatch(postFooditems(finalData))
          }
        }
  }

  componentDidUpdate(prevProps) {
    let { postFoodItems, editFoodItems } = this.props;
    if (postFoodItems !== prevProps.postFoodItems) {
        let { success, error } = postFoodItems;
        if (success) {
          store.dispatch(addSuccessMessage({
            message: { variant: `success`, message: success.data.message || success.data.msg, title: `` }
          }))
          store.dispatch(fetchFooditems())
          this.props.history.push("/emenu/food-items")
        }
        else if (error) {
        }
    }
    if (editFoodItems !== prevProps.editFoodItems) {
      let { success, error } = editFoodItems;
      if (success) {
        store.dispatch(addSuccessMessage({
          message: { variant: `success`, message: success.data.message || success.data.msg, title: `` }
        }))
        store.dispatch(fetchFooditems())
        this.props.history.push("/emenu/food-items")
      }
      else if (error) {
      }
  }
  }

  render() {
    let { data, load, error, imagepaths} = { ...this.state }
    let { fetchFoodCategory } = this.props
    let inputs = [
      {
        name: "name",
        placeholder: "Item Name",
        type: "text",
        required: true,
        value: data.name,
      },
      {
        name: 'image',
        placeholder: "Image Upload",
        multiple: false,
        error: error.image,
        type: "file",
        required: this.id ? false : true,
        icon: "icon-cloud-upload",
        // disabled: this.id ? true : false,
        acceptable: "image/jpeg,image/gif,image/png,image/x-eps"
      },
      {
        name: "description",
        placeholder: "Description",
        type: "text",
        required: false,
        value: data.description,
      },
      {
        name: 'category',
        dropdown_name: 'category',
        placeholder: 'Category',
        value: data.category,
        error: error.category,
        dropdown_value: data.category,
        type: 'dropdown',
        required: true,
        // option:[
        //   { id:"module", name: "Entree" },
        //   { id:"open", name: "Bakery" },          
        //   { id:"market", name: "Dinner" },
        //   { id:"url", name: "Lunch" },
        // ]
        option: fetchFoodCategory.success ? fetchFoodCategory.success.data.length>0 ? 
        fetchFoodCategory.success.data.map(i => {
          return {id: i.name, name: i.name}
        }) : [{id: 0, name: "No Categories Found"}] : [{id: 0, name: "No Categories Found"}]
      },
      {
        name: "price",
        placeholder: "Price (AUD)",
        type: "number",
        required: false,
        value: data.price,
      },
    ]    
    
    return (
      <div>
        <DefaultForm
          title={this.id ? "Edit Food Item" : "New Food Item"}
          onChange={(e) => this.onChange(e)}
          onSubmit={(e) => {
            this.onSubmit(e)
          }}
          inputs={inputs}
          impaths = {imagepaths}
          onCancel={() => this.onCancel()}
          load= {load}
          onRemove = {(e) => this.removeImage(e)}
          buttonText={"Save"}
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
  let { postFoodItems, editFoodItems, fetchFoodItems, fetchFoodCategory } = state
  return {
    postFoodItems, editFoodItems, fetchFoodItems, fetchFoodCategory
  }
}

export default connect(mapStateToProps)(NewFoodItem)
