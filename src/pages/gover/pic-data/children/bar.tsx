import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { access_cloud_today_capture } from "@/services/access_cloud";

const Bar = (props) => {
  // const { title = "", data = [],legend=false } = props;
  const { data = [] } = props;
  var myData = [65, 78, 90, 85, 76, 83, 88,98,67,85,89];
  const area = ['工业园区','吴中区','姑苏区','虎丘区','吴江区','相城区','太仓市','张家港市','常熟市','昆山市','交警支队']
  const option = {
    tooltip: {
      show: false,
      formatter: (params) => {
        if(params) {
          return params.name + params.value
        }
      }
    },
    animation: false,
    grid: {
      top: "5%",
      left: "5%",
      right: "5%",
      bottom: "5%",
    },
    xAxis: {
      data: area,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#54DBFF",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#fff",
        fontSize: "12",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "#fff",
          fontSize: "12",
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: ['#051c3c']
          }
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '异常占比',
        type: "bar",
        barWidth: 100,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#4fd1f5",
              },
              {
                offset: 1,
                color: "#072243",
              },
            ]),
          },
        },
        data: myData,
        z: 10,
        zlevel: 0,
        label: {
          show: false,
          position: "top",
          fontSize: 16,
          color: "#FD7F0E",
        },
        tooltip: {
          formatter: '{a}: {b} {c}%',
          textStyle: {
            color: '#ccc'
          },
          backgroundColor: '#153351',
          show: true
        }
      },
      {
        // 分隔
        type: "pictorialBar",
        itemStyle: {
          normal: {
            color: "#021232",
          },
        },
        // symbolRepeat: "fixed",
        symbolRepeat: true,
        symbolMargin: 5,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [100, 5],
        symbolPosition: "start",
        symbolOffset: [0, -1],
        data: myData,
        width: 100,
        z: 0,
        zlevel: 1,
      },
      {
        name: "背景",
        type: "bar",
        barWidth: 100,
        barGap: "-100%",
        // xAxisIndex: 1,
        data: myData.map(item => 100),
        itemStyle: {
          normal: {
            color: '#051c3c'
          },
        },
        z: 0,
      },
      {
        // 分隔
        type: "pictorialBar",
        itemStyle: {
          normal: {
            color: "#021232",
          },
        },
        symbolRepeat: "fixed",
        symbolMargin: 5,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [100, 5],
        symbolPosition: "start",
        symbolOffset: [0, -1],
        data:  myData.map(item => 100),
        width: 100,
        z: 0,
        zlevel: 1,
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default Bar;
