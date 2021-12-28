import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

const Ring = ({ styles = {} }) => {
  const Option = () => {
    var color = ["#4380F0", "#C596FF", "#F5A15D", "#01FAF2", "#52CCFF"];
    let option = {
      color: color,
      title: {
        text: "库数占比分析",
        left: "center",
        top: "5%",
        textStyle: {
          fontSize: 12,
          color: "#fff",
          fontWeight: "normal",
        },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        bottom: "1%",
        left: "center",
        textStyle: {
          color: "#fff",
        },
      },
      series: [
        {
          type: "pie",
          roseType: "radius",
          radius: ["20%", "50%"],
          data: [
            {
              value: 220,
              name: "原始库",
            },
            {
              value: 120,
              name: "资源库",
            },
            {
              value: 189,
              name: "主题库",
            },
            {
              value: 189,
              name: "专题库",
            },
            {
              value: 189,
              name: "业务库",
            },
          ],
          label: {
            normal: {
              formatter: "{font|{d}%}",
              rich: {
                font: {
                  fontSize: 12,
                  padding: [5, 0],
                  color: "#BEE4F8",
                },
                hr: {
                  height: 0,
                  borderWidth: 1,
                  width: "100%",
                  borderColor: "#BEE4F8",
                },
              },
            },
          },
          labelLine: {
            lineStyle: {
              color: "#BEE4F8",
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0,0,0,0.5)",
            },
          },
        },
      ],
    };
    return option;
  };

  return (
    <div>
      <ReactEcharts
        option={Option()}
        style={{ height: "20vh", width: "400px" }}
      ></ReactEcharts>
    </div>
  );
};

export default Ring;
