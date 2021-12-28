import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { isTemplateMiddle } from "typescript";
import { toNumber } from "lodash";

const Pie = props => {
  const defaultData = [
    {
      name: "质量很好",
      value: 1,
    },
    {
      name: "质量一般",
      value: 2,
    },
    {
      name: "质量较差",
      value: 5,
    },
    {
      name: "无人脸",
      value: 1,
    },
  ];
  const { title, data = defaultData } = props;

  const getAll = data => {
    let num = 0;
    data.forEach(item => {
      num += toNumber(item.value);
    });
    return num;
  };
  const option = {
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ",
      backgroundColor: "rgba(0,0,0,0.6)",
      borderColor: "rgba(0,0,0,0.6)",
      padding: 15,
      textStyle: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "300",
      },
    },
    title: {
      // text: getAll(data),
      textStyle: {
        color: "#fff",
      },
      left: "25%",
      top: "40%",
      subtext: title,
      subtextStyle: {
        color: "#fff",
      },
    },
    legend: {
      show: true,
      itemGap: 20,
      icon: "circle",
      type: "scroll",
      orient: "vertical",
      right: "20%",
      top: "center",
      textStyle: {
        color: "#fff",
        rich: {
          a: {
            color: "#fff",
            width: 70,
          },
          b: {
            color: "#fff",
            width: 40,
            align: "right",
          },
          c: {
            color: "#fff",
            width: 60,
            align: "right",
          },
        },
      },
      // formatter: '{name}: {b}'
      formatter: function (name) {
        // let politicsFenBu_total = data.reduce((acc,currentVal) => {
        //   return acc + currentVal.value
        // },0)
        let target;
        for (let i = 0; i < data.length; i++) {
          if (data[i].name == name) {
            target = data[i].value;
          }
        }
        // return `{a|${name}}{b|${((target / politicsFenBu_total) * 100).toFixed(2) + "%"}}`
        return `${name} ${target}`;
      },
    },
    series: [
      {
        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#4fd1f5",
            },
            {
              offset: 1,
              color: "#0083fe",
            },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#93edc7",
            },
            {
              offset: 1,
              color: "#1cd8d2",
            },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#e9d362" },
            { offset: 1, color: "#333333" },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#a8c0ff",
            },
            {
              offset: 1,
              color: "#3f2b96",
            },
          ]),
        ],
        center: ["30%", "50%"],
        type: "pie",
        // roseType: "radius",
        avoidLabelOverlap: false,
        label: {
          show: true,
          // position: "inside",
          // formatter: "{b} : {c} : {d}%",
          color: "#fff",
          // fontStyle: "normal",
        },
        labelLine: {
          show: true,
          length: 40,
        },
        emphasis: {
          scaleSize: 10,
        },
        data: data,
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

export default Pie;
