import React, { useState, forwardRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import Select from "react-select";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Header from '../../components/shared/Header';
import FormInput from '../../components/shared/BaseForm/FormInput';
import ActiveIcon from '../../assets/images/icons/home/active_icon.svg'
import ChartIcon  from '../../assets/images/icons/home/carbon_chart_icon.svg'
import EditIcon  from '../../assets/images/icons/home/edit_icon.svg'
import SearchIcon  from '../../assets/images/icons/home/search_icon.svg'
import CandlesChart from '../../components/CandlesChart';
import './style.scss'

const data = [{name: '1', btc: -400, eth: -2400, usdt: -2400}, {name: '2', btc: 600, eth: 2600, usdt: 3400}, {name: '3', btc: 800, eth: 2800, usdt: 4400}];


export default function Homepage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { control, handleSubmit: onSubmitPair } = useForm()
  const [pairs, setPairs] = useState([])
  const [activePair, setActivePair] = useState(null);

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

  const formatPairs = pairs => {
    const pairsFormatted = []
    pairs.map(pair => pairsFormatted.push({value: `${pair.baseAsset}${pair.quoteAsset}`, label: `${pair.baseAsset} - ${pair.quoteAsset}`}))
    return setPairs(pairsFormatted)
  }

  const handlePairSearch = pair => axios.get(`http://localhost:3000/binances/get_pairs_by_token?pair_name=${pair.pair_name}`).then(res => formatPairs(res.data))

  const handlePairSelect = pair => setActivePair(pair.value)

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
              pairs.length > 0 && <CandlesChart activePair={activePair} />
            }
          </div>
      </div>
    </div>
    </>
  )
}