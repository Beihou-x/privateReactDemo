import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { isTemplateMiddle } from "typescript";
import { toNumber } from "lodash";

const StorageBar = props => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
    },
    grid: {
      borderWidth: 0,
      top: "5%",
      bottom: "85",
      textStyle: {
        color: "#fff",
      },
    },
    legend: {
      data: ["存储容量", "即将释放容量"],
      top: "4%",
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#525b68",
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisLabel: {
          interval: 0,
        },
        data: ["人脸", "人体", "车辆", "码"],
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#90979c",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
        },
        splitArea: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "存储容量",
        type: "bar",
        stack: "总量",
        barMaxWidth: 75,
        barGap: "10%",
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
            label: {
              show: true,
              textStyle: {
                color: "#fff",
              },
              position: "insideTop",
              formatter: function (p) {
                return p.value > 0 ? p.value : "";
              },
            },
          },
        },
        data: [198.66, 30.81, 151.95, 160.12],
      },

      {
        name: "即将释放容量",
        type: "bar",
        stack: "总量",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "rgba(0,191,183,1)",
              },
              {
                offset: 1,
                color: "#072243",
              },
            ]),
            barBorderRadius: 0,
            label: {
              textStyle: {
                color: "#fff",
              },
              show: true,
              position: "top",
              formatter: function (p) {
                return p.value > 0 ? p.value : "";
              },
            },
          },
        },
        data: [82.89, 67.54, 62.07, 59.43],
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

export default StorageBar;
