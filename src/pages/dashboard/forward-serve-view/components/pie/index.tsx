import React from "react";
import ReactECharts from "echarts-for-react";

const Pie = (props) => {
  const { data = [] } = props;

  const color = ["#9EE6B9", "#37A2DA"];
  let total = data.reduce((a, b) => {
    return a + b.value * 1;
  }, 0);

  const option = {
    color: color,
    title: [
      {
        text: "{val|" + total + "}\n{name|" + "应用总量" + "}",
        top: "28%",
        left: "24%",
        textAlign: 'center',
        textStyle: {
          rich: {
            val: {
              fontSize: 30,
              fontWeight: "500",
              color: "#fff",
              padding: [5, 5],
            },
            name: {
              fontSize: 14,
              fontWeight: "400",
              color: "rgba(255, 255, 255, 0.65)",
            },
          },
        },
      },
    ],
    legend: {
      left: "50%",
      top: "center",
      icon: "circle",
      // orient: 'vertical',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
        rich: {
          name: {
            color: "#C7CCD0",
            fontSize: 14,
            fontWeight: 400,
            width: 70,
            padding: [46, 10, 0, 5],
          },
          value: {
            color: "#fff",
            fontSize: 18,
            padding: [15, 0],
          },
        },
      },
      formatter: (name) => {
        if (data.length) {
          const item = data.filter((item) => item.name === name)[0] || {};
          return `{name|${name}} \n{value| ${item.value}}`;
        } else {
          return name;
        }
      },
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "接入方式占比",
        type: "pie",
        center: ["25%", "50%"],
        radius: ["60%", "73%"],
        itemStyle: {
          normal: {
            borderWidth: 2,
            borderColor: "#2b3548",
          },
        },
        label: {
          normal: {
            show: false,
            position: "center",
            formatter: "{value|{c}}\n{label|{b}}",
            rich: {
              value: {
                padding: 5,
                align: "center",
                verticalAlign: "middle",
                fontSize: 32,
                color: "#fff",
              },
              label: {
                align: "center",
                verticalAlign: "middle",
                fontSize: 16,
                color: "#fff",
              },
            },
          },

          // emphasis: {
          //   show: true,
          //   textStyle: {
          //     fontSize: "14",
          //     color: "#fff",
          //   },
          // },
        },
        labelLine: {
          show: false,
          length: 0,
          length2: 0,
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
