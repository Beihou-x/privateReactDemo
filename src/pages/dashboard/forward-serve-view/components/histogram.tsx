import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { format } from "@/utils/utils";

const Histogram = (props) => {
  const { data = [] } = props;
  let yLabel = (data || []).map((m) => m.k1);

  const option = {
    baseOption: {
      // timeline: {
      //   show: false,
      //   top: 0,
      //   data: [1],
      // },
      legend: {
        textStyle: {
          color: "#fff",
        },
        top: "3%",
      },
      // grid: {
      //   left: "5%",
      //   right: "10%",
      //   bottom: "8%",
      //   top: "10%",
      //   containLabel: true,
      // },
      grid: [
        {
          show: false,
          left: "5%",
          top: "10%",
          bottom: "8%",
          containLabel: true,
          width: "40%",
        },
        {
          show: false,
          left: "51%",
          top: "10%",
          bottom: "11%",
          width: "3%",
        },
        {
          show: false,
          right: "5%",
          top: "10%",
          bottom: "8%",
          containLabel: true,
          width: "40%",
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
      },
      xAxis: [
        {
          type: "value",
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: "bottom",
        },
        {
          gridIndex: 1,
          show: false,
          type: "value",
        },
        {
          gridIndex: 2,
          show: false,
          type: "value",
        },
      ],
      yAxis: [
        {
          type: "category",
          inverse: true,
          position: "right",
          axisLabel: {
            show: false,
            margin: 15,
            textStyle: {
              color: "#C7CCD0",
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            color: "rgba(82, 91, 104, 0.5)",
          },
          data: yLabel,
        },
        {
          gridIndex: 1,
          type: "category",
          inverse: true,
          position: "left",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            padding: [30, 0, 0, 0],
            align: "center",
            textStyle: {
              color: "#fff",
            },
          },
          data: yLabel,
        },
        {
          gridIndex: 2,
          type: "category",
          inverse: true,
          position: "left",
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          data: yLabel,
        },
        // {
        //   type: "category",
        //   name: "数据转发率",
        //   nameTextStyle: {
        //     color: "rgba(255, 255, 255, 0.8)",
        //     padding: [0, 0, 0, 50],
        //   },
        //   // inverse: true,
        //   axisTick: "none",
        //   axisLine: "none",
        //   show: true,
        //   axisLabel: {
        //     textStyle: {
        //       color: "#9EE6B9",
        //       fontSize: "14",
        //     },
        //     formatter: function (value, index) {
        //       const items = data.filter((f, i) => i === index)[0];
        //       return format(items.k5) + "%";
        //     },
        //   },
        //   data: (data || []).map((m) => Number(m.k5 || 0)),
        // },
      ],
      series: [],
    },
    options: [
      {
        series: [
          {
            // xAxisIndex: 1,
            // yAxisIndex: 1,
            name: "实转发数据",
            type: "bar",
            stack: "data",
            label: {
              show: true,
              position: "right", // 位置
              color: "#fff",
              fontSize: 14,
              // distance: -40, // 距离
              formatter: "{c}", // 这里是数据展示的时候显示的数据
            }, // 柱子上方的数值
            itemStyle: {
              // barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）

              color: new echarts.graphic.LinearGradient(
                1,
                0,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: "rgba(55, 162, 218, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(55, 162, 218, 0.1)",
                  },
                ],
                false
              ), // 渐变
            },
            barWidth: 20,
            data: (data || []).map((m) => Number(m.k3 || 0)),
            // data: [10, 20, 30, 45, 70, 15],
          },
          {
            // xAxisIndex: 1,
            // yAxisIndex: 1,
            name: "应转发数据",
            type: "bar",
            stack: "data",
            label: {
              show: true,
              position: "right", // 位置
              color: "#fff",
              fontSize: 14,
              distance: -30, // 距离
              formatter: "{c}", // 这里是数据展示的时候显示的数据
            }, // 柱子上方的数值
            itemStyle: {
              // barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）

              color: new echarts.graphic.LinearGradient(
                1,
                0,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: "rgba(28, 198, 167, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(28, 198, 167, 0.1)",
                  },
                ],
                false
              ), // 渐变
            },
            barWidth: 20,
            // data: (data || []).map((m) => Number(m.k4 || 0)),
            data: [10, 20, 30, 45, 70, 15],
          },
          {
            xAxisIndex: 2,
            AxisIndex: 2,
            name: "实转发设备",
            type: "bar",
            stack: "device",
            label: {
              show: true,
              position: "right", // 位置
              color: "#fff",
              fontSize: 14,
              // distance: -40, // 距离
              formatter: "{c}", // 这里设备展示的时候显示的数据
            }, // 柱子上方的数值
            itemStyle: {
              // barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）
              color: new echarts.graphic.LinearGradient(
                1,
                0,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: "rgba(254, 179, 21, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(254, 179, 21, 0.1)",
                  },
                ],
                false
              ), // 渐变
            },
            barWidth: 20,
            // data: (data || []).map((m) => Number(m.k6 || 0)),
            data: [10, 20, 30, 45, 70, 15],
          },
          {
            xAxisIndex: 2,
            yAxisIndex: 2,
            name: "应转发设备",
            type: "bar",
            stack: "device",
            label: {
              show: true,
              position: "right", // 位置
              color: "#fff",
              fontSize: 14,
              distance: -30, // 距离
              formatter: "{c}", // 这里是数据展示的时候显示的数据
            }, // 柱子上方的数值
            itemStyle: {
              // barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）

              color: new echarts.graphic.LinearGradient(
                1,
                0,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: "rgba(59, 255, 255, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(59, 255, 255, 0.1)",
                  },
                ],
                false
              ), // 渐变
            },
            barWidth: 20,
            data: (data || []).map((m) => Number(m.k7 || 0)),
          },
        ],
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

export default Histogram;
