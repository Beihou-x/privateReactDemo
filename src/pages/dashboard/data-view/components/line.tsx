import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import moment from "moment";
import { dataWeeklyChangeUpload } from "@/services/feel_view";
import { bigNumberTransform } from "@/utils/utils";

const Line = props => {
  const { data = [] } = props;
  const [weeklyData, setWeeklyData]: any = useState([]);
  useEffect(() => {
    dataWeeklyChangeUpload().then(res => {
        setWeeklyData(res && res.dataWeeklyChange || []);
    });
  }, []);

  const option = {
    title: {
      show: false,
      text: "",
      textStyle: {
        align: "center",
        color: "#C7CCD0",
        fontSize: 20,
      },
      top: "5%",
      left: "center",
    },
    legend: {
      icon: "rect",
      itemWidth: 12,
      itemHeight: 2,
      data: ["人卡", "超卡"],
      textStyle: {
        color: "#C7CCD0",
      },
      x: "center",
      top: 10,
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
                color: "rgba(34, 41, 55,0)",
              },
              {
                offset: 0.5,
                color: "rgba(34, 41, 55,0.8)",
              },
              {
                offset: 1,
                color: "rgba(34, 41, 55,0)",
              },
            ],
            global: false,
          },
        },
      },
    },
    grid: {
      top: "20%",
      left: "12%",
      right: "5%",
      bottom: "25%",
      // containLabel: true
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: true,
          onZero: true,
          lineStyle: {
            color: 'rgba(82, 91, 104, 0.8)'
          }
        },
        splitArea: {
          // show: true,
          color: "#C7CCD0",

          lineStyle: {
            color: "rgba(26, 201, 255, .4)",
          },
        },
        axisTick: {
          //坐标轴刻度相关设置。
          show: false,
        },
        axisLabel: {
          color: "#C7CCD0",
          fontSize: 14,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: (weeklyData || []).map(item => item.k1),
      },
    ],

    yAxis: [
      {
        type: "value",
        min: 0,
        // max: 'dataMax',
        splitNumber: 5,
        axisLine: {
          show: false,
          // onZero: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: "rgba(82, 91, 104, 0.8)",
            type: 'dashed'
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#C7CCD0",
            fontSize: 14,
          },
          margin: 10,
          formatter: function (value) {
            return bigNumberTransform(value)
          }
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "人卡",
        type: "line",
        showSymbol: true,
        symbolSize: 8,
        zlevel: 3,
        itemStyle: {
          color: "#37A2DA",
          borderColor: "#a3c8d8",
        },
        lineStyle: {
          normal: {
            width: 1,
            color: "#37A2DA",
          },
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
                  color: "rgba(88,255,255,1)",
                },
                {
                  offset: 0.8,
                  color: "rgba(88,255,255,0)",
                },
              ],
              false
            ),
          },
        },
        data: (weeklyData || []).map(item => item.k2),
      },
      {
        name: "超卡",
        type: "line",
        showSymbol: true,
        symbolSize: 8,
        zlevel: 3,
        itemStyle: {
          color: "#45A686",
          borderColor: "#a3c8d8",
        },
        lineStyle: {
          normal: {
            width: 1,
            color: "#45A686",
          },
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
                  color: "rgba(69, 166, 134, 1)",
                },
                {
                  offset: 0.8,
                  color: "rgba(69, 166, 134, 0)",
                },
              ],
              false
            ),
          },
        },
        data: (weeklyData || []).map(item => item.k3),
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: "90%", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default Line;
