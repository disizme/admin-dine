import React from 'react';
import './tab_page_modal.css'
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

function TabPage(props) {
  let id = props.match.params.id
  let path = props.match.path
  let {children} = props

  function goto(pathname) {
    let words = pathname.split(":id")
    if (words.length === 2)
      props.history.push(words[0] + id + words[1])
    else
      props.history.push(pathname)
  }

  return (
<Card className="px-2">
  <br/>
            <Nav tabs className="justify-content-center">
            {props.inputs.map((i,index) => {
          return <NavItem key={index}>
            <NavLink onClick={(e) => goto(i.path)}
                     active={!i.params ? path === i.path : i.pathparam === props.match.params[i.params]}>
              {i.name}
              {/* <div className='bottomborder'></div> */}
            </NavLink>
          </NavItem>
        })}
            </Nav>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  )
    ;
}

export default TabPage
