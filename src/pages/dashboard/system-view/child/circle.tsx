import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Circle = (props) => {
  const { data='0', title="" } = props;
  const percent = data * 100;
 
  const option = {
    title: [
      {
        text: `${percent}%`,
        left: "center",
        top: "30%",
        textStyle: {
          fontSize: "12",
          fontWeight: "bold",
          color: "#fff",
          textAlign: "center",
        },
      },
      {
        text: title,
        left: "center",
        bottom: "30",
        textStyle: {
          fontSize: "14",
          fontWeight: "400",
          color: "#fff",
          textAlign: "center",
        },
      },
    ],
    // tooltip: {
    //     formatter: function(params) {
    //         return params.name + '：' + params.percent + ' %'
    //     }
    // },
    series: [
      {
        name: "circle",
        type: "pie",
        clockWise: true,
        radius: ["50%", "66%"],
        center: ["50%",'35%'],
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        },
        hoverAnimation: false,
        data: [
          {
            value: percent,
            name: "占比",
            itemStyle: {
              normal: {
                color:"#37A2DA"
              },
            },
          },
          {
            name: "剩余",
            value: 100 - percent,
            itemStyle: {
              normal: {
                color: '#334054',
              },
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

export default Circle;
