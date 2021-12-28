import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { formatDate } from "@/utils/utils";

const Line = (props) => {
  const { data = [], title = "", avg = 0, type } = props;
  const values = (data || []).map((item) => Number(item[1]));
  const max = Math.max(...values);
  const option = {
    title: {
      show: true,
      text: title,
      textStyle: {
        align: "center",
        color: "#fff",
        fontSize: 14,
      },
      // top: "5%",
      left: "center",
    },
    legend: {
      show: false,
      icon: "rect",
      itemWidth: 10,
      itemHeight: 2,
      textStyle: {
        color: "#fff",
      },
      x: "center",
      y: "bottom",
      right: "center",
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
      top: "15%",
      left: type ? "5%" : "10%",
      right: type ? "5%" : "10%",
      bottom: "15%",
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
          fontSize: 12,
          rotate: 20,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: (data || []).map((item) => formatDate(item[0], "HH:mm:ss")),
      },
    ],

    yAxis: [
      {
        type: "value",
        min: 0,
        max: max > avg ? max : avg,
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
            fontSize: 12,
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
        name: "http_server_95",
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        // symbol: "pin",
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: "#0079ed",
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
          },
        },
        label: {
          show: false,
          position: "top",
          textStyle: {
            color: "#0079ed",
          },
          // formatter: "{c}%",
        },
        itemStyle: {
          color: "#0079ed",
          borderColor: "#fff",
          borderWidth: 1,
          shadowColor: "rgba(0, 0, 0, .3)",
          shadowBlur: 0,
        },
        tooltip: {
          show: true,
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
                  color: "rgba(55, 162, 218, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(67, 245, 254,0)",
                },
              ],
              false
            ),
            // shadowColor: "rgba(67, 245, 254, 0.9)",
            shadowBlur: 20,
          },
        },
        markLine: {
          lineStyle: {
            normal: {
              color: "red",
            },
          },
          data: [
            {
              name: "阈值",
              yAxis: avg,
              label: {
                show: true,
                color: "#fff",
                formatter: "{b} : {c}"
              }
            },
          ],
        },
        data: values,
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
