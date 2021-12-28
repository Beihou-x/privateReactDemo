import React from "react";
import ReactEcharts from "echarts-for-react";

const BorderedPie = ({
  styles = {
    height: "10vh",
  },
  title = "",
}) => {
  const getOptions = () => {
    return {
      tooltip: {
        trigger: "item",
      },
      // legend: {
      //     top: '5%',
      //     left: 'center'
      // },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "14",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "<10s" },
            { value: 735, name: "10s~20s" },
            { value: 580, name: ">20s" },
          ],
        },
      ],
    };
  };

  return (
    <div>
      <ReactEcharts style={styles} option={getOptions()} />
      <div style={{ textAlign: "center" }}>{title}</div>
    </div>
  );
};

export default BorderedPie;
