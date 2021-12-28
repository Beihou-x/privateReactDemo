import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i].name === obj) {
      return i;
    }
  }
  return false;
}

const Radar = (props) => {
  const { title = "", data = [], radius = "45%" } = props;
  const stages =
    (data &&
      data.length &&
      data.map((m) => {
        return { name: m.name, max: 100 };
      })) ||
    [];
  const scores = [
    { name: title, value: data && data.length && data.map((m) => m.value) },
  ];
  const option = {
    title: {
      text: title,
      x: "center",
      y: "bottom",
      textStyle: {
        fontSize: 14,
        color: "#fff",
        fontWeight: 200,
      },
    },
    radar: {
      radius: radius,
      triggerEvent: true,
      name: {
        rich: {
          a: {
            fontSize: 10,
            color: "#fff",
            // lineHeight: "20",
            padding: [0, 20, 10, 20],
          },
          b: {
            color: "#fff",
            fontSize: 10,
            padding: [10, 40, 2, 40],
          },
          triggerEvent: true,
        },
        formatter: (a) => {
          let i = contains(stages, a); // 处理对应要显示的样式
          return `{b| ${
            scores && scores.length && scores[0]["value"][i]
          }%}\n{a| ${a}}`;
        },
      },
      nameGap: "2",
      indicator: stages,
      splitArea: {
        areaStyle: {
          color: [
            // '#172C65' ,'#122454','#0A1835',

            "rgba(39,67,143, 0.1)",
            "rgba(39,67,143, 0.2)",
            "rgba(39,67,143, 0.4)",
            "rgba(39,67,143, 0.6)",
            "rgba(39,67,143, 0.8)",
            "rgba(39,67,143, 1)",
          ].reverse(),
        },
      },
      // axisLabel:{//展示刻度
      //     show: true
      // },
      axisLine: {
        //指向外圈文本的分隔线样式
        lineStyle: {
          color: "rgba(0,0,0,0)",
        },
      },
      splitLine: {
        lineStyle: {
          width: 2,
          color: ["rgba(45,65,110, 0.6)"].reverse(),
        },
      },
    },

    series: [
      {
        name: title,
        type: "radar",
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: "rgba(0, 255, 246, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(1, 140, 248, 1)",
                },
              ],
              false
            ),
          },
        },
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: "#32a9ea",
            width: 1,
            fontSize: 10,
          },
        },
        data: [scores && scores.length && scores[0]],
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

export default Radar;
