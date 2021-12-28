import React, { useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

const BarNegative = ({ styles = {}, value = 5000, title = "" }) => {
  useEffect(() => {}, []);

  const getOptionMap = () => {
    return {
      title: [
        {
          text: `${(value / 100).toFixed(2)}%`,
          left: "center",
          top: "middle",
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
          bottom: "-10%",
          textStyle: {
            fontSize: "12",
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          },
        },
      ],
      grid: {
        left: "5%",
        top: "0%",
        right: "5%",
        bottom: "5%",
      },
      series: [
        {
          type: "pie",
          startAngle: 180,
          radius: ["90%", "70%"],
          center: ["50%", "40%"],
          data: [
            {
              hoverOffset: 1,
              value: (value / 100).toFixed(2),
              name: "",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                    {
                      offset: 0,
                      color: "rgb(57,89,255,1)",
                    },
                    {
                      offset: 1,
                      color: "rgb(46,200,207,1)",
                    },
                  ]),
                },
              },
              label: {
                show: false,
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0,
                  },
                },
              },
              hoverAnimation: false,
            },
            {
              label: {
                show: false,
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0,
                  },
                },
              },
              value: ((10000 - Number(value)) / 100).toFixed(2),
              hoverAnimation: false,
              itemStyle: {
                color: "rgba(251, 200, 79, 0)",
              },
            },
          ],
        },
      ],
    };
  };

  return <ReactEcharts option={getOptionMap()} style={styles} />;
};

export default BarNegative;
