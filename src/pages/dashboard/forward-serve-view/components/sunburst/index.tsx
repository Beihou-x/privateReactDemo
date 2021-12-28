import React from "react";
import ReactECharts from "echarts-for-react";
import { format } from "@/utils/utils";

const Sunburst = (props) => {
  const { data = {} } = props;

  const a = format(
    Number(data.k4 || 0) / (Number(data.k4 || 0) + Number(data.k3 || 0))
  );
  const b = format(
    Number(data.k3 || 0) / (Number(data.k4 || 0) + Number(data.k3 || 0))
  );
  const c = format(Number(data.k5 || 0) / Number(data.k4 || 0));
  const d = format(Number(data.k6 || 0) / Number(data.k4 || 0));

  var data1 = [
    {
      name: "活跃设备",
      value: Number(data.k4 || 0),
      itemStyle: { color: "rgba(55, 162, 218, 1)" },
      rate: a,
      children: [
        {
          name: "今日转发数据设备",
          value: Number(data.k5 || 0),
          itemStyle: { color: "rgba(55, 162, 218, 0.7)" },
          rate: c,
        },
        {
          name: "今日未转发数据设备",
          value: Number(data.k6 || 0),
          itemStyle: { color: "rgba(55, 162, 218, 0.3)" },
          rate: d,
        },
      ],
    },
    {
      name: "不活跃设备",
      value: Number(data.k3 || 0),
      itemStyle: { color: "rgba(255, 159, 127, 1)" },
      rate: b,
    },
  ];

  const option = {
    title: {
      text: data.k1,
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      left: "center",
      bottom: "0",
    },

    series: {
      type: "sunburst",
      // emphasis: {
      //     focus: 'ancestor'
      // },
      data: data1,
      radius: [0, "90%"],
      itemStyle: {
        color: "#ddd",
        borderWidth: 0,
      },
      label: {
        color: "#fff",
        fontSize: 12,
        formatter: function (param) {
          return param.data && param.data.rate + "%";
        },
      },
    },
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default Sunburst;
