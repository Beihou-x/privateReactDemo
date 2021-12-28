import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
type TotalSourceProps = {
  data?: any;
};

const TotalSource: React.FC<TotalSourceProps> = () => {

  const data = [
    {name: '抓拍量',value: 100},
    {name: '推送量',value:70},
    {name: '归档量',value: 50},
    {name: '档案量',value: 40},
  ]

  const getOptionMap = () => {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}",
      },
      grid: {
        top: "5%",
        right: "50%",
        bottom: "10%",
        left: "50%",
      },
      color: ["#005FDC", "#004baf", "#004baf", "#4CA3DC", "#6CC5DC"],
      series: [
        {
          type: "funnel",
          width: "100%",
          height: "100%",
          min: 0,
          max: 100,
          left: 0,
          top: 0,
          minSize: "0%",
          maxSize: "100%",
          sort: "descending",
          gap: 2,
          label: {
            show: true,
            position: "inside",
            color: "#fff",
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: "solid",
            },
          },
          itemStyle: {
            borderColor: "transparent",
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 20,
            },
          },
          data: data,
        },
      ],
    };
  };

  return (
    <>
      <ReactEcharts
        option={getOptionMap()}
        style={{ height: "100%", width: "60%" }}
        opts={{ renderer: "svg" }}
      />
    </>
  );
};

export default TotalSource;
