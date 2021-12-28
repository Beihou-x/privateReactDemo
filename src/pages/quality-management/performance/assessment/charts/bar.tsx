import React from "react";
import ReactECharts from "echarts-for-react";
// var xData = (function () {
//   var data = ["1日", "2日", "3日", "4日", "5日", "6日", "7日"];
//   return data;
// })();
const Bar = (props) => {
  const { data=[] } = props;
  const xData = data && data.map(item => item.name);
  const values = data && Object.values(data);
  const normalTotal: any = data.map((m) => m.normal_total);
  const unNormalTotal: any = data.map((m) => m.unNormal_total);
  const deviceTotal: any = data.map((m) => m.device_total);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
    },
    grid: {
      borderWidth: 0,
      top: 25,
      bottom: 20,
      left: 55,
      right: 45,
      textStyle: {
        color: "#fff",
      },
    },
    calculable: true,
    xAxis: [
      {
        name: "单位",
        type: "category",
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.5)",
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: "rgba(255,255,255,0.7)",
          fontSize: 10,
        },
        data: xData,
      },
    ],
    yAxis: [
      {
        // name: "设备数",
        nameTextStyle: {
          color: "#FDFDFD",
          padding: [0, 0, 0, -50],
        },
        nameGap: 10,
        splitNumber: 3,
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "RGBA(3, 75, 97, 1)",
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: "rgba(255,255,255,0.5)",
          fontSize: 10,
        },
        splitArea: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "正常设备数",
        type: "bar",
        // stack: "1",
        stack: 'total',
        barMaxWidth: 25,
        barGap: "10%",
        itemStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#1890ff", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#1890ff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            opacity: 1,
            label: {
              show: true,
              // position: "top",
              textStyle: {
                color: "#FFFFFF",
              },
              // formatter: "{c}%",
              // distance: 5,
            },
          },
        },
        data: normalTotal,
      },
      {
        name: "异常设备数",
        type: "bar",
        stack: 'total',
        // stack: "1",
        barMaxWidth: 25,
        barGap: "10%",
        itemStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(217, 0, 27, 1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(217, 0, 27, 1)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            opacity: 0.9,
            barBorderRadius: 0,
            label: {
              show: true,
              // position: "top",
              textStyle: {
                color: "#FFFFFF",
              },
              // formatter: "{c}%",
              distance: 5,
            },
          },
        },
        data: unNormalTotal,
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

export default Bar;
