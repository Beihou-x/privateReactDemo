import React, { useEffect, useState } from 'react';
import { getLine } from "@/services/v2";
import { format } from "@/utils/utils";
const ExpandedRow = props => {

  console.log(props);
  const { values } = props

  const [lineData, setLineData]: any = useState({})
  useEffect(() => {
    getLine({ id: values.access_id || '', device_id: values.device_id }).then(res => {
      setLineData(res || {})
    })
  }, [])

  return (
    <div style={{ display: 'flex', height: 80 }}>
      <div style={{ width: "100%" }}>
        <div>接入报告：</div>
        <div>
          <span>七天数据传输率</span>
          ：
          <span>
            {format((lineData && lineData.daily_result || []).filter(item => item.total !== '0').length / 7)}%
          </span>
        </div>
        <div>每日抓拍量</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {
            (lineData && lineData.daily_result || []).map(item => (
              <div>
                <span>
                  {item.day ? item.day : item.hour}
                </span>
                ：
                <span>
                  {item.total}
                </span>
              </div>
            ))
          }
        </div>
        {/* <Line data={lineData && lineData.daily_result || []} /> */}
      </div>
      {/* <div style={{width: "60%"}}>
        <Line data={lineData && lineData.timely_result || []} />
      </div> */}
    </div>
  )
}


export default ExpandedRow;