import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const AccessTime = (props) => {
  const { data = 0, title = "" } = props;
  let point = Number((Number(data) * 100).toFixed(2));
  const option1 = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    // toolbox: {
    //   feature: {
    //     restore: {},
    //     saveAsImage: {},
    //   },
    // },
    series: [
      {
        name: "接入及时性",
        type: "gauge",
        detail: {
          formatter: "{value}%",
          color: "#fff",
          fontSize: 14,
          offsetCenter: [0, "100%"],
        },
        radius: "90%",
        data: [
          {
            value: point,
            name: title,
            title: {
              offsetCenter: [0, "80%"],
              color: "#fff",
              fontSize: 14,
            },
          },
        ],
        axisLabel: {
          color: "#fff",
          // distance: 40,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [
                1,
                new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0.1,
                    color: "#FFC600",
                  },
                  {
                    offset: 0.6,
                    color: "#30D27C",
                  },
                  {
                    offset: 1,
                    color: "#0B95FF",
                  },
                ]),
              ],
            ],
          },
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option1}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default AccessTime;
