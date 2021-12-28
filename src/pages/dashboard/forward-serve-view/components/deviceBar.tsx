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
      left: "18%",
      top: "18%",
      right: "10%",
      bottom: "22%",
    },
    legend: {
      data: ["实转发数据", "应转发数据"],
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
      // data: (data || []).map(item => item.k11),
      // inverse: true,
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
        show:false
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
        name: "转发量",
        position: "left",
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
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
          width: 60,
          overflow: "break"
        },
        data: yLabel,
      },
    ],
    series: [
      {
        name: "实转发数据",
        type: "bar",
        // stack: "data",
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
        // data: [10,20,15,48,30,52]
      },
      {
        name: "应转发数据",
            type: "bar",
            // stack: "data",
            label: {
              show: true,
              position: "right", // 位置
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
            data: (data || []).map((m) => Number(m.k4 || 0)),
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "55%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default Bar;
