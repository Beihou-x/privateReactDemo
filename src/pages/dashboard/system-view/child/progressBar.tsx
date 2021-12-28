import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const ProgressBar = (props) => {
  // const { list = []} = props;
  const list = [
    {
      name: '前端延迟率',
      value: 23
    },
    {
      name: '时钟延迟率',
      value: 12
    }
  ]
  let yName = list.map((item) => item.name);
  let xData = list.map((item) => item.value);

  const option = {
    xAxis: {
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    grid: {
      containLabel: true,
      left: 30,
      top: 10,
      right: 100,
      bottom: 50,
    },
    yAxis: [
      {
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14,
            color: "#fff",
          },
        },
        data: yName,
      },
    ],
    series: [
      {
        //内
        type: "bar",
        barWidth: 18,
        legendHoverLink: false,
        symbolRepeat: true,
        silent: true,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#00abee", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#62E6F6", // 100% 处的颜色
              },
            ],
          },
        },
        data: list,
        z: 1,
        animationEasing: "elasticOut",
      },
      {
        // 背景
        type: "pictorialBar",
        animationDuration: 0,
        symbolRepeat: "fixed",
        symbolMargin: "20%",
        symbol: "roundRect",
        symbolSize: [6, 18],
        itemStyle: {
          normal: {
            color: "#12272A",
          },
        },
        label: {
          normal: {
            show: true,
            position: "right",
            offset: [0, 2],
            distance: 30,
            textStyle: {
              color: "#7AF8FF",
              fontSize: 14,
            },
            formatter: function (a, b) {
              return `${a.value}%`;
            },
          },
        },
        data: xData,
        z: 0,
        animationEasing: "elasticOut",
      },
      {
        //分隔
        type: "pictorialBar",
        itemStyle: {
          color: "#000",
        },
        symbolRepeat: "fixed",
        symbolMargin: 4,
        symbol: "roundRect",
        symbolClip: true,
        symbolSize: [2, 18],
        symbolPosition: "start",
        symbolOffset: [0, 0],
        data: list,
        z: 2,
        animationEasing: "elasticOut",
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

export default ProgressBar;
