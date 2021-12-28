import React from "react";
import Charts from "@components/Charts/Charts";
import moment from "moment";

type WeekRateProps = {
  data?: Array<{
    rec_rate: number;
    created_at: number;
  }>;
};

const WeekRate: React.FC<WeekRateProps> = ({ data = [] }) => {


    const defaultData = [
        {
            rec_rate: 3000,
            created_at: 1621987200
        },
        {
            rec_rate: 2500,
            created_at: 1622073600
        },
        {
            rec_rate: 3120,
            created_at: 1622160000
        },
        {
            rec_rate: 4520,
            created_at: 1622246400
        },
        {
            rec_rate: 6666,
            created_at: 1622332800
        }
    ]
  const getOptionMap = () => {
    return {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
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
          data: (data?.length? data : defaultData).map((item) => item.rec_rate),
          type: "bar",
        },
      ],
    };
  };

  return <Charts options={getOptionMap()} />;
};

export default WeekRate;
