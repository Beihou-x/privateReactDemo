import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Circle = (props) => {
  const { data = '0', title = "", id = "" } = props;

  //   const [angle, setAngle] = useState(0);

  let angle = 0; //角度，用来做简单的动画效果的
  let value = data*100;
  let timer: any = null;

  useEffect(() => {
    draw();
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      draw();
    }, 100);
    return () => clearInterval(timer);
  }, [data]);

  const draw = () => {
    let a: any = document.getElementById(id);
    var myChart = echarts.init(a);
    angle = angle + 3;
    myChart.setOption(option, true);
    //window.requestAnimationFrame(draw);
  };

  const option = {
    title: [
      {
        text: "{a|" + value + "}{c|%}",
        x: "center",
        y: "35%",
        textStyle: {
          rich: {
            a: {
              fontSize: 14,
              color: "#29EEF3",
            },
            c: {
              fontSize: 14,
              color: "#ffffff",
              // padding: [5,0]
            },
          },
        },
      },
      {
        text: title,
        left: "center",
        bottom: 0,
        textStyle: {
          fontSize: "12",
          fontWeight: "bold",
          color: "#fff",
          textAlign: "center",
        },
      },
    ],

    series: [
      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (params, api) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2.5,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.7,
              startAngle: ((0 + angle) * Math.PI) / 180,
              endAngle: ((90 + angle) * Math.PI) / 180,
            },
            style: {
              stroke: "#0CD3DB",
              fill: "transparent",
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (params, api) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2.5,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.7,
              startAngle: ((180 + angle) * Math.PI) / 180,
              endAngle: ((270 + angle) * Math.PI) / 180,
            },
            style: {
              stroke: "#0CD3DB",
              fill: "transparent",
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (params, api) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2.5,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.75,
              startAngle: ((270 + -angle) * Math.PI) / 180,
              endAngle: ((40 + -angle) * Math.PI) / 180,
            },
            style: {
              stroke: "#0CD3DB",
              fill: "transparent",
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (params, api) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2.5,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.75,
              startAngle: ((90 + -angle) * Math.PI) / 180,
              endAngle: ((220 + -angle) * Math.PI) / 180,
            },
            style: {
              stroke: "#0CD3DB",
              fill: "transparent",
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (params, api) {
          let x0 = api.getWidth() / 2;
          let y0 = api.getHeight() / 2.5;
          let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.75;
          let point = getCirlPoint(x0, y0, r, 90 + -angle);
          return {
            type: "circle",
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4,
            },
            style: {
              stroke: "#0CD3DB", //粉
              fill: "#0CD3DB",
            },
            silent: true,
          };
        },
        data: [0],
      },
      {
        name: "ring5", //绿点
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (params, api) {
          let x0 = api.getWidth() / 2;
          let y0 = api.getHeight() / 2.5;
          let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.75;
          let point = getCirlPoint(x0, y0, r, 270 + -angle);
          return {
            type: "circle",
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4,
            },
            style: {
              stroke: "#0CD3DB", //绿
              fill: "#0CD3DB",
            },
            silent: true,
          };
        },
        data: [0],
      },
      {
        name: "",
        type: "pie",
        radius: ["64%", "50%"],
        center: ["50%", "40%"],
        silent: true,
        clockwise: true,
        startAngle: 90,
        z: 0,
        zlevel: 0,
        label: {
          normal: {
            position: "center",
          },
        },
        data: [
          {
            value: value,
            name: "",
            itemStyle: {
              normal: {
                color: {
                  // 完成的圆环的颜色
                  colorStops: [
                    {
                      offset: 0,
                      color: "#4FADFD", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#28E8FA", // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          },
          {
            value: 100 - value,
            name: "",
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: "#173164",
              },
            },
          },
        ],
      },

      {
        name: "",
        type: "gauge",
        radius: "58%",
        center: ["50%", "40%"],
        startAngle: 0,
        endAngle: 359.9,
        splitNumber: 18,
        hoverAnimation: true,
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 48,
          lineStyle: {
            width: 3,
            color: "#061740",
            // opacity: .8,
          },
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            opacity: 0,
          },
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 0,
            name: "",
          },
        ],
      },
    ],
  };

  //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
  function getCirlPoint(x0, y0, r, angle) {
    let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
    let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
    return {
      x: x1,
      y: y1,
    };
  }
  return <div id={id} style={{ width: "100%", height: "100%" }}></div>;
};

export default Circle;
