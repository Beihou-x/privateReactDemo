import React from "react";
import ReactEcharts from "echarts-for-react";

const pie = ({ styles = {} }) => {
  const pieOption = () => {
    let option = {
      title: {
        text: "苏州市区域设备",
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
          radius: [75, 95],
          label: {
            show: true,
            formatter: "{b}: {c}",
            color: "#ccc",
          },
          data: [
            { value: 2961, name: "工业园区" },
            { value: 3146, name: "吴中区" },
            { value: 2974, name: "姑苏区" },
            { value: 2537, name: "高新区" },
            { value: 2896, name: "吴江区" },
            { value: 2795, name: "相城区" },
            { value: 3987, name: "张家港市" },
            { value: 3012, name: "常熟市" },
            { value: 2124, name: "太仓市" },
            { value: 2113, name: "昆山市" },
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
      <ReactEcharts option={pieOption()} style={styles}></ReactEcharts>
    </div>
  );
};

export default pie;
