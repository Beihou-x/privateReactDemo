import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Dashboard = (props) => {
  const { title, data = 0, color='#37A2DA' } = props;
  useEffect(() => {
    getOption();
  }, [data]);

  const getOption = () => {
    return {
      grid: {
        top: "0%",
        left: "0%",
        right: "0%",
        bottom: "0%",
      },
      title: {
        text: title,
        left: "center",
        bottom: "20",
        textStyle: {
          fontSize: "12",
          fontWeight: "bold",
          color: "#fff",
          textAlign: "center",
        },
      },
      series: [
        {
          type: "gauge",
          progress: {
            show: true,
            width: 5,
            color: "#6B717F",
            roundCap: true,
          },
          itemStyle: {
            borderWidth: 5,
            color: color,
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 5,
              color: [
                [0, '#6B717F'],
                [1,'#6B717F']
            ],
            },
          },
          pointer: {
            icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
            length: "40%",
            width: 7,
            offsetCenter: [0, "5%"],
          },
          axisTick: {
            show: false,
          },
          splitNumber: 10,
          splitLine: {
            length: 5,
            distance: 2,
            lineStyle: {
              width: 1,
              color: "#ccc",
            },
          },
          axisLabel: {
            distance: 10,
            color: "#ccc",
            fontSize: 12,
          },
          center: ["50%", "50%"],
          radius: "90%",
          anchor: {
            show: false,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
              color: "rgba(30, 216, 244, 1)",
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 20,
            color: color,
            offsetCenter: [0, "70%"],
            formatter: function(value) {
              return value + '%'
            }
          },
          data: [
            {
              value: data,
            },
          ],
        },
      ],
    };
  };

  return (
    <ReactECharts
      option={getOption()}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default Dashboard;
