import React from "react";
import ReactEcharts from "echarts-for-react";

const deviceTypePie = () => {
  const pieOption = () => {
    let option = {
      title: {
        text: "设备类型",
        left: "center",
        top: "top",
        textStyle: {
          color: "#ccc",
        },
        subtext: "",
        subtextStyle: {
          fontSize: "14",
        },
      },
      color: [
        "#37a2da",
        "#32c5e9",
        "#9fe6b8",
        "#ffdb5c",
        "#ff9f7f",
        "#fb7293",
        "#e7bcf3",
        "#8378ea",
      ],
      tooltip: {
        show: true,
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      toolbox: {
        show: true,
      },
      legend: {
        type: "plain",
        orient: "vertical",
        left: "10",
        align: "left",
        top: "middle",
        textStyle: {
          color: "#CCC",
        },
      },
      series: [
        {
          name: "区域设备",
          type: "pie",
          radius: [50, 75],
          label: {
            show: true,
            formatter: "{b}: {c}",
            color: "#ccc",
          },
          data: [
            { value: 5974, name: "超级卡口" },
            { value: 4725, name: "人像卡口" },
            { value: 4506, name: "车辆卡口" },
            { value: 4416, name: "普通卡口" },
            { value: 4398, name: "IMIS" },
            { value: 4521, name: "WiFi" },
          ],
          right: 0,
        },
      ],
    };

    let total = 0;
    option.series[0].data.forEach(item => {
      total += item.value;
    });

    option.title.subtext = total.toString();
    return option;
  };

  return (
    <div>
      <ReactEcharts option={pieOption()}></ReactEcharts>
    </div>
  );
};

export default deviceTypePie;
