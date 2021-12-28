import React from "react";
import ReactECharts from "echarts-for-react";

const Pie = (props) => {
  const {
    title = "",
    data = [],
    radius,
    legend = false,
    center = ["50%", "50%"],
    y = "center",
  } = props;
  const option = {
    legend: legend,
    title: {
      text: title,
      left: "center",
      y: y,
      textStyle: {
        //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
        fontFamily: "Source Han Sans CN",
        fontSize: y === "center" ? 12 : 14,
        fontWeight: 200,
        color: y === "center" ? "#02AFD3" : "#fff",
      },
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: radius || ["40%", "60%"],
        center: center,
        data: data,
        label: {
          fontSize: 10,
          color: "#fff",
          show: true,
          formatter: y === "center" ? "{c}\n{b}" : "{c}",
        },
        labelLine: {
          show: true,
          // length: 40,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
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
