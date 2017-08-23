import React, { PropTypes } from 'react'
import Container from './../chart/Container'
import * as d3 from 'd3-shape'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const twoChart = ({
   pieData,

}) => {
  const cardinal = d3.curveCardinal.tension(0.2)

  return (
    <Container>
      <AreaChart data={pieData} width={600} height={300} margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" align="right" height={30} />
        <Area type="monotone" dataKey="已处理" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        <Area type={cardinal} dataKey="未处理" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
      </AreaChart>
    </Container>
  )
}
twoChart.propTypes = {
  pieData: PropTypes.array,

}

export default twoChart

