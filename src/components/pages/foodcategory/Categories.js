import React, { useState, useEffect } from 'react'
import connect from "react-redux/es/connect/connect";
import Tables from '../../shared/tables/Tables'
import store from '../../../Store'
import { addSuccessMessage } from "../../../actions/successMessage/success_message";
import { Card, CardBody } from "reactstrap";
import deleteFoodCategory, { deleteFoodCategoryReset } from '../../../actions/foodcategory/delete_food_category';
import fetchFoodCategory from '../../../actions/foodcategory/fetch_food_category';
import reorderFoodCategory from '../../../actions/foodcategory/reorder_food_category';
// import fetchFoodCategory from '../../../actions/rashifal/fetch_rashifal';
// import { deleteFoodCategory, deleteRashifalReset } from '../../../actions/rashifal/delete_rashifal';
// import fetchRashiAuthor from '../../../actions/rashiauthor/fetch_rashi_author';
// import TabPage from '../../shared/tables/TabPage';
// import { Inputs } from './bannerRoutes';
// import { Config } from '../../../Config';
// import FullPageModal from '../../shared/messages/FullPageModal';

const datajson = [
  {id: 3,
  name: "Lunch",
  detail: "Eat Eat"
},
{id: 4,
  name: "Breakfast",
  detail: "Eat Eat"
},
{id: 44,
  name: "Bakey",
  detail: "Eat Eat"
},
{id: 321,
  name: "Dinner",
  detail: "Eat Eat"
},
{id: 31,
  name: "Momo",
  detail: "Eat Eat"
}
]

const rows = [
  {
    name: "index",
    label: "SN",
    type: "index"
  },
  // {
  //   name: "id",
  //   label: "ID"
  // },
  {
    name: "name",
    label: "Name"
  },
  // {
  //   name: "detail",
  //   label: "Detail"
  // },
  {
    label: "Action",
    type: "action",
    align: "left",
    option: [
      // {
      //   type: "view",
      //   action: "onView",
      //   index: "id"
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
//     label: 'From Date',
//     key: 'created_at',
//     value: "",
//     default: false,
//     type: "date"
//   },
//   {
//     label: "Type",
//     key: "type",
//     value: "",
//     default: false,
//     type: "dropdown",
//     options: [
//           {id: "daily", name: "Daily"},
//           {id: "weekly", name: "Weekly"},
//           { id:"monthly", name: "Monthly"},
//           { id:"yearly", name: "Yearly" }
//     ]
//   },
//   {
//     label: "Publish",
//     key: "publish",
//     value: "",
//     default: false,
//     type: "dropdown",
//     options:[
//       { id:"Y", name: "Yes" },
//       { id:"N", name: "No" }
//     ]
//   }
// ]

// const fetchList = ["all","home", "rashifal", "home-down", "paramarsha"]

function Categories(props) {
  const [attributes, setAttributes] = useState({sort_field :"id", sort_by: "desc"})
  const [data, setData] = useState(datajson)
  const [meta, setMeta] = useState({})
  const [filters, setFilters] = useState([])
  const [tableRows, setTableRows] = useState(rows)
  const [creator, setCreator] = useState(true)
  // const [fetchList, setFetchList] = useState({"type": "dropdown", "value": ["all"]})


  // function onChangeFilter(e, name) {
  //   let { value } = e.target
  //   let _filters = [...filters]
  //   let index = _filters.findIndex(x => x.key === name)
  //   if (index > -1) {
  //     _filters[index]["value"] = value
  //   }
  //   setFilters(_filters)
  // }

  function fetch(_attributes) {
      // setAttributes(_attributes)
      // store.dispatch(fetchFoodCategory(_attributes))
  }

  function onEdit(id) {
    props.history.push(`/emenu/food-category/${id}/edit`)
  }
 
  function onDelete(id) {
    store.dispatch(deleteFoodCategory(id))
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
    let reorder = update.map(i => i.id)
    let reorderData = new FormData()
    reorderData.append(`order`,reorder)
    store.dispatch(reorderFoodCategory(reorderData, props.fetchFoodCategory.success))
    // setData(update)
    // setMeta({})
  }

  useEffect(() => {
    if(!props.fetchFoodCategory.success){
      store.dispatch(fetchFoodCategory())
    }
  }, [])


  useEffect(() => {
    let { success, error } = props.fetchFoodCategory;
    if (error) {
    } else if (success) {
      if (success.data) {
        // let x = { ...success.data }
        //   let { ...data } = x;
            setData(success.data.results)
          // setMeta(meta)
      }else{
        setData([])
        setMeta({})
      }
    }
  }, [props.fetchFoodCategory])

    useEffect(() => {
      let {success, error} = props.deleteFoodCategory;
      if (success) {
        store.dispatch(addSuccessMessage({
          message: {variant: `success`, message: success.data.msg || success.data.message || "Deleted successfully", title: ``}
        }))
        store.dispatch(deleteFoodCategoryReset())
        store.dispatch(fetchFoodCategory())
        // fetch(attributes)
      }
      else if (error) {
      }
    }, [props.deleteFoodCategory])

  return (<>
    {props.fetchFoodCategory.success ?
      <Tables
          title={"Food Categories"}
          data={data}
          rows={tableRows}
          hideNew={!creator}
          meta={meta}
          attributes={attributes}
          filters={filters}
          fetch={(e) => {}}
          draggable={true}
          onDragStart={(e,i) => onDragStart(e,i)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e,i) => onDrop(e,i)}
          onEdit={(e) => onEdit(e)}
          onDelete={(e) => onDelete(e)}
          message={`Sorry, There are no records of food categories.`}
          onNew={() => {
            props.history.push("/emenu/food-category/new")
          }}
          // onChangeFilter={onChangeFilter.bind(this)}
          // setFilters={setFilters.bind(this)}
        />
      :<Card>
        <CardBody className="text-center"><i className="fa fa-spin fa-spinner" /></CardBody>
      </Card>}
      </>
  )

}

function mapStateToProps(state) {
  let { fetchFoodCategory, deleteFoodCategory } = { ...state }
  return {
    fetchFoodCategory, deleteFoodCategory
  }
}

export default connect(mapStateToProps)(Categories)
