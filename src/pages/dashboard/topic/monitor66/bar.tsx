import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Bar = () => {
  const option = {
    tooltip: {},
    grid: {
      top: "10%",
      left: "25%",
      right: "20%",
      bottom: "0%",
      // containLabel: true,
    },
    xAxis: [
      {
        show: false,
      },
    ],

    yAxis: [
      {
        data: [
          "百度(人员档案)",
          "商汤(人员档案)",
          "依图(人员档案)",
          "车辆档案",
        ],
        show: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
          margin: 10,
        },
      },
    ],
    series: [
      {
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: [10, 10, 10, 10],
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#56E8F2",
              },
              formatter: "{c}%",
              distance: 5,
            },
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              [
                {
                  offset: 0,
                  color: "#84F5DE", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#2390FF", // 100% 处的颜色
                },
              ],
              false
            ),
          },
        },
        type: "bar",
        data: [98.9, 96.8, 88, 99.6],
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
