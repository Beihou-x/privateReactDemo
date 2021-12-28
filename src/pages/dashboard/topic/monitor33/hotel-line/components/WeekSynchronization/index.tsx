import React from "react";
import Charts from "@components/Charts/Charts";
import moment from "moment";

type WeekSynchronizationProps = {
  data?: Array<{
    should_sync_total: number;
    real_sync_total: number;
    created_at: number;
  }>;
};

const WeekSynchronization: React.FC<WeekSynchronizationProps> = ({
  data = [],
}) => {

    const defaultData = [
        {
            should_sync_total: 50,
            real_sync_total: 70,
            created_at: 1621987200
        },
        {
            should_sync_total: 50,
            real_sync_total: 70,
            created_at: 1622073600
        },
        {
            should_sync_total: 50,
            real_sync_total: 70,
            created_at: 1622160000
        },
        {
            should_sync_total: 50,
            real_sync_total: 70,
            created_at: 1622246400
        },
        {
            should_sync_total: 30,
            real_sync_total: 60,
            created_at: 1622332800
        }
    ]
  const getOptionMap = () => {
    return {
      legend: {
        data: ["应同步", "实同步"],
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
          name: "应同步",
          type: "line",
          stack: "总量",
          data: (data?.length? data : defaultData).map((item) => item.should_sync_total),
        },
        {
          name: "实同步",
          type: "line",
          stack: "总量",
          data: (data?.length? data : defaultData).map((item) => item.real_sync_total),
        },
      ],
    };
  };

  return <Charts options={getOptionMap()} />;
};

export default WeekSynchronization;
