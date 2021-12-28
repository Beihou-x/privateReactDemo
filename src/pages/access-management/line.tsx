import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Line = (props) => {
  const { data = [] } = props;


  const option = {
    title: {
      show: false,
      text: "",
      textStyle: {
        align: "center",
        color: "#fff",
        fontSize: 20,
      },
      top: "5%",
      left: "center",
    },
    legend: {
      show: false,
      icon: "rect",
      data: ["数据统计"],
      textStyle: {
        color: "#fff",
      },
      x: "right",
      right: 20,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 255, 233,0)",
              },
              {
                offset: 0.5,
                color: "rgba(255, 255, 255,1)",
              },
              {
                offset: 1,
                color: "rgba(0, 255, 233,0)",
              },
            ],
            global: false,
          },
        },
      },
    },
    grid: {
      top: "10%",
      left: "8%",
      right: "8%",
      bottom: "10%",
      // containLabel: true
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: true,
        },
        splitArea: {
          // show: true,
          color: "#fff",

          lineStyle: {
            color: "#1990ff",
          },
        },
        axisTick: {
          //坐标轴刻度相关设置。
          show: false,
        },
        axisLabel: {
          color: "#fff",
          fontSize: 14,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: data.map((item) => item.day ? item.day : item.hour),
      },
    ],

    yAxis: [
      {
        type: "value",
        min: 0,
        splitNumber: 5,
        splitLine: {
          show: false,
          lineStyle: {
            color: "rgba(255,255,255,0.1)",
          },
        },
        axisLine: {
          show: true,
          //   onZero: true,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          margin: 10,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "接入数据",
        type: "line",
        smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: "pin",
        symbolSize: 4,
        lineStyle: {
          normal: {
            color: "#1990ff",
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
          },
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#1990ff",
          },
          // formatter: "{c}%",
        },
        itemStyle: {
          color: "#1990ff",
          borderColor: "#fff",
          borderWidth: 1,
          shadowColor: "rgba(0, 0, 0, .3)",
          shadowBlur: 0,
        },
        tooltip: {
          show: false,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(67, 245, 254,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(67, 245, 254,0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(67, 245, 254, 0.9)",
            shadowBlur: 20,
          },
        },
        data: data.map((item) => item.total),
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

export default Line;
