import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Dashboard = (props) => {
  const { title, data = 0 } = props;
  useEffect(() => {
    getOption();
  }, [data]);

  const getOption = () => {
    return {
      grid: {
        top: "5%",
        left: "5%",
        right: "5%",
        bottom: "5%",
        // containLabel: true
      },
      title: {
        show: false,
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
          radius: "80%",
          progress: {
            show: true,
            width: 10,
            color: "#379EFD",
            roundCap: true,
          },
          itemStyle: {
            borderWidth: 10,
            color: "#379EFD",
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 10,
              color: [
                [0, 'rgba(0,151,255,0.25)'],
                [1,'rgba(0,151,255,0.25)']
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
          splitNumber: 5,
          splitLine: {
            length: 5,
            distance: 5,
            lineStyle: {
              width: 2,
              color: "#379EFD",
            },
          },
          axisLabel: {
            distance: 15,
            color: "#379EFD",
            fontSize: 12,
          },
          center: ["50%", "50%"],
          anchor: {
            show: false,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
              color: "#379EFD",
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 20,
            color: "#379EFD",
            offsetCenter: [0, "100%"],
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
      style={{ height: "80%", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default Dashboard;
