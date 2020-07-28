import React, { useState, useEffect } from 'react'
import connect from "react-redux/es/connect/connect";
import Tables from '../../shared/tables/Tables'
import store from '../../../Store'
import { addSuccessMessage } from "../../../actions/successMessage/success_message";
import { Card, CardBody } from "reactstrap";
import { deleteCustomers, deleteCustomersReset } from '../../../actions/customers/delete_customers';
import {fetchCustomers} from '../../../actions/customers/fetch_customers';
import fetchAllUsers from '../../../actions/superadmin/fetch_users';
import { Config } from '../../../Config';

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
    label: 'City',
    name: 'city'
  },
  {
    label: 'Address',
    name: 'address',
    // sortable: true
  },
  {
    label: "Postal",
    name: "postal"
  },
  {
    label: "Image",
    name: "image",
    type: "image"
  },
  {
    label: "Menu",
    name: "menu",
    link: true
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

const all_filters = [
  {
    label: 'Date',
    key: 'date',
    value: "",
    default: false,
    type: "date"
  }
]

// const fetchList = ["all","home", "rashifal", "home-down", "paramarsha"]

function AllUsers(props) {
  // eslint-disable-next-line
  const [attributes, setAttributes] = useState({sort_field :"id", sort_by: "desc"})
  const [data, setData] = useState([])
  const [meta, setMeta] = useState({})
  // eslint-disable-next-line
  const [filters, setFilters] = useState([])
  // const [fetchList, setFetchList] = useState({"type": "dropdown", "value": ["all"]})


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
    setAttributes(_attributes)
    store.dispatch(fetchAllUsers(_attributes))
  }

  // function onEdit(id) {
  //   props.history.push(`/customers/${id}/edit`)
  // }
 
  // function onDelete(id) {
  //   store.dispatch(deleteCustomers(id))
  // }

  // function toggleGrid(e){
  //   console.log(e)
  //   setseeGrid(e)
  // }

  useEffect(() => {
    if(!props.fetchAllUsers.success){
      store.dispatch(fetchAllUsers())
    }
  }, [])

  useEffect(() => {
    let { success, error } = props.fetchAllUsers;
    if (error) {

    } else if (success) {
      if (success.data) {
        let { results, ...meta } = success.data;
          let x = results.map(i => {
            i["image"] = i.photo ? Config.urlbase+i.photo : null
            i["menu"] = i.slug ? Config.qr_url+"/"+i.slug+"/menu" : null
            return i
          })
          setData(x)
          setMeta(meta)
      }else{
        setData([])
        setMeta({})
      }
    }
  }, [props.fetchAllUsers])

    // useEffect(() => {
    //   let {success, error} = props.deleteCustomers;
    //   if (success) {
    //     store.dispatch(addSuccessMessage({
    //       message: {variant: `success`, message: success.data.msg || success.data.message, title: ``}
    //     }))
    //     store.dispatch(deleteCustomersReset())
    //     store.dispatch(fetchCustomers())
    //     // fetch(attributes)
    //   }
    //   else if (error) {
    //   }
    // }, [props.deleteCustomers])

  return (<>
    {props.fetchAllUsers.success ?
      <Tables
          title={"Dinemate Users"}
          data={data}
          rows={rows}
          meta={meta}
          attributes={attributes}
          filters={filters}
          fetch={(e) => fetch(e)}
          // onEdit={(e) => onEdit(e)}
          // onDelete={(e) => onDelete(e)}
          hideNew={true}
          message={`Sorry, There are no records of users currently.`}
          // onNew={() => {
          //   props.history.push("/customers/new")
          // }}
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
  let { fetchAllUsers } = { ...state }
  return {
    fetchAllUsers
  }
}

export default connect(mapStateToProps)(AllUsers)
