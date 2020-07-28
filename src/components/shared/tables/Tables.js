import React, { useState, useEffect , useRef} from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label, Modal, ModalBody, ModalFooter, ModalHeader,
  Pagination, 
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from 'reactstrap'
import lozad from "lozad"
import TableButton from "./TableButton";
// import { Link, NavLink } from "react-router-dom";
import { Config } from '../../../Config';
import fallbackImg from '../../../assets/img/imgplace.png';

function Tables(props) {
  const { observe } = lozad();
// eslint-disable-next-line
  let { data, message, hideNew, draggable, title, rows, meta, attributes,fetchList, showGridOption, updateFetch,currentFetch, fetch, loading, filters, onChangeFilter, setFilters, onNew, onEdit, onDelete, onView, onLink, onSend, onPrint, contentDownload, downloadData, downloadError, setDownloadData, getDownload, grid, toggleGrid, deleteTitle, customAction } = props
  let { to, from, total, count } = meta
  let [downloadOpen, setDownloadOpen] = useState(0)
  let [filterOpen, setFilterOpen] = useState(0)
  let [limitOpen, setLimitOpen] = useState(0)
  let [deleteModal, setDeleteModal] = useState(false)
  let [viewModal, setViewModal] = useState(false)
  let [deleteItem, setDeleteItem] = useState("")
  let [viewItem, setViewItem] = useState("")
  let [viewItemField, setViewField] = useState("")
  let [innerData, setInnerData] = useState({})
  let [downloadInnerData, setDownloadInnerData] = useState({})
  let [showFilterDropdown, setShowFilterDropdown] = useState({})
  const firstRender = useRef(true);
  let showClear = false

  useEffect(() => {
    observe();
  }, [props.data]);

  for (var i = 0; i < filters.length; i++) {
    if (filters[i].value && filters.length>1) {
      showClear = true;
      break;
    }
  }

  function changePage(p) {
    let _attributes = attributes
    _attributes["page"] = p
    fetch(_attributes)
  }

  function limitChange(limit) {
    let _attributes = attributes
    _attributes["page"] = 1
    _attributes["limit"] = limit
    setLimitOpen(!limitOpen);
    fetch(_attributes)
  }

  function sort(_name) {
    let _attributes = attributes
    let { sort_by } = attributes
    if (sort_by && sort_by === "desc") {
      sort_by = "asc"
    } else {
      sort_by = "desc"
    }
    _attributes["sort_field"] = _name
    _attributes["sort_by"] = sort_by
    _attributes["page"] = 1
    fetch(_attributes)
  }

  // function toggleModals(id){
  //   setDeleteItem(id)
  //   setViewModal(!viewModal)
  //   setDeleteModal(!deleteModal)
  // }

  function toggleDeleteModal(id) {
    if(id !== undefined){
      setDeleteItem(id)
    }else { setDeleteItem("")}
    setDeleteModal(!deleteModal)
  }

  function toggleViewModal(id, tag) {
    if(id !== undefined){
      setViewItem(id)
    }else { setViewItem("")}
    if(tag !== undefined){
      setViewField(tag)
    }else { setViewField("")}
    setViewModal(!viewModal)
  }

  // function switchImage(n){
  //   let len = data.length
  //   let newItem = viewItem+n
  //   if( newItem === len){
  //     setViewItem(0)
  //   }else if( newItem < 0){
  //     setViewItem(len-1)
  //   }else{
  //     setViewItem(newItem)
  //   }
  // }

  function deleteAction() {
    onDelete(deleteItem)
    setDeleteModal(!deleteModal)
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    let filter = {}
    let _filters = [...filters]
    _filters.map((item, i) => {
      if (item.value) {
        filter[item.key] = item.value
      }
      return item
    })
    let _attributes = attributes
    _attributes["filter"] = filter
    // _attributes["page"] = 1
    fetch(_attributes)
  }, [props.filters])

  useEffect(() => {
    if (filterOpen) {
      let _innerdata = {}
      let _filters = [...filters]
      _filters.map((o, i) => {
        if (o.value || o.value === 0) {
          _innerdata[o.key] = o.value
        }
        return o
      })
      setInnerData(_innerdata)
    }
  }, [filterOpen])

  function toggleShowFilterOption(_name, e, flag) {
    let _showFilterDropdown = { ...showFilterDropdown }
    if (flag) {
      let _filters = [...filters]
      let index = _filters.findIndex(x => x.key === _name)
      if (index > -1) {
        _filters[index]["value"] = ""
        setFilters(_filters)
      }
    }
    else if (e && e.target) {
      onChangeFilter(e, _name)
    } else if (e) {
      let _filters = [...filters]
      let index = _filters.findIndex(x => x.key === _name)
      if (index > -1) {
        _filters[index]["value"] = e
        setFilters(_filters)
      }
    }

    _showFilterDropdown[_name] = !_showFilterDropdown[_name]
    if (_showFilterDropdown[_name] === true) {
      let _innerdata = {}
      let _filters = [...filters]
      _filters.map((o, i) => {
        if (o.value || o.value === 0) {
          _innerdata[o.key] = o.value
        }
        return o
      })
      setInnerData(_innerdata)
    }
    setShowFilterDropdown(_showFilterDropdown)
  }

  function applyFilters() {
    let _filters = [...filters]
    let _innerdata = { ...innerData }
    _filters.map((o, i) => {
      if (_innerdata[o.key] || _innerdata[o.key] === 0 || _innerdata[o.key] === "") {
        o["value"] = _innerdata[o.key]
      }
      return o
    })
    setFilters(_filters)
    setFilterOpen(!filterOpen)
    setShowFilterDropdown({})
  }

  function downloadContent() {
    let _downloadData = [...downloadData]
    let _downloadInnerData = { ...downloadInnerData }
    _downloadData.map((o, i) => {
      if (_downloadInnerData[o.key] || _downloadInnerData[o.key] === 0 || _downloadInnerData[o.key] === "") {
        o["value"] = _downloadInnerData[o.key]
      }
      return o
    })
    setDownloadData(_downloadData)
    getDownload()
  }

  function onClear(e) {
    e.preventDefault()
    let _filters = [...filters]
    _filters.map((item) => {
      item["value"] = ""
      return item
    })
    setFilters(_filters)
    setInnerData({})
  }

  function onChange(e) {
    let { name, value } = e.target
    let _innerData = { ...innerData }
    _innerData[name] = value
    setInnerData(_innerData)
  }
  function onDownloadChange(e) {
    let { name, value } = e.target
    let _downloadInnerData = { ...downloadInnerData }
    _downloadInnerData[name] = value
    setDownloadInnerData(_downloadInnerData)
    console.log(_downloadInnerData)
  }

  function onKeyPress(e) {
    if (e.key === "Enter") {
      applyFilters()
    }
  }

  // function onDeleteEvent() {
  //   console.log("deleted")
  // }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          {loading ?
            <div className="bar_progress" style={{ zIndex: 1400 }}>
              <div className="indeterminate"></div>
            </div> :
            <div style={{ height: "2px" }}></div>
          }
          <Card style={!title ? { border: "0px solid transparent", marginTop: "-2px" } : { marginTop: "-2px" }}>

            {title && <CardHeader>
              <div><i className="fa fa-align-justify"></i> {title}
                {hideNew ? null : <Button size="sm" className="float-right brand-btn" onClick={() => onNew()}
                  style={{ boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.15)" }}>&nbsp;<i
                    className="fa fa-plus" /> &nbsp;Add New&nbsp;</Button>}
                {!props.goBack ? null : <Button size="sm" className="float-right" onClick={() => props.onBack()}
                  style={{ boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.15)" }}>&nbsp;<i
                    className="fa fa-arrow-left" /> &nbsp;Go Back&nbsp;</Button>}
              </div>
            </CardHeader>
            }
            <CardBody style={!title ? { padding: "0" } : {}}>
               <div className="row filter-bar mb-2 mx-0">
                {showGridOption && <div className="btn-group mx-2 mb-1">
                  <button className={`btn btn-default ${!grid ? 'brand-btn' : 'brand-outline-btn'}`} onClick={() =>toggleGrid(false)}>
                    <i className="fa fa-list" />
                  </button>
                  <button className={`btn btn-default ${grid ? 'brand-btn' : 'brand-outline-btn'}`} onClick={() => toggleGrid(true)}>
                    <i className="fa fa-th-large" />
                  </button>
                </div>}
                {fetchList && fetchList.type ?
                  fetchList.type === "dropdown" ? <div>
                  <Input type="select" name="type" placeholder="Select Type" value={currentFetch}
                    onChange={(e) => updateFetch(e.target.value)}>
                    {
                      fetchList.value.map((x, y) => {
                        return (
                          <option value={x} key={y}>{x}</option>
                        )
                      })
                    }
                  </Input>
                </div>
                : <div className="d-inline-flex mb-2">
                  {fetchList.multiple && <Input type="select" name="type" placeholder="Select Type" 
                    value={currentFetch} className="form-control w-50 px-1 mr-2"
                    onChange={(e) => updateFetch("dropdown",e.target.value, )}>
                    {
                      fetchList.options.map((x, y) => {
                        return (
                          <option value={x.id} key={y}>{x.name}</option>
                        )
                      })
                    }
                  </Input>}
                  <Input type="text" name="search" placeholder="Search" value={fetchList.value} 
                    autoComplete="off"
                    className="w-50"
                    onChange={(e) => updateFetch("value",e.target.value)}
                    onKeyPress={e => {
                      if(e.key === "Enter"){ updateFetch("search") }
                      }} />
                  <Button size="sm" className="mx-2 brand-btn" onClick={() => updateFetch("search")}
                  >Search</Button>
                </div>
                : <></>
                }

                {filters.length>0 && <div className="filters">
                  {/********** Dropdown filter starts *********/}
                  <Dropdown isOpen={!!filterOpen}
                    toggle={() => {
                      setFilterOpen(!filterOpen)
                    }}
                  >
                    <DropdownToggle
                      tag="span"
                      onClick={() => {
                        setFilterOpen(!filterOpen)
                      }}
                      data-toggle="dropdown"
                      aria-expanded={filterOpen}
                    >
                      <div className="add-filter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                          className="table_filter_icon">
                          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                        </svg>
                        <span>Add filter</span>
                      </div>
                    </DropdownToggle>
                    <DropdownMenu style={{ width: "320px", padding: "8px" }}>
                      {filters && filters.map((o, i) => {
                        if (o.type === "dropdown") {
                          return (
                            <FormGroup row style={{ marginBottom: "0.3rem", marginTop: "0.3rem" }} key={o.label}>
                              <Col md="4">
                                <Label htmlFor="select">{o.label}</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="select" name={o.key} placeholder={o.label} value={innerData[o.key]}
                                  onChange={(e) => onChange(e, o.key)}>
                                  <option value="">All</option>
                                  {
                                    o.options && o.options.map((x, y) => {
                                      return (
                                        <option value={x.id} key={y}>{x.name}</option>
                                      )
                                    })
                                  }
                                </Input>
                              </Col>
                            </FormGroup>
                          )
                        }
                        else if (o.type === "date") {
                          return (
                            <FormGroup row style={{ marginBottom: "0.3rem", marginTop: "0.3rem" }}  key={o.label}>
                              <Col md="4">
                                <Label htmlFor="text-input">{o.label}</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="date" name={o.key} placeholder={o.label} value={innerData[o.key]}
                                  onChange={(e) => onChange(e, o.key)}
                                  onKeyPress={e => onKeyPress(e)} />
                              </Col>
                            </FormGroup>
                          )
                        }
                        else {
                          return (
                            <FormGroup row style={{ marginBottom: "0.3rem", marginTop: "0.3rem" }}  key={o.label}>
                              <Col md="4">
                                <Label htmlFor="text-input">{o.label}</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type={o.type ? o.type : "text"} name={o.key} placeholder={o.label} value={innerData[o.key]}
                                  onChange={(e) => onChange(e, o.key)} autoComplete="off"
                                  onKeyPress={e => onKeyPress(e)} />
                              </Col>
                            </FormGroup>
                          )
                        }
                      })}
                      <FormGroup row style={{ marginBottom: "0.3rem", marginTop: "1rem" }}  key={"cancel"}>
                        <Col xs="12">
                          <Button type="reset" size="sm" color="default" onClick={() => setFilterOpen(!filterOpen)}><i
                            className="fa fa-ban"></i> Cancel</Button>
                          <Button type="submit" size="sm" className="brand-btn"
                            onClick={() => applyFilters()}
                            style={{ marginRight: "4px", float: "right" }}><i
                              className="fa fa-dot-circle-o"></i> Apply Filter</Button>
                        </Col>
                      </FormGroup>
                    </DropdownMenu>
                  </Dropdown>
                  {/********** Dropdown filter ends *********/}
                  {/********** Filter list starts *********/}
                  <div className="filter-items">
                    {filters && filters.map((o, i) => {
                      if (o.value || o.default) {
                        if (o.type === "dropdown") {
                          return (<span key={o.label}><FilterDropDown  thiskey={i}
                            showFilterDropdown={showFilterDropdown}
                            onChangeFilter={(e) => onChangeFilter(e, o.key)}
                            toggleShowFilterOption={toggleShowFilterOption}
                            name={o.key}
                            label={o.label}
                            value={o.value}
                            options={o.options}
                          /></span>)
                        }else if (o.type === "text") {
                          return (<span key={o.label}><FilterInput  thiskey={i}
                            showFilterDropdown={showFilterDropdown}
                            onChange={e => onChange(e, o.key)}
                            toggleShowFilterOption={toggleShowFilterOption}
                            name={o.key}
                            label={o.label}
                            value={o.value}
                            innerData={innerData}
                          /></span>)
                        }else if (o.type === "date") {
                          return (<span key={o.label}><FilterInput  thiskey={i}
                            showFilterDropdown={showFilterDropdown}
                            onChange={e => onChange(e,o.key)}
                            toggleShowFilterOption={toggleShowFilterOption}
                            name={o.key}
                            label={o.label}
                            value={o.value}
                            type="date"
                            innerData={innerData}
                          /></span>)
                        }else if(o.type === "number"){
                          return (<span key={o.label}><FilterInput  thiskey={i}
                            showFilterDropdown={showFilterDropdown}
                            onChange={e => onChange(e,o.key)}
                            toggleShowFilterOption={toggleShowFilterOption}
                            name={o.key}
                            label={o.label}
                            value={o.value}
                            type="number"
                            innerData={innerData}
                          /></span>)
                        }else{
                          return <></>}
                      }else{
                       return <div key={`null-${i}`}></div>}
                    })}
                  </div>
                  {showClear &&
                  <a className="clear_all" href="/#" onClick={(e) => onClear(e)}>
                    <i className="fa fa-undo"/>
                    Clear
                  </a>
                  }
                  {/********** Filter list ends *********/}
                </div>}

                {/********** Pagination starts *********/}
                {meta.hasOwnProperty("count") && 
                <div className="paginations ml-auto" style={{ marginBottom: "5px" }}>
                  {(to - from + 1) <= count &&
                    <div className="dataTables_info" style={{ display: "flex", paddingLeft: "18px" }}>
                      <Dropdown isOpen={!!limitOpen}
                        // toggle={() => {
                        //   setLimitOpen(!limitOpen)
                        // }}
                      >
                        <DropdownToggle
                          tag="span"
                          // onClick={() => {
                          //   setLimitOpen(!limitOpen)
                          // }}
                          data-toggle="dropdown"
                          aria-expanded={limitOpen}
                          // style={{ cursor: "pointer" }}
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{from}-{to}&nbsp;
                      </DropdownToggle>
                        {/* <DropdownMenu
                          style={{ maxWidth: "fit-content", minWidth: "fit-content", left: "-18px", cursor: "pointer" }}>
                          <div className="dropdown-item"
                            style={{ width: "fit-content", marginRight: "0px" }}
                            onClick={() => {
                              limitChange("10")
                            }}>10
                        </div>
                          <div className="dropdown-item"
                            style={{ width: "fit-content", marginRight: "0px" }}
                            onClick={() => {
                              limitChange("20")
                            }}>20
                        </div>
                          <div className="dropdown-item"
                            style={{ width: "fit-content", marginRight: "0px" }}
                            onClick={() => {
                              limitChange("30")
                            }}>30
                        </div>
                          <div className="dropdown-item"
                            style={{ width: "fit-content", marginRight: "0px" }}
                            onClick={() => {
                              limitChange("50")
                            }}>50
                        </div>
                        </DropdownMenu> */}
                      </Dropdown>
                      <span>
                        of {count}
                      </span>
                    </div>
                  }

                  <Pagination style={{ marginBottom: "0px" }}>
                    <PaginationItem disabled={meta.current_page === 1} onClick={() => {
                      if (meta.current_page !== 1) changePage(meta.current_page - 1)
                    }}><PaginationLink className="brand-outline-btn"
                      previous tag="button"><i className="fa fa-chevron-left" /></PaginationLink></PaginationItem>
                    <PaginationItem disabled={meta.current_page === meta.last_page} onClick={() => {
                      if (meta.current_page !== meta.last_page) changePage(meta.current_page + 1)
                    }}><PaginationLink className="brand-outline-btn"
                      next tag="button"><i className="fa fa-chevron-right" /> </PaginationLink></PaginationItem>
                  </Pagination>

                  {/********** Pagination ends *********/}
                  {/********** Download Dropdown filter starts *********/}
                  {contentDownload && <div>
                    <Dropdown isOpen={!!downloadOpen}
                      toggle={() => {
                        setDownloadOpen(!downloadOpen)
                      }}
                    >
                      <DropdownToggle
                        tag="span"
                        className='page-link'
                        onClick={() => {
                          setDownloadOpen(!downloadOpen)
                        }}
                        data-toggle="dropdown"
                        aria-expanded={downloadOpen}
                        style={{ cursor: "pointer", margin: '0 0 0 5px', borderRadius: '0.25rem', color: '#23282c' }}
                      >
                        <i className='fa fa-download' />
                      </DropdownToggle>
                      <DropdownMenu style={{ width: "320px", padding: "8px" }}>
                        <p>Get Transaction List</p>
                        {downloadData && downloadData.map(o => {
                          if (o.type === "dropdown") {
                            return (
                              <FormGroup row style={{ marginBottom: "0.3rem", marginTop: "0.3rem" }}>
                                <Col md="4">
                                  <Label htmlFor="select">{o.label}</Label>
                                </Col>
                                <Col xs="12" md="8">
                                  <Input type="select" name={o.key} placeholder={o.label} value={downloadInnerData[o.key]}
                                    invalid={downloadError[o.key]}
                                    onChange={(e) => onDownloadChange(e, o.key)}>
                                    <option value="">All</option>
                                    {
                                      o.options && o.options.map((x, y) => {
                                        return (
                                          <option value={x.id}>{x.name}</option>
                                        )
                                      })
                                    }
                                  </Input>
                                </Col>
                              </FormGroup>
                            )
                          } else {
                            return <FormGroup row key={o.label} style={{ marginBottom: "0.3rem", marginTop: "0.3rem" }}>
                              <Col md="4">
                                <Label htmlFor="date-input">{o.label}</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="date" name={o.key} placeholder={o.label} value={downloadInnerData[o.key]}
                                  invalid={downloadError[o.key]}
                                  onChange={(e) => onDownloadChange(e, o.key)} />
                              </Col>
                            </FormGroup>
                          }
                        })}
                        <FormGroup row style={{ marginBottom: "0.3rem", marginTop: "1rem" }}>
                          <Col xs="12">
                            <Button type="submit" size="sm" color="primary"
                              onClick={() => downloadContent()}
                              style={{ marginRight: "4px", float: "right" }}><i
                                className="fa fa-download" />&nbsp;Download</Button>
                          </Col>
                        </FormGroup>
                      </DropdownMenu>
                    </Dropdown>
                  </div>}
                  {/********** Download Dropdown filter ends *********/}
                </div>}
              </div>
              {data.length ? 
                !grid ? <Table responsive striped>
                <thead>
                  <tr className="text-muted" style={{ fontWeight: "500" }}>
                    {rows.map((o, i) => (
                      <th style={{ textAlign: o.align ? o.align : "", minWidth: o.width ? o.width : "" }} key={i}>
                        {o['sortable'] ? (
                          <span onClick={() => sort(o['name'])} className="table_sortable_column"
                            style={(attributes['sort_field'] && attributes['sort_field'] === o.name) ? { color: "#23282c" } : {}}
                          >
                            {attributes['sort_field'] === o.name && <i
                              className={attributes['sort_by'] === "desc" ? "fa fa-arrow-up" : "fa fa-arrow-up rotate"} />}
                            {attributes['sort_field'] === o.name && "  "}
                            {o.label}
                          </span>
                        ) : (
                            <span>{o.label}</span>
                          )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((o, i) => (
                    <tr key={i} draggable={!!draggable} style={{cursor: draggable ? "move" : ""}}
                    onDragStart={e => props.onDragStart(e, i)}
                    onDragOver={e => props.onDragOver(e)}
                    onDrop={e => props.onDrop(e, i)}>
                      {
                        rows.map(p => {
                          if(p.type === "index"){
                            return <td key={i+"-index"}>
                              {from ? from+i: i+1}
                            </td>
                          } else if (p.type === "action") {
                            return <td style={p.align && { textAlign: p.align }} key={i+"-action"}>
                              {p.option && p.option.map((x, y) => {
                                if (x.type && x.type === "edit") {
                                  return (
                                    <Button size="sm"  color="warning" key={y} className="mr-1 mb-1"
                                      title={(customAction && o[customAction.name] === customAction.value) ? "Duplicate" : "Edit"} 
                                      onClick={() => {
                                        onEdit(o[x.index])
                                      }}><i
                                        className={`icon-${(customAction && o[customAction.name] === customAction.value) ? "docs" : "pencil"}`} /></Button>
                                  )
                                }
                                else if (x.type && x.type === "delete") {
                                  return ((customAction && o[customAction.name] === customAction.value) ? 
                                    <div key={y}></div> :
                                    <Button size="sm"  color="danger" key={y} title="Delete" className="mr-1 mb-1"
                                      onClick={() => {
                                        toggleDeleteModal(o[x.index])
                                      }}><i
                                        className="icon-trash" /></Button>
                                  )
                                }
                                else if (x.type && x.type === "print" && !o.hide_print) {
                                  return (
                                    <Button size="sm"  color="success"  key={y} title="Print" className="mr-1 mb-1"
                                      onClick={(e) => {
                                        onPrint(o[x.index])
                                      }}><i
                                        className="icon-printer" /></Button>
                                  )
                                }else if (x.type && x.type === "view") {
                                  return (
                                    <Button size="sm"  color="primary"  key={y} title="View"  className="mr-1 mb-1"
                                      onClick={() => {
                                        toggleViewModal(o[x.index], x.index)
                                      }}><i
                                        className="icon-eye" /></Button>
                                  )
                                }else if (x.type && x.type === "send") {
                                  return (
                                    <Button size="sm"  color="success" key={y} className="mr-1 mb-1"
                                      title={x.title} 
                                      onClick={() => {
                                        onSend(o[x.index])
                                      }}><i
                                        className={`icon-paper-plane`} /></Button>
                                  )
                                }
                                return <Button size="sm"  color="primary"  key={y} title={x.title} className="mr-1 mb-1"
                                onClick={(e) => {
                                  props[x.action](o[x.index])
                                }}><i
                                  className={`icon-${x.icon}`} /></Button>
                              })
                              }
                            </td>}
                          else if (p.type === "image") {
                            // eslint-disable-next-line
                            let value = getValue(o, p.name)
                            let thisImage = o[p.name]
                            
                            return <td key={i+p.name} >
                              {/* <img data-src={value} className={"lozad "+p.class} onClick={() => {
                                        toggleViewModal(i, p.name) 
                                      }}  onError={(e) => {
                                        e.target.onerror = null 
                                        e.target.src = fallbackImg}} /> */}
                                {thisImage ? <a href="/#"  style={{ textDecoration: "underline", color: "#3366BB"}}
                                  onClick={(e) => {
                                        e.preventDefault()
                                        toggleViewModal(i, p.name) 
                                      }}>Open Image</a> : ""}
                            </td>
                          } else if (p.type === "status") {
                            let value = getValue(o, p.name)
                            if (value === 1) {
                              return <td style={p.align && { textAlign: p.align }} key={i+"-status"} >
                                <Badge className="mr-1" color="success" pill>Active</Badge>
                              </td>
                            } else {
                              return <td style={p.align && { textAlign: p.align }}  key={i+"-type"} >
                                <Badge className="mr-1" color="secondary" pill>Inactive</Badge>
                              </td>
                            }
                          }
                          else if (p.type === "variety") {
                            let value = o[p.name]
                            let showValue = p.option.find(i => i.id === value)
                              return <td style={p.align && { textAlign: p.align }}  key={p.name+i+"-variety"} >
                                  {showValue ? showValue.name : value}
                                </td>
                            }
                          else if (p.type === "badge") {
                            let value = getValue(o, p.name)
                            if (p.option) {
                              if (p.option[o[p.name]]) {
                                return <td style={p.align && { textAlign: p.align }}  key={i+"-badge"} >
                                  <Badge className="mr-1" color={p.option[o[p.name]]} pill>{value}</Badge>
                                </td>
                              }
                              else
                                return <td style={p.align && { textAlign: p.align }} key={"align-null"}>
                                  -
                              </td>
                            }
                          }
                          if (p.type === "gender") {
                            let value = getValue(o, p.name)
                            if (value === 'male') {
                              return <td style={p.align && { textAlign: p.align }} key={i+"-male"} >
                                <i className="cui-user" />
                              </td>
                            } else {
                              return <td style={p.align && { textAlign: p.align }}  key={i+"-fem"} >
                                <i className="cui-user-female" />
                              </td>
                            }
                          }
                          else
                            return <td style={p.align && { textAlign: p.align }} key={i+"-"+p.name} >
                              <span>
                                {
                                  (p.link) ?
                                    <a style={{ textDecoration: "underline", color: "#3366BB", cursor: "pointer" }}
                                      href={o[p.name]} target="_blank" rel="noopener noreferrer">
                                      {o[p.name] ? p.name === "image" ? "Open Image" : "Open Link" : null}
                                    
                                    </a> :
                                    getValue(o, p.name)
                                }
                              </span>
                            </td>
                        })
                      }
                    </tr>
                  ))}
                </tbody>
              </Table> : <div className="mt-1">
                {data.map((i, index) => {
                  return <div className="img-grid" key={index}>
                    <img src={`${i.image}`} alt={`foto-${index}`} className="lozad"
                      onClick={() => {
                        toggleViewModal(index,"image")
                      }} 
                      onError={(e) => {
                        e.target.onerror = null 
                        e.target.src = fallbackImg}}/>
                  </div>
                })}
              </div>
              : <div className="text-center my-5">
                <i className="msg-icon mx-2 icon-info"/>
                {message}
                </div>}
            </CardBody>
          </Card>
        </Col>
      </Row>
      {deleteModal &&
      <Modal isOpen={deleteModal} toggle={() => toggleDeleteModal()}>
        <ModalHeader>Delete {deleteTitle}</ModalHeader>
        <ModalBody className="text-center">
        <div className="text-left mb-2">
          Are you sure you want to Delete?
          </div>
          {/* {title === "Notification History" && <div className="text-left mx-2">
            Notification Title : <b>{data.find(i=>{ return i.id === deleteItem}).msg_title}</b>
            </div>} */}
          {"image" in data[0] && <div className="img-grid" >
          <img src={`${data.find(i=>{ return i.id === deleteItem}).image}`} 
             alt="del-img" 
           onError={(e) => {
            e.target.onerror = null 
            e.target.src = fallbackImg}}/>
          </div>}
        </ModalBody>
        <ModalFooter>
          <Button className="brand-btn" onClick={() => deleteAction()}>Yes</Button>{' '}
          <Button className="brand-outline-btn" onClick={() => toggleDeleteModal()}>Cancel</Button>
        </ModalFooter>
      </Modal>}
      {viewModal &&
      <Modal isOpen={viewModal} toggle={() => toggleViewModal()} 
        className={(viewItemField && viewItemField.includes("image")) ? "image-modal" : ""}>
        {(viewItemField && viewItemField.includes("image")) ? <>
        {/* <ModalHeader>Delete {deleteTitle}</ModalHeader> */}
        {/* <ModalBody> */}
        {/* <div className="left-arrow" onClick={() => switchImage(-1)}>
          <i className="fa fa-chevron-left" />
        </div>
        <div className="right-arrow" onClick={() => switchImage(1)}>
          <i className="fa fa-chevron-right" />
        </div> */}
        <div className="close-btn" onClick={() => toggleViewModal()}><i className="fa fa-times" /></div>
        <img className="w-100 mb-2" 
        src={`${viewItemField.includes(".") ? data[viewItem][viewItemField.split(".")[0]][viewItemField.split(".")[1]] : data[viewItem][viewItemField]}`} 
          alt={`img-${viewItem}`}
         onError={(e) => {
          e.target.onerror = null 
          e.target.src = fallbackImg}} />
        <Row className="px-3 img-dex">
          <Col>
          {/* <Button className="brand-btn float-right" onClick={() => toggleModals(data[viewItem].id)}>Delete</Button> */}
              <h5>{data[viewItem].title}</h5>
              <p>{data[viewItem].description}</p>
              {data[viewItem].banner_type && <><strong>Banner </strong>: {data[viewItem].banner_type}<br/></>}
              {data[viewItem].created_at && <><strong>Created At </strong>: {data[viewItem].created_at}<br/></>}
              </Col>
        </Row>
        {/* </ModalBody> */}</>
        : <>
        <ModalHeader>Details</ModalHeader>
        <ModalBody>
          <ShowObj data={data} item={viewItem} field={viewItemField} />
        </ModalBody>
        <ModalFooter>
          <Button className="brand-outline-btn" onClick={() => toggleViewModal()}>Close</Button>
        </ModalFooter>
        </>}
      </Modal>}
    </div>

  );
}

function ShowObj(props){
  let {data, item, field} = props
  let obj = data.find(i => {
    if(field === "id") return i.id === item
    else return i[field] === item
    })
  let k = Object.keys(obj).map(function(i,index){
    let show = <div className="row mb-1 mx-2" key={index}>
      <div className="col-3">{i}</div>
      <div className="col-9" style={{wordBreak: "break-all"}}>{obj[i]}</div>
    </div>
    return show
  })
  return k
}

function getValue(object, key) {
  if (key && object) {
    if (key === "image") {
      return Config.BaseUrl + "/" + object.path
    } else if (key.includes(".")) {
      let arr = key.split(".")
      let value = object
      for (let i = 0; i < arr.length; i++) {
        value = value[arr[i]]
        if (!value) return ""
      }
      return value
    } else {
      return object[key]
    }
  } else {
    return ""
  }
}

function FilterDropDown(props) {
  // eslint-disable-next-line
  let { showFilterDropdown, toggleShowFilterOption, name, label, value, onChangeFilter, options, thiskey } = props
  let showValue = options.find(i => i.id.toString() === value.toString())
  let displayValue = showValue ? showValue.name : value
  return (
    <div key={thiskey}>
    <Dropdown isOpen={showFilterDropdown[name]}
      toggle={() => {
        toggleShowFilterOption(name)
      }} key={thiskey}
    >
      <DropdownToggle
        tag="span"
        onClick={() => {
          toggleShowFilterOption(name)
        }}
        data-toggle="dropdown"
        aria-expanded={showFilterDropdown[name]}
      >
        <TableButton
          value={(value || value === 0) ? `${label} : ${displayValue}` : `All ${label}`}
          icon="icon-arrow-down"
          onClick={() => {
          }}
        />
      </DropdownToggle>
      <DropdownMenu style={{top: "100%"}}>
        <li className="dropdown-item" value="" onClick={(e) => toggleShowFilterOption(name, e)}>All
        </li>
        {options.map((o, i) => (
          <li className="dropdown-item" value={o.id} key={`${o.id}-${i}`} onClick={(e) => toggleShowFilterOption(name, o.id)}>{o.name}
          </li>
        ))}
      </DropdownMenu>
    </Dropdown>
    </div>
  )
}

function FilterInput(props) {
  let { showFilterDropdown, toggleShowFilterOption, label, name, value, onChange, thiskey, innerData, type } = props
  return (
    <div key={thiskey}>
      <Dropdown isOpen={showFilterDropdown[name]}
        toggle={() => {
          toggleShowFilterOption(name)
        }}
      >
        <DropdownToggle
          tag="span"
          onClick={() => {
            toggleShowFilterOption(name)
          }}
          data-toggle="dropdown"
          aria-expanded={showFilterDropdown[name]}
        >
          <TableButton
            value={`${label} : ${value}`}
            icon="icon-arrow-down"
            name={name}
            onClick={toggleShowFilterOption.bind(this)}
          />
        </DropdownToggle>
        <DropdownMenu style={{top: "100%"}}>
          <Input type={type ? type : "text"}
            placeholder={label}
            name={name}
            value={innerData[name] ? innerData[name] : null}
            onChange={(e) => onChange(e, name)}
            onKeyPress={e => {
              if (e.key.toLowerCase() === "enter") {
                toggleShowFilterOption(name, e)
              }
            }}
          />
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Tables;



