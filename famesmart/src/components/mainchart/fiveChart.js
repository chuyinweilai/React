import React, { PropTypes } from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Sector,
    Legend,
} from 'recharts'
const fivePieChart = ({
                          pieData,
                      }) => {
    const renderActiveShape = (propsR) => {
        const RADIAN = Math.PI / 180
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
            fill, percent, value, name } = propsR
        const sin = Math.sin(-RADIAN * midAngle)
        const cos = Math.cos(-RADIAN * midAngle)
        const sx = cx + (outerRadius + 10) * cos
        const sy = cy + (outerRadius + 10) * sin
        const mx = cx + (outerRadius + 30) * cos
        const my = cy + (outerRadius + 30) * sin
        const ex = mx + (cos >= 0 ? 1 : -1) * 22
        const ey = my
        const textAnchor = cos >= 0 ? 'start' : 'end'
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)
        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${name}：${value}起`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(占比：${(percent * 100).toFixed(0)}%)`}
                </text>
                <text x={x} y={y} fill="white" textAnchor={textAnchor} dominantBaseline="central" >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            </g>
        )
    }
    const colors = ['#CD5B45', '#D2691E', '#CAE1FF', '#BCEE68', '#BDB76B', '#00CD00']
    class Five extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                active: 0,
            }
        }
        onPieEnter = (data, index) => {
            this.setState({
                active: index,
            })
        }
        render () {
            return (
                <PieChart width={500} height={250} onMouseEnter={this.onPieEnter}>
                    <Legend verticalAlign="top" align="right" height={30} />
                    <Pie
                        activeIndex={0}
                        activeShape={renderActiveShape}
                        data={pieData}
                        cx={230}
                        cy={120}
                        outerRadius={80}
                        fill="#8884d8"
                    >
                        {
                            pieData.map((entry, index) => (
                                <Cell key={index} name={entry.alert_info} value={entry.count} fill={colors[index]} />
                            ))
                        }
                    </Pie>
                </PieChart>
            )
        }
    }
    return (
        <Five />
    )
}
fivePieChart.propTypes = {
    pieData: PropTypes.array,
}
// export default Form.create()(fivePieChart)
export default fivePieChart