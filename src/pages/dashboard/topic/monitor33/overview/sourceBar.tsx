import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const SourceBar = () => {
  const option = {
    tooltip: {},
    grid: {
      top: "4%",
      left: "10%",
      right: "10%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        show: false,
      },
    ],
    yAxis: [
      {
        data: ["登记入住", "一机一档", "人脸库", "人像基础库", "人像引擎"],
        show: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
          margin: 20,
        },
      },
    ],
    series: [
      {
        barWidth: 12,
        itemStyle: {
          normal: {
            barBorderRadius: [4, 4, 4, 4],
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#ffffff",
              },
              distance: 10
            },
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              [
                {
                  offset: 0,
                  color: "#215afe", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#5b9afe", // 100% 处的颜色
                },
              ],
              false
            ),
          },
        },
        type: "bar",
        data: [8960, 7518, 6716, 5812, 4265],
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

export default SourceBar;
