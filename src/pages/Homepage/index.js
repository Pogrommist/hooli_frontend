import React from 'react'
import Header from '../../components/shared/Header';
import ActiveIcon from '../../assets/images/icons/home/active_icon.svg'
import ChartIcon  from '../../assets/images/icons/home/carbon_chart_icon.svg'
import EditIcon  from '../../assets/images/icons/home/edit_icon.svg'
import ChartImage  from '../../assets/images/icons/home/chart_1.svg'
import ChartImage2  from '../../assets/images/icons/home/chart_2.svg'
import './style.scss'

export default function Homepage() {
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
          </div>
        </div>
        <div className="homepage-charts">
            <img src={ChartImage} alt="chart" />
            <img src={ChartImage2} alt="chart" />
          </div>
      </div>
    </div>
    </>
  )
}