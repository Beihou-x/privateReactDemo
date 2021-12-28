import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const LabelPie = (props) => {
  const { title = "", data = 0.56 } = props;
  const handred = 100;
  let point = Number((Number(data) * 100).toFixed(2));
  const option = {
    title: [
      {
        text: point + "%",
        x: "center",
        y: "center",
        subtext: title,
        subtextStyle: {
          color: "#ffff",
          fontSize: 14,
        },
        itemGap: 70,
        textStyle: {
          fontWeight: "600",
          color: "#fff",
          fontSize: "15",
        },
      },
      {
        text: "时效性",
        x: "center",
        y: "bottom",
        zlevel: 2,
        textStyle: {
          color: "#fff",
          fontWeight: "lighter",
          fontSize: "20",
        },
      },
    ],
    series: [
      //最外层圆环
      {
        name: "背景",
        type: "pie",
        radius: "42%",
        // startAngle: 179.7,
        data: [{ value: 1, name: "背景" }],
        itemStyle: {
          color: "#2b3648",
          shadowBlur: 50,
          shadowColor: "#1b1e25",
        },
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
      },
      {
        name: "circle",
        type: "pie",
        zlevel: 1,
        radius: ["50%", "60%"],
        startAngle: 179.7,
        itemStyle: {
          shadowBlur: 50,
          shadowColor: "#1b1e25",
          normal: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        },
        data: [
          {
            value: point,
            name: "占比",
            shadowBlur: 50,
            shadowColor: "#1b1e25",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#50E696",
                  },
                  {
                    offset: 1,
                    color: "#0097FB",
                  },
                ]),
              },
            },
          },
          {
            name: "剩余",
            value: handred - point,
            itemStyle: {
              color: "transparent",
            },
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

export default LabelPie;
