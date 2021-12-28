import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const RankBar = () => {
  const xData = ["百度引擎", "依图引擎", "商汤引擎", "车辆引擎"];
  const yData = [88, 98, 76, 52];
  const option = {
    grid: {
      top: "20%",
      left: "-5%",
      bottom: "10%",
      right: "5%",
      containLabel: true,
    },
    tooltip: {
      show: true,
    },
    animation: false,
    xAxis: [
      {
        type: "category",
        data: xData,
        axisTick: {
          alignWithLabel: true,
        },
        nameTextStyle: {
          color: "#5BFCF4",
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#5BFCF4",
          },
        },
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
          margin: 25,
        },
      },
    ],
    yAxis: [
      {
        show: false,
        type: "value",
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#5BFCF4",
          },
        },
        axisLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "",
        type: "pictorialBar",
        symbolSize: [40, 10],
        symbolOffset: [0, -6],
        symbolPosition: "end",
        z: 12,
        // "barWidth": "0",
        label: {
          normal: {
            show: true,
            position: "top",
            formatter: "{c}%",
            fontSize: 12,
            fontWeight: "bold",
            color: "#5BFCF4",
          },
        },
        color: "#5BFCF4",
        data: yData,
      },
      {
        name: "",
        type: "pictorialBar",
        symbolSize: [40, 10],
        symbolOffset: [0, 7],
        // "barWidth": "20",
        z: 12,
        color: "#5BFCF4",
        data: yData,
      },
      {
        name: "",
        type: "pictorialBar",
        symbolSize: [50, 15],
        symbolOffset: [0, 12],
        z: 10,
        itemStyle: {
          normal: {
            color: "transparent",
            borderColor: "#5BFCF4",
            borderType: "solid",
            borderWidth: 10,
          },
        },
        data: yData,
      },
      {
        name: "",
        type: "pictorialBar",
        symbolSize: [70, 20],
        symbolOffset: [0, 18],
        z: 10,
        itemStyle: {
          normal: {
            color: "transparent",
            borderColor: "#5BFCF4",
            borderType: "solid",
            borderWidth: 4,
          },
        },
        data: yData,
      },
      {
        type: "bar",
        //silent: true,
        barWidth: "40",
        barGap: "10%", // Make series be overlap
        barCateGoryGap: "10%",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#0B3147",
              },
              {
                offset: 1,
                color: "#5BFCF4",
              },
            ]),
            opacity: 0.5,
          },
        },
        data: yData,
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

export default RankBar;
