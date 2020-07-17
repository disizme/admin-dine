import React, { useState, useEffect } from 'react'
import connect from "react-redux/es/connect/connect";
import Tables from '../../shared/tables/Tables'
import store from '../../../Store'
import { addSuccessMessage } from "../../../actions/successMessage/success_message";
import { Card, CardBody } from "reactstrap";
import {deleteFooditems, deleteFooditemsReset } from '../../../actions/fooditems/delete_fooditem';
import {fetchFooditems} from '../../../actions/fooditems/fetch_fooditem';
import fetchFoodCategory from '../../../actions/foodcategory/fetch_food_category';

// import TabPage from '../../shared/tables/TabPage';
// import { Inputs } from './bannerRoutes';
// import { Config } from '../../../Config';
// import FullPageModal from '../../shared/messages/FullPageModal';

const datajson = [    {
  "id": 91023,
  "name": "Mo: Mo",
  "category": "Breakfast",
  "price": "100",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 123,
  "name": "Thukpa",
  "category": "Bakery",
  "price": "120",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 1,
  "name": "Chowmein",
  "category": "Bakery",
  "price": "120",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": "123" ,
  "name": "Thakali",
  "category": "Bakery",
  "price": "200",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 32,
  "name": "Tea",
  "category": "Lunch",
  "price": "40",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 11,
  "name": "Mo: Mo",
  "category": "Dinner",
  "price": "100",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 5,
  "name": "Thukpa",
  "category": "Breakfast",
  "price": "120",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 24,
  "name": "Chowmein",
  "category": "Breakfast",
  "price": "120",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 53,
  "name": "Thakali",
  "category": "Lunch",
  "price": "200",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 61,
  "name": "Tea",
  "category": "Lunch",
  "price": "40",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 14,
  "name": "Mo: Mo",
  "category": "Dinner",
  "price": "100",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 21,
  "name": "Thukpa",
  "category": 1,
  "price": "120",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 35,
  "name": "Chowmein",
  "category": "Dinner",
  "price": "120",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 3,
  "name": "Thakali",
  "category": "Dinner",
  "price": "200",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 67,
  "name": "Tea",
  "category": "Lunch",
  "price": "40",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 17,
  "name": "Mo: Mo",
  "category": "Lunch",
  "price": "100",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 29,
  "name": "Thukpa",
  "category": "Dinner",
  "price": "120",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 39,
  "name": "Chowmein",
  "category": "Dinner",
  "price": "120",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 54,
  "name": "Thakali",
  "category": 2,
  "price": "200",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
},
{
  "id": 60,
  "name": "Tea",
  "category": "Lunch",
  "price": "40",
  "food_img": "/img.jpg",
  "description": "loLaboris anim commodo non culpa sint ipsum enim nostrud fugiat laboris."
}
]

const rows = [
  {
    name: "id",
    label: "ID"
  },
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Category",
    name: "category",
    sortable: false,
    // type: 'variety',
    // option:[
    //     { id: 0, name: "All" },
    //     { id: 1, name: "Android" },
    //     { id: 2, name: 'iOS' }
    //   ]
  },
  {
    label: 'Image',
    name: 'image',
    type: 'image',
    // link: true,
    sortable: false,
  },
  {
    name: "price",
    label: "Price"
  },
  {
    label: "Action",
    type: "action",
    align: "left",
    option: [
      // {
      //   type: "view",
      //   action: "onView",
      //   index: "messageid"
      // },
      {
        type: 'edit',
        action: 'onEdit',
        index: 'id'
      },
      {
        type: 'delete',
        action: 'onDelete',
        index: 'id'
      },
    ]
  }
]

// const all_filters = [
//   {
//     label: 'Message',
//     key: 'message',
//     value: "",
//     default: false,
//     type: "text"
//   },
//   {
//     label: 'Create Date',
//     key: 'created_at',
//     value: "",
//     default: false,
//     type: "date"
//   },
//   {
//     label: "Platform",
//     key: "platform",
//     value: "",
//     default: false,
//     type: "dropdown",
//     options: [
//           {id: "1", name: "Android"},
//           {id: "2", name: "iOS"}
//     ]
//   },
//   {
//     label: "Enable",
//     key: "enable",
//     value: "",
//     default: false,
//     type: "dropdown",
//     options: [
//           {id: "Y", name: "Yes"},
//           {id: "N", name: "No"}
//     ]
//   },
//   {
//     label: "Aflag",
//     key: "aflag",
//     value: "",
//     default: false,
//     type: "dropdown",
//     options: [
//           {id: "1", name: "Yes"},
//           {id: "0", name: "No"}
//     ]
//   },
//   {
//     label: "Pin",
//     key: "pin",
//     value: "",
//     default: false,
//     type: "dropdown",
//     options: [
//           {id: "1", name: "Yes"},
//           {id: "0", name: "No"}
//     ]
//   },
//   {
//     label: "Status",
//     key: "status",
//     value: "",
//     default: false,
//     type: "dropdown",
//     options:[
//       { id:"Active", name: "Active" },
//       { id:"Expired", name: "Expired" }
//     ]
//   },
//   {
//     label: "Link Type",
//     key: "linktype",
//     value: "",
//     default: false,
//     type: "dropdown",
//     options:[
//       { id:"module", name: "Module" },
//       { id:"open", name: "Open" },          
//       { id:"market", name: "Market" },
//       { id:"url", name: "URL" },
//       { id:"blog", name: "Blog" },
//       { id: 'youtube', name: 'Youtube' },
//       { id: 'mail', name: 'Mail' },
//       { id: 'phone', name: 'Phone' },
//       { id: 'app', name: 'App' },
//       { id: 'reload', name: 'Reload' }
//     ]
//   }
// ]


