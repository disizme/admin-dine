import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Label, Row } from "reactstrap";
import BounceLoader from '../loaders/BounceLoader';

function DetailTable(props) {
  let { title, details, onCancel, onCustom, processing } = props

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
                  <div><i className={`fa fa-file pr-2`}></i>&nbsp;{title}</div>
                </CardHeader>
                <CardBody className="p-4">
                {details.map((i,index) => {
                  return <Row className="mb-3" key={index}>
                  <Col sm="3">
                    <Label htmlFor={i} className="label-right">{i.placeholder}</Label>
                  </Col>
                  <Col sm="9">{i.value} </Col>
                </Row>
                })}
                <div style={{ display: "flex", justifyContent: "space-between", float: 'right' }}>
                  <Button size='xs' className="btn-square brand-outline-btn mr-2" onClick={() => onCancel()} outline>Cancel</Button>
                  <Button size='xs' className="btn-square brand-btn mr-2" onClick={() => onCustom()}>Edit</Button>
                </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>}
    </div>
  )
}

export default DetailTable

