import React, { useState, useEffect } from 'react'
import connect from "react-redux/es/connect/connect";
import Tables from '../../shared/tables/Tables'
import store from '../../../Store'
import { addSuccessMessage } from "../../../actions/successMessage/success_message";
import { Card, CardBody } from "reactstrap";
import { deleteCustomers, deleteCustomersReset } from '../../../actions/customers/delete_customers';
import {fetchCustomers} from '../../../actions/customers/fetch_customers';

// import TabPage from '../../shared/tables/TabPage';
// import { Inputs } from './bannerRoutes';
// import { Config } from '../../../Config';
// import FullPageModal from '../../shared/messages/FullPageModal';

const rows = [
  {
    label: "SN",
    type: "index",
    name: "index"
  },
  {
    label: 'Name',
    name: 'name',
    // sortable: true
  },
  {
    label: 'Email',
    name: 'email',
    // sortable: true
  },
  {
    label: "Contact",
    name: "phone_number"
  },
  {
    label: "Date",
    name: "check_in"
  },
  {
    label: "Time",
    name: "check_in_time"
  }
  // {
  //   label: "Action",
  //   type: "action",
  //   align: "left",
  //   option: [
  //     // {
  //     //   type: 'edit',
  //     //   action: 'onEdit',
  //     //   index: 'id'
  //     // },
  //     {
  //       type: 'delete',
  //       action: 'onDelete',
  //       index: 'id'
  //     },
  //   ]
  // }
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

function Customers(props) {
  // eslint-disable-next-line
  const [attributes, setAttributes] = useState({sort_field :"id", sort_by: "desc"})
  const [data, setData] = useState([])
  const [meta, setMeta] = useState({})
  // eslint-disable-next-line
  const [filters, setFilters] = useState([])
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

  // function fetch(_attributes) {
  //     setAttributes(_attributes)
  //     store.dispatch(fetchRashifal(_attributes))
  // }

  // function onEdit(id) {
  //   props.history.push(`/customers/${id}/edit`)
  // }
 
  function onDelete(id) {
    store.dispatch(deleteCustomers(id))
  }

  // function toggleGrid(e){
  //   console.log(e)
  //   setseeGrid(e)
  // }

  useEffect(() => {
    if(!props.fetchCustomers.success){
      store.dispatch(fetchCustomers())
    }
  }, [])

  useEffect(() => {
    let { success, error } = props.fetchCustomers;
    if (error) {
      // if (error.response) {
      //   if (error.response.status === 422) {
      //     store.dispatch(addSuccessMessage({
      //       message: { variant: `success`, message: "Validation Error", title: `` }
      //     }))
      //   } else {
      //   }
      // }
    } else if (success) {
      if (success.data.length) {
        // let x = { ...success.data }
        //   let { data, ...meta } = x;
          let x = success.data.map(i => {
            let t = i.check_in_time ? i.check_in_time.substring(0,5) : ""
            i.check_in_time = t
            // let d = i.check_in
            // i.checked_in_at = t + " " + d
            return i
          })
          setData(success.data)
          setMeta({})
      }else{
        setData([])
        setMeta({})
      }
    }
  }, [props.fetchCustomers])

    useEffect(() => {
      let {success, error} = props.deleteCustomers;
      if (success) {
        store.dispatch(addSuccessMessage({
          message: {variant: `success`, message: success.data.msg || success.data.message, title: ``}
        }))
        store.dispatch(deleteCustomersReset())
        store.dispatch(fetchCustomers())
        // fetch(attributes)
      }
      else if (error) {
      }
    }, [props.deleteCustomers])

  return (<>
    {props.fetchCustomers.success ?
      <Tables
          title={"Your Customers"}
          data={data}
          rows={rows}
          meta={meta}
          attributes={attributes}
          filters={filters}
          fetch={(e) => fetch(e)}
          // onEdit={(e) => onEdit(e)}
          onDelete={(e) => onDelete(e)}
          hideNew={true}
          message={`Sorry, There are no records of customers currently.`}
          // onNew={() => {
          //   props.history.push("/customers/new")
          // }}
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
  let { fetchCustomers, deleteCustomers } = { ...state }
  return {
    fetchCustomers, deleteCustomers
  }
}

export default connect(mapStateToProps)(Customers)
