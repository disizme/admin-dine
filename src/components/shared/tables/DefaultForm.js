import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from "reactstrap";
import { InputField } from "../Inputs/Input";
import BounceLoader from '../loaders/BounceLoader';


function AddedField(props){
  let {options, updateOption, optionalField} = props
  let fields =[]
  for(let i=0; i<options; i++){
    let val = optionalField[`option${i+1}`]
    let value = {key: val.name, val: val.value}
    fields.push(
      <InputField key={i} name={`option${i+1}`} onChange={e => updateOption(e)} value={value}/>
    )
  }
  return fields
}

function DefaultForm(props) {
  let { title, onChange, onSubmit, inputs, onCancel, customDiv, processing, buttonText, updateOption, load, options, optionalField, addOpt, onRemove, impaths, customButton } = props
  const toSubmit = (e,key) => {
    e.preventDefault()
    onSubmit(key)
  }
  let showInputs = inputs.filter(i => !i.customShow)
  return (
    <div>
      {processing ? <BounceLoader /> :
        <div className="animated fadeIn">
          <Row className="app align-items-center" style={{ minHeight: props.showFull ? '0vh' : "100vh"}}>
            <Col xs='12'>
              <Card>
                <CardHeader style={{
                  display: "flex", justifyContent: "space-between", flexGrow: "1", alignItems: "center",
                  padding: "0.55rem 1.25rem"
                }}>
                  <div>
                    <i className={`fa fa-pen pr-2`}></i>
                    &nbsp;{title}</div>
                </CardHeader>
                <CardBody className="p-4">
                  <Form className='form-horizontal'>
                    {showInputs.map((o, i) =>
                      <InputField key={i} input={o} onChange={e => onChange(e)} impaths={impaths} onRemove={(e) => onRemove(e)} />
                    )}
                    { options !== undefined
                      && <><div className=" text-right ">
                    <button className="btn btn-default btn-link mr-2" type="button" onClick={() => addOpt()} >Add Option</button>
                    </div><hr />
                    <AddedField options={options} updateOption={updateOption} optionalField={optionalField} /></>}
                    <div style={{ display: "flex", justifyContent: "space-between", float: 'right' }}>
                      {!props.removeCancel && <Button size='xs' className="btn-square brand-outline-btn mr-2" 
                        onClick={() => onCancel()} outline>Cancel</Button>}
 
                      <Button type='submit' size='xs' className="btn-square brand-btn pull-right" onClick={(e) => toSubmit(e)}>
                      {load ? <i className='fa fa-spinner fa-spin' /> : buttonText}
                    </Button>
                    </div>
                  </Form>
                  <div className="mt-5">
                    {customDiv}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>}
    </div>
  )
}

export default DefaultForm

