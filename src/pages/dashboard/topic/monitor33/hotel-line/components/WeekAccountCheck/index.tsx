import React from "react";
import Charts from "@components/Charts/Charts";
import moment from "moment";

type WeekAccountCheckProps = {
  data?: Array<{
    should_forward_total: number;
    real_forward_total: number;
    created_at: number;
  }>;
};

const WeekAccountCheck: React.FC<WeekAccountCheckProps> = ({ data }) => {

    const defaultData = [
        {
            should_forward_total: 50,
            real_forward_total: 70,
            created_at: 1621987200
        },
        {
            should_forward_total: 50,
            real_forward_total: 70,
            created_at: 1622073600
        },
        {
            should_forward_total: 50,
            real_forward_total: 70,
            created_at: 1622160000
        },
        {
            should_forward_total: 50,
            real_forward_total: 70,
            created_at: 1622246400
        },
        {
            should_forward_total: 30,
            real_forward_total: 60,
            created_at: 1622332800
        }
    ]
  const getOptionMap = () => {
    return {
      legend: {
        data: ["接收", "转发"],
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
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: "category",
        data: (data?.length? data : defaultData).map(
          (item) =>
            item &&
            item.created_at &&
            moment(item.created_at * 1000).format("YYYY-MM-DD")
        ),
      },
      series: [
        {
          name: "应转发",
          type: "bar",
          data: (data?.length? data : defaultData).map((item) => item.should_forward_total),
        },
        {
          name: "实转发",
          type: "bar",
          data: (data?.length? data : defaultData).map((item) => item.real_forward_total),
        },
      ],
    };
  };

  return <Charts options={getOptionMap()} />;
};

export default WeekAccountCheck;
