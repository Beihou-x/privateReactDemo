import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import moment from "moment";
import { access_cloud_weekly_alive } from "@/services/access_cloud";

const Line = (props) => {
  const { data = [] } = props;
  const [faceActive, setFaceActive]: any = useState([]);
  const [superActive, setSuperActive]: any = useState([]);

  useEffect(() => {
    access_cloud_weekly_alive().then((res) => {
      const face = res.faceActive.map((item) => {
        return {
          date: item.date,
          value: Number((Number(item.alive) * 100).toFixed(2)),
        };
      });
      setFaceActive(face);
      const superList = res.superActive.map((item) =>
        Number((Number(item.alive) * 100).toFixed(2))
      );
      setSuperActive(superList);
    });
  }, []);

  const option = {
    title: {
      show: false,
      text: "",
      textStyle: {
        align: "center",
        color: "#fff",
        fontSize: 20,
      },
      top: "5%",
      left: "center",
    },
    legend: {
      icon: "rect",
      data: ["人像卡口", "超级卡口"],
      textStyle: {
        color: "#fff",
      },
      x: "right",
      right: 20,
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
      top: "20%",
      left: "10%",
      right: "5%",
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
            color: "rgba(26, 201, 255, .4)",
          },
        },
        axisTick: {
          //坐标轴刻度相关设置。
          show: false,
        },
        axisLabel: {
          color: "#fff",
          fontSize: 14,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: faceActive.map((item) => item.date),
      },
    ],

    yAxis: [
      {
        type: "value",
        min: 0,
        max: 100,
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
            fontSize: 14,
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
        name: "人像卡口",
        type: "line",
        smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: "pin",
        symbolSize: 4,
        lineStyle: {
          normal: {
            color: "rgba(67, 245, 254, 1)",
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
          },
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "rgba(67, 245, 254, 1)",
          },
          formatter: "{c}%",
        },
        itemStyle: {
          color: "rgba(67, 245, 254, 1)",
          borderColor: "#fff",
          borderWidth: 1,
          shadowColor: "rgba(0, 0, 0, .3)",
          shadowBlur: 0,
        },
        tooltip: {
          show: false,
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
                  color: "rgba(67, 245, 254,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(67, 245, 254,0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(67, 245, 254, 0.9)",
            shadowBlur: 20,
          },
        },
        data: faceActive.map((item) => item.value),

      },
      {
        name: "超级卡口",
        type: "line",
        smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: "pin",
        symbolSize: 4,
        lineStyle: {
          normal: {
            color: "rgba(0, 112, 251, 1)",
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
          },
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "rgba(0, 112, 251, 1)",
          },
          formatter: "{c}%",
        },

        itemStyle: {
          color: "rgba(0, 112, 251, 1)",
          borderColor: "#fff",
          borderWidth: 1,
          shadowColor: "rgba(0, 0, 0, .3)",
          shadowBlur: 0,
        },
        tooltip: {
          show: false,
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
                  color: "rgba(0, 112, 251,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(0, 112, 251,0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 112, 251, 0.9)",
            shadowBlur: 20,
          },
        },
        data: superActive,

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
