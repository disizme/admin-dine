import React from 'react';
// import {Dropdown, DropdownMenu} from "reactstrap";

function TableButton(props) {
  let {value, onClick, style, icon, name} = props
  return (
    <div>
      <a href="/" className="table-button" onClick={(e) => {
        e.preventDefault()
        onClick(name)}} style={style}>
        {value}
        {icon && <span style={(icon && value) && {marginLeft: "10px"}}><i className={icon}/></span>}
      </a>
      <i className="fa fa-times-circle" style={{position: "absolute", top: "-2px", right: "2px"}} onClick={() => {onClick(name,null,"abc")}}/>
    </div>
  )
}

export default TableButton;
