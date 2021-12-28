import React from "react";
import ReactECharts from "echarts-for-react";

const Area = () => {
  const option = {
    tooltip: {
      trigger: "axis",
      // backgroundColor:'rgba(133,179,241,1)',//通过设置rgba调节背景颜色与透明度
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    // 边距
    grid: {
      top: "1%",
      left: "5%",
      right: "5%",
      bottom: "0%",
      // containLabel: true,
    },
    xAxis: {
      show: false,
      type: "category",
      boundaryGap: false,
      data: [
        "1日",
        "2日",
        "3日",
        "4日",
        "5日",
        "6日",
        "7日",
        "8日",
        "9日",
        "10日",
        "11日",
        "12日",
        "13日",
        "14日",
        "15日",
      ],
    },
    yAxis: {
      type: "value",
      axisTick: {
        length: 0,
      },
      // y轴值
      axisLabel: false,
      // 轴线
      axisLine: false,
      // 网格线
      splitLine: {
        lineStyle: {
          type: "solid", // y轴分割线类型
          color: "#F7FAFC",
          opacity: 0.1,
        },
      },
    },
    series: [
      {
        data: [
          300, 932, 800, 934, 1290, 700, 300, 1200, 800, 770, 600, 567, 456,
          455, 400,
        ],
        type: "line",
        symbol: "none", //取消折点圆圈
        // 折线
        itemStyle: {
          normal: {
            // 点颜色
            // color: "#1790a6",
            lineStyle: {
              // 线颜色
              // color: "#1790a6",
              width: 0,
            },
          },
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#3EC6FF", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(56, 181, 237, 0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
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

export default Area;
