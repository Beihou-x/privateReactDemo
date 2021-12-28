import React from "react";
import Charts from "@components/Charts/Charts";
import moment from "moment";

type WeekForwardProps = {
  data?: Array<{
    should_access_total: number;
    real_access_total: number;
    created_at: number;
  }>;
};

const WeekForward: React.FC<WeekForwardProps> = ({ data = [] }) => {

    const defaultData = [
        {
            should_access_total: 50,
            real_access_total: 70,
            created_at: 1621987200
        },
        {
            should_access_total: 50,
            real_access_total: 70,
            created_at: 1622073600
        },
        {
            should_access_total: 50,
            real_access_total: 70,
            created_at: 1622160000
        },
        {
            should_access_total: 50,
            real_access_total: 70,
            created_at: 1622246400
        },
        {
            should_access_total: 30,
            real_access_total: 60,
            created_at: 1622332800
        }
    ]

  const getOptionMap = () => {
    return {
      legend: {
        data: ["应接收", "实接收"],
        textStyle: {
          color: "rgba(79, 217, 252, 1)",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      color: ["#4DF6A2", "#4FD9FC"],
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: (data?.length? data : defaultData).map(
          (item) =>
            item &&
            item.created_at &&
            moment(item.created_at * 1000).format("YYYY-MM-DD")
        ),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "应接收",
          type: "line",
          stack: "总量",
          data: (data?.length? data : defaultData).map((item) => item.should_access_total),
        },
        {
          name: "实接收",
          type: "line",
          stack: "总量",
          data: (data?.length? data : defaultData).map((item) => item.real_access_total),
        },
      ],
    };
  };

  return <Charts options={getOptionMap()} />;
};

export default WeekForward;
