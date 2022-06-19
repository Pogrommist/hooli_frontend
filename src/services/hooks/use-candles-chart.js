import { useState, useEffect } from 'react'
import { subDays } from 'date-fns'
import { axiosInstance } from '../../services/axios';


export const useCandlesChart = ({ activePair }) => {
  const [candles, setCandles] = useState([]);
  const [startDate, setStartDate] = useState(subDays(new Date(), 1));
  const [endDate, setEndDate] = useState(new Date());
  const [interval, setInterval] = useState('1h');
  const intervals = ['1d', '1h', '5m']
  const pickInterval = interval => setInterval(interval)
  const onDatepickerDateChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const getCandles = async () => {
    const response = await axiosInstance.get(`/binances/get_klines_for_period?pair_name=${activePair}&start_time=${startDate.getTime()}&end_time=${endDate.getTime()}&interval=${interval}`)
    return await setCandles(formatCandles(response.data))
  }

  useEffect(() => {
    if (startDate && endDate && interval && activePair) getCandles()
  }, [interval, activePair, startDate, endDate]);

  const formatCandles = data => {
    const candlesFormatted = []
    data.map(candle => {
      candlesFormatted.push({ name: new Date(candle[0]).toDateString(), val: (Number(candle[1]) - Number(candle[4])) })
    })
    return candlesFormatted
  }

  return {
    candles,
    startDate,
    endDate,
    interval,
    intervals,
    pickInterval,
    onDatepickerDateChange
  }
}