import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Bar = (props) => {
  const { data = [] } = props;
  let yLabel = (data || []).map((m) => m.k1);
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
        },
      },
    },
    grid: {
      left: "14%",
      top: "18%",
      right: "8%",
      bottom: "22%",
    },
    legend: {
      data: ["实转发设备", "应转发设备"],
      itemWidth: 12,
      itemHeight: 8,
      top: "4%",
      textStyle: {
        color: "rgba(199, 204, 208, 1)",
        fontSize: 14,
      },
    },
    xAxis: {
      type: "value",
      inverse: true,
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "rgba(82, 91, 104, 0.8)",
          width: 1,
        },
      },
      position: "bottom",
      axisTick: {
        show: false, //隐藏X轴刻度
        alignWithLabel: true,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(199, 204, 208, 1)", //X轴文字颜色
          fontSize: 12,
        },
        interval: "auto",
      },
    },
    yAxis: [
      {
        type: "category",
        name: "设备量",
        position: "right",
        nameTextStyle: {
          color: "#fff",
          fontSize: 14,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
          rotate: 45,
        },
        data: yLabel,
      },
    ],
    series: [
      {
        name: "实转发设备",
        type: "bar",
        label: {
          show: true,
          position: "left", // 位置
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
                color: "rgba(254, 179, 21, 0.1)",
              },
              {
                offset: 1,
                color: "rgba(254, 179, 21, 1)",
              },
              
            ],
            false
          ), // 渐变
        },
        barWidth: 20,
        data: (data || []).map((m) => Number(m.k6 || 0)),
      },
      {
        name: "应转发设备",
        type: "bar",
        label: {
          show: true,
          position: "left", // 位置
          color: "#fff",
          fontSize: 14,
          distance: 0, // 距离
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
                color: "rgba(59, 255, 255, 0.1)",
              },
              {
                offset: 1,
                color: "rgba(59, 255, 255, 1)",
              },
            ],
            false
          ), // 渐变
        },
        barWidth: 20,
        data: (data || []).map((m) => Number(m.k7 || 0)),
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "45%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default Bar;
