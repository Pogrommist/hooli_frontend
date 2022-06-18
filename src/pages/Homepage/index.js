import React, { useState, useEffect, forwardRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import Select from "react-select";
import { subDays } from 'date-fns'
import DatePicker from 'react-datepicker'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart, Cell } from 'recharts';
import Header from '../../components/shared/Header';
import FormInput from '../../components/shared/BaseForm/FormInput';
import ActiveIcon from '../../assets/images/icons/home/active_icon.svg'
import ChartIcon  from '../../assets/images/icons/home/carbon_chart_icon.svg'
import EditIcon  from '../../assets/images/icons/home/edit_icon.svg'
import SearchIcon  from '../../assets/images/icons/home/search_icon.svg'
import "react-datepicker/dist/react-datepicker.css";
import './style.scss'

const data = [{name: '1', btc: -400, eth: -2400, usdt: -2400}, {name: '2', btc: 600, eth: 2600, usdt: 3400}, {name: '3', btc: 800, eth: 2800, usdt: 4400}];


export default function Homepage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { control, handleSubmit: onSubmitPair } = useForm()
  const [pairs, setPairs] = useState([])
  const [candles, setCandles] = useState([]);
  const [activePair, setActivePair] = useState(null);
  const [startDate, setStartDate] = useState(subDays(new Date(), 1));
  const [endDate, setEndDate] = useState(new Date());
  const [interval, setInterval] = useState('1h');
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="homepage-charts__candles-datepicker__button" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const intervals = ['1d', '1h', '5m']
  const pickInterval = interval => setInterval(interval)

  useEffect(() => {
    // todo: review why there are two requests has been made when select pair from dropdown
    if (startDate !== null && endDate !== null) handlePairSelect({ value: activePair })
  }, [interval, activePair, startDate, endDate]);


  const renderLineChart = (
    <LineChart width={400} height={150} data={data}>
      <Line type="monotone" dataKey="btc" stroke="green" />
      <Line type="monotone" dataKey="eth" stroke="red" />
      <Line type="monotone" dataKey="usdt" stroke="blue" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
  const renderBarChart = (
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
  
  const formatCandles = data => {
    const candlesFormatted = []
    data.map(candle => {
      candlesFormatted.push({ name: new Date(candle[0]).toDateString(), val: (Number(candle[1]) - Number(candle[4])) })
    })
    return candlesFormatted
  }

  const formatPairs = pairs => {
    const pairsFormatted = []
    pairs.map(pair => pairsFormatted.push({value: `${pair.baseAsset}${pair.quoteAsset}`, label: `${pair.baseAsset} - ${pair.quoteAsset}`}))
    return setPairs(pairsFormatted)
  }

  const handlePairSearch = pair => axios.get(`http://localhost:3000/binances/get_pairs_by_token?pair_name=${pair.pair_name}`).then(res => formatPairs(res.data))

  const handlePairSelect = pair => {
    setActivePair(pair.value)
    if (activePair === null) return
    return axios.get(`http://localhost:3000/binances/get_klines_for_period?pair_name=${activePair}&start_time=${startDate.getTime()}&end_time=${endDate.getTime()}&interval=${interval}`)
      .then(res => setCandles(formatCandles(res.data)))
  }

  return (
    <>
    <Header />
    <div className="homepage">
      <div className="homepage-container">
        <div className="homepage-strategies-block">
          <p className="homepage-strategies-block__status"><img src={ActiveIcon} alt="active strategy" /> Running</p>
          <div className="homepage-strategies-block-actions">
            <p>Current strategy:</p>
            <p className="homepage-strategies-block-actions__name">my-strategy #1</p>
            <img src={ChartIcon} alt="strategy chart" className="homepage-strategies-block-actions__button" />
            <img src={EditIcon} alt="edit strategy" className="homepage-strategies-block-actions__button" />
            <div className="search-form-wrapper">
              <form onSubmit={handleSubmit(handlePairSearch)} className="search-form">
                <FormInput register={register} name="pair_name" hasError={errors.pair_name} required className="search-form__input" />
                <button className="search-form__button"><img src={SearchIcon} type="submit" /></button>
              </form>
              {pairs.length > 0 && (
                  <form onSubmit={onSubmitPair(handlePairSelect)} className="search-form-pairs">
                    <Controller
                      name="pair"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="search-form-pairs-dropdown"
                          classNamePrefix="dropdown"
                          options={pairs}
                          onChange={handlePairSelect}
                          defaultMenuIsOpen
                          isSearchable={false}
                          components={{
                            IndicatorSeparator: () => null
                          }}
                          
                        />
                      )}
                    />
                  </form>
                )}
            </div>

          </div>
        </div>
        <div className="homepage-charts">
            { renderLineChart}
            {
              pairs.length > 0 && (
                <div className="homepage-charts__candles">

                <div className="homepage-charts-actions">
                  <div className="homepage-charts-actions-intervals">
                    <span>Interval: </span>
                  { intervals.map((intervalValue, index) => {
                    return (<span 
                      onClick={() => pickInterval(intervalValue)} 
                      className={`homepage-charts-actions-intervals__interval ${interval === intervalValue ? 'homepage-charts-actions-intervals__interval--active' : ''}`}
                      key={index}
                      >{intervalValue}</span>)
                  })}
                  </div>
        
                <DatePicker 
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<ExampleCustomInput />}
                    selectsRange
                    wrapperClassName="homepage-charts__candles-datepicker"
                />
                </div>

                { renderBarChart}
                </div>
              )
            }
          </div>
      </div>
    </div>
    </>
  )
}