const localFilter = {
  "type": "text", 
  "value": "", 
  "search": false,
  "multiple": true,
  "options": [
    {id: "title", name: "Title"}
  ]
}
// const fetchList = ["all","home", "rashifal", "home-down", "paramarsha"]

function FoodItems(props) {
  const [attributes, setAttributes] = useState({sort_field :"display_order", sort_by: "asc"})
  const [data, setData] = useState(datajson)
  const [meta, setMeta] = useState({})
  const [tableRows, setTableRows] = useState(rows)
  const [creator, setCreator] = useState(true)
  const [filters, setFilters] = useState([])
  // const [fetchList, setFetchList] = useState({"type": "dropdown", "value": ["all"]})
  const [fetchList, setFetchList] = useState(localFilter)
  const [fetchType, setFetchType] = useState("title")

  function onChangeFilter(e, name) {
    let { value } = e.target
    let _filters = [...filters]
    let index = _filters.findIndex(x => x.key === name)
    if (index > -1) {
      _filters[index]["value"] = value
    }
    setFilters(_filters)
  }

  function fetch(_attributes) {
      if(_attributes.filter && _attributes.filter.status){
        _attributes = { ...attributes, "limit": meta.total }
      }
      setAttributes(_attributes)
      // store.dispatch(fetchFoodItems(_attributes))
  }

  function onEdit(id) {
    props.history.push(`/emenu/food-items/${id}/edit`)
  }
 
  function onDelete(id) {
    // store.dispatch(deleteFooditems(id))
  }
  
  function onDragStart(e, i) {
    e.dataTransfer.setData('idx', i)
  }

  function onDragOver(e) {
    e.preventDefault()
  }

  function onDrop(e, i) {
    let idx = e.dataTransfer.getData('idx')
    let update = data
    let a = update[idx]
    update.splice(idx, 1)
    update.splice(i, 0, a)
    setData(update)
    setMeta({})
  }

  useEffect(() => {
    if(!props.fetchFoodItems.success){
      store.dispatch(fetchFooditems())
    }
    if(!props.fetchFoodCategory.success){
      store.dispatch(fetchFoodCategory())
    }
  }, [])

  
  useEffect(() => {
    let { success, error } = props.fetchFoodItems;
    if (error) {
    } else if (success) {
      if (success.data) {
        // let x = { ...success.data }
        // let { data } = x;
        setData(success.data.results)
        // setData(datajson)
        setMeta(meta)
      }else{
        setData([])
        setMeta({})
      }
    }
  }, [props.fetchFoodItems])

    useEffect(() => {
      let {success, error} = props.deleteFoodItems;
      if (success) {
        store.dispatch(addSuccessMessage({
          message: {variant: `success`, message: success.data.msg || success.data.message, title: ``}
        }))
        // store.dispatch(deleteFooditemsReset())
        // store.dispatch(fetchFooditems())
        // fetch(attributes)
      }
      else if (error) {
      }
    }, [props.deleteFoodItems])

  return (<>
    {props.fetchFoodItems.success ?
      <Tables
          title={"Food Items"}
          data={data}
          rows={tableRows}
          meta={meta}
          hideNew={!creator}
          attributes={attributes}
          filters={filters}
          fetch={(e) => fetch(e)}
          fetchList = {fetchList}
          currentFetch = {fetchType}
          onEdit={(e) => onEdit(e)}
          onDelete={(e) => onDelete(e)}
          draggable={true}
          onDragStart={(e,i) => onDragStart(e,i)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e,i) => onDrop(e,i)}
          // deleteTitle="Image"
          message={`Sorry, There are no records of food items.`}
          onNew={() => {
            props.history.push("/emenu/food-items/new")
          }}
          onChangeFilter={onChangeFilter.bind(this)}
          setFilters={setFilters.bind(this)}
        />
      :<Card>
        <CardBody className="text-center"><i className="fa fa-spin fa-spinner" /></CardBody>
      </Card>}
      </>
  )

}

function mapStateToProps(state) {
  let { fetchFoodItems, deleteFoodItems, fetchFoodCategory } = { ...state }
  return {
    fetchFoodItems, deleteFoodItems, fetchFoodCategory
  }
}

export default connect(mapStateToProps)(FoodItems)
