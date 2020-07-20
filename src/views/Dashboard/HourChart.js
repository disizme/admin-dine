import React, { useState, useEffect } from 'react'
import store from '../../Store'
import fetchHourCount from '../../actions/data_visual/fetch_hourcount'
import connect from "react-redux/es/connect/connect";
import { Card, CardBody, Row, Col, CardTitle } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandInfo = getStyle('--info')

var mainChart = {
  labels: [],
  datasets: [
    {
      label: "Hourly Count",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: [],
    }
  ]
};


function HourChart(props){
    const [data, setData] = useState([])
    
    useEffect(() => {
        if (!props.fetchHourCount.success) {
            store.dispatch((fetchHourCount()))
        }
    }, [])

  

  useEffect(() => {
    let { success, error } = props.fetchHourCount;
    if (error) {
    } else if (success) {
      if (success.data) {
        mainChart.labels = success.data.labels
        mainChart.datasets[0].data= success.data.data
        setData(success.data)
      }else{
        setData([])
      }
    }
  }, [props.fetchHourCount])

  return <>
  {props.fetchHourCount.success ? 
  <Card>
  <CardBody>
    <Row>
      <Col sm="7">
        <CardTitle className="mb-0">Hourly Count</CardTitle>
        {/* <div className="small text-muted">2020</div> */}
      </Col>
    </Row>
    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
      <Line data={mainChart} options={props.option} height={300} />
    </div>
  </CardBody>
</Card>
  : ""}
  </>

}

function mapStateToProps(state) {
    let { fetchHourCount } = { ...state }
    return {
      fetchHourCount
    }
  }
  
  export default connect(mapStateToProps)(HourChart)