import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from 'antd';
// import response from './data.json'

const LineChart = (props) => {

  const { dates = [], checks = [] } = props
  /**
    * 折线图的配置对象
    */

  const area = '市局'

  const getOption = () => {
    return {
      tooltip: {},
      legend: {
        data: ['成绩'],
        textStyle: {
          color: '#fff'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        data: dates,
        axisLabel: { interval: 0, rotate: 30 },
      },
      yAxis: {},
      series: [{
        name: '成绩',
        type: 'line',
        data: checks
      }]
    };
  }

  // 定义onEvents  click事件
  const onEvents = {
    'click': (params) => {
      console.log('====', params);
    },
  };



  return (
    <div>
      <div className='chart-title'>
        <span className='area'>{area}</span> <span>近一月考核情况</span>
      </div>
      <Card>
        <ReactEcharts option={getOption()} onEvents={onEvents} />
      </Card>
    </div>


  )
}

export default LineChart