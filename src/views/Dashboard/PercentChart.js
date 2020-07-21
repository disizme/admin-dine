import React, { useState, useEffect } from 'react'
import store from '../../Store'
import fetchPercentile from '../../actions/data_visual/fetch_percentile'
import connect from "react-redux/es/connect/connect";
import { Card, CardBody, Row, Col, CardTitle } from 'reactstrap';
import { Line, Pie } from 'react-chartjs-2';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandInfo = getStyle('--success')

var pie = {
  labels: [
    'Red',
    'Blue'
  ],
  datasets: [
    {
      data: [],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
      ],
    }],
};


function PercentChart(props){
    const [data, setData] = useState([])
    
    useEffect(() => {
        if (!props.fetchPercentile.success) {
            store.dispatch((fetchPercentile()))
        }
    }, [])

  

  useEffect(() => {
    let { success, error } = props.fetchPercentile;
    if (error) {
    } else if (success) {
      if (success.data) {
          pie.datasets[0].data= [success.data.inc_per, 100-success.data.inc_per]
          setData(success.data)
      }else{
        setData([])
      }
    }
  }, [props.fetchPercentile])

  return <>
  {props.fetchPercentile.success ?
  <Card>
  <CardBody>
    <Row>
      <Col sm="7">
        <CardTitle className="mb-0">Percent Increase</CardTitle>
        {/* <div className="small text-muted">2020</div> */}
      </Col>
    </Row>
    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
      <Pie data={pie} height={200}/>
    </div>
  </CardBody>
</Card>
  : ""}
  </>

}

function mapStateToProps(state) {
    let { fetchPercentile } = { ...state }
    return {
      fetchPercentile
    }
  }
  
  export default connect(mapStateToProps)(PercentChart)