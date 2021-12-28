import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

const PieBar = ({ styles = {} }) => {
  const Option = () => {
    const handred = 100;
    let point = 66;

    let option = {
      title: {
        text: point + "%",
        x: "center",
        y: "center",
        subtext: "数据一致性",
        subtextStyle: {
          color: "#ffff",
          fontSize: 12,
        },
        itemGap: 40,
        left: "center",
        top: "40%",
        textStyle: {
          fontWeight: 400,
          color: "#E7FFFF",
          fontSize: "16",
        },
      },
      tooltip: {
        formatter: function (params) {
          return params.name + "：" + params.percent + " %";
        },
      },
      series: [
        {
          name: "circle",
          type: "pie",
          bottom: "5%",
          clockWise: true,
          radius: ["50%", "80%"],
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
              value: point,
              name: "占比",
              itemStyle: {
                normal: {
                  color: {
                    // 颜色渐变
                    colorStops: [
                      {
                        offset: 0,
                        color: "#006D89", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#00FFFC", // 100% 处的颜色1
                      },
                    ],
                  },
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
            {
              name: "剩余",
              value: handred - point,
              itemStyle: {
                normal: {
                  color: "#044177",
                },
              },
            },
          ],
        },
      ],
    };
    return option;
  };

  return (
    <div>
      <ReactEcharts
        option={Option()}
        style={{ width: "6vw", height: "13vh" }}
      ></ReactEcharts>
    </div>
  );
};

export default PieBar;
