import React from "react"

import "./bounce_loader_style.css"

function BounceLoader(props) {
  let {margin} = props
  margin = margin || "100px"
  return (
    <div className="spinner" style={{marginTop:margin}}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  )
}

export default BounceLoader
