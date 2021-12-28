import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const AccessRelation = props => {
  const { title = "" } = props;
  let num = 0;
  const option = {
    title: [
      {
        text: "60%",
        x: "center",
        top: "42%",
        subtext: title,
        subtextStyle: {
          color: "#ffff",
          fontSize: 12,
        },
        itemGap: 40,
        textStyle: {
          fontSize: "15",
          color: "#fdf914",
          fontFamily: "Lato",
          fontWeight: 600,
        },
      },
    ],
    polar: {
      radius: ["44%", "50%"],
      center: ["50%", "50%"],
    },
    angleAxis: {
      max: 100,
      show: false,
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: "",
        type: "bar",
        roundCap: true,
        barWidth: 60,
        showBackground: true,
        backgroundStyle: {
          color: "rgba(66, 66, 66, .3)",
        },
        data: [60],
        coordinateSystem: "polar",

        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "#fdf914",
              },
              {
                offset: 1,
                color: "#38a700",
              },
            ]),
          },
        },
      },
      {
        name: "",
        type: "pie",
        startAngle: 90,
        radius: ["62.5%", "64%"],
        hoverAnimation: false,
        center: ["50%", "50%"],
        itemStyle: {
          normal: {
            labelLine: {
              show: false,
            },
            color: "rgba(66, 66, 66, .3)",
            shadowBlur: 10,
            shadowColor: "rgba(253, 249, 20, .3)",
          },
        },
        data: [
          {
            value: 100,
          },
        ],
      },
      {
        name: "",
        type: "pie",
        startAngle: 90,
        radius: ["68%", "68%"],
        hoverAnimation: false,
        center: ["50%", "50%"],
        itemStyle: {
          normal: {
            labelLine: {
              show: false,
            },
            color: "rgba(66, 66, 66, .2)",
            shadowBlur: 10,
            shadowColor: "rgba(253, 249, 20, .3)",
          },
        },
        data: [
          {
            value: 100,
          },
        ],
      },
      {
        name: "",
        type: "pie",
        startAngle: 90,
        radius: ["66.5%", "67.5%"],
        hoverAnimation: false,
        center: ["50%", "50%"],
        itemStyle: {
          normal: {
            labelLine: {
              show: false,
            },
            color: "rgba(66, 66, 66, .1)",
            shadowBlur: 10,
            shadowColor: "rgba(253, 249, 20, .3)",
          },
        },
        data: [
          {
            value: 100,
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

export default AccessRelation;
