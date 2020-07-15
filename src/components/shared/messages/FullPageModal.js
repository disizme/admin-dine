import React from 'react';
import './full_page_modal.css'
import {Button, Card, CardBody, Form} from "reactstrap";
import {InputField} from "../Inputs/Input";
import BounceLoader from "../loaders/BounceLoader";

function FullPageModal(props) {
  let {title, onChange, onSubmit, inputs, onCancel, processing} = props
  inputs = inputs ? inputs : []
  return (
    <div className={`full_page_container`}>
      <div className="full_page_header">
        <div className="back_button">
          <button className="btn btn-lg back-btn" onClick={() => onCancel()}><span
            className="picto-font"><i className="icon-arrow-left"
                                      style={{fontSize: "15px", marginTop: "-5px", marginRight: "13px"}}/></span>
            <span className="back-btn-label bolder"> Back </span></button>
        </div>
        <h4>{!processing && (title || "")}</h4>
        <div className="add-ons">

        </div>
      </div>
      <div className="full_page_content" style={{height: "calc(100% - 112px", overflowY: "auto", marginTop: "56px"}}>
        <div className="container" style={{maxWidth: "1024px"}}>
          {processing ?
            <BounceLoader/> :
            <div className="animated fadeIn">
              <Card style={{margin: "15px 0"}}>
                <CardBody className="p-4">
                  <Form className='form-horizontal'>
                    {inputs.map((o, i) => {
                        if (!o.hide){
                          return <InputField key={i} input={o} onChange={e => onChange(e)}/>
                        }else return <></>
                      }
                    )}

                  </Form>
                </CardBody>
              </Card>
            </div>
          }
        </div>
      </div>
      <div className="full_page_footer">
        <div className="container"
             style={{maxWidth: "1024px", display: "flex", justifyContent: "flex-end", alignItem: "center"}}>
          {!processing &&
          <React.Fragment>
            <Button type='submit' color="primary" size='xs' className="btn-square"
                    onClick={() => onCancel()}
                    outline
                    style={{
                      marginRight: "6px",
                      borderRadius: "2px",
                      paddingLeft: "20px",
                      paddingRight: "24px",
                      cursor: "pointer",
                      lineHeight: "24px"
                    }}
            >Cancel</Button>
            < Button type='submit' color="primary" size='xs' className="btn-square"
                     onClick={() => onSubmit()}
                     style={{
                       marginRight: "6px",
                       borderRadius: "2px",
                       paddingLeft: "28px",
                       paddingRight: "28px",
                       cursor: "pointer",
                       lineHeight: "24px"
                     }}
            >Save</Button>
          </React.Fragment>
          }
        </div>
      </div>
    </div>
  )
    ;
}

export default FullPageModal
