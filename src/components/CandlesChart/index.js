import React, { forwardRef } from 'react'
import { XAxis, YAxis, Tooltip, Bar, BarChart, Cell } from 'recharts';
import DatePicker from 'react-datepicker'
import { useCandlesChart } from '../../services/hooks/use-candles-chart';
import './style.scss'

import "react-datepicker/dist/react-datepicker.css";

const CandlesBarChart = ({ candles }) => {
  return (
    <BarChart width={400} height={150} data={candles}>
    <Bar type="monotone" dataKey="val">
      {
        candles.map((entry, index) => <Cell key={index} fill={entry.val >= 0 ? 'green' : 'red' } />)
      }
    </Bar>
    <XAxis dataKey="name" />
    <YAxis dataKey="val" />
    <Tooltip />
  </BarChart>
  )
}

const DatepickerInput = forwardRef(({ value, onClick }, ref) => (
  <button className="chart-candles-datepicker__button" onClick={onClick} ref={ref}>
    {value}
  </button>
));

const CandlesChart = (activePair) => {
  const { candles, startDate, endDate, interval, intervals, onDatepickerDateChange, pickInterval } = useCandlesChart(activePair)

  return (
    <div className="chart-candles">
      <div className="chart-candles-actions">
        <div className="chart-candles-actions-intervals">
          <span>Interval: </span>
        { intervals.map((intervalValue, index) => {
          return (<span 
            onClick={() => pickInterval(intervalValue)} 
            className={`chart-candles-actions-intervals__interval ${interval === intervalValue ? 'chart-candles-actions-intervals__interval--active' : ''}`}
            key={index}
            >{intervalValue}</span>)
        })}
        </div>
        <DatePicker 
            selected={startDate}
            onChange={onDatepickerDateChange}
            startDate={startDate}
            endDate={endDate}
            customInput={<DatepickerInput />}
            selectsRange
            wrapperClassName="chart-candles-datepicker"
        />
      </div>
      <CandlesBarChart candles={candles} />
    </div>
    )
}

export default CandlesChart