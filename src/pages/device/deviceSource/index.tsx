// 一机一档源管理
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Card,
  Input,
  Button,
  Divider,
  Descriptions,
  Radio,
  DatePicker,
  Checkbox,
  Popover
} from 'antd';
import moment from 'moment';
import { deviceSource, deviceSync,deviceSourceStatisticsr } from '@/services/v2';
import Bar from "./bar";
import { OptGroup } from 'rc-select';


const DeviceSource = props => {
  const [sourceData, setSourceData]: any = useState({})
  const [syncData, setSyncData]: any = useState({})

  const [checkLevel, setCheckLevel]:any = useState(["deviceId","latlong"]);
  const [checkTime, setCheckTime]:any = useState([moment().startOf('day').format("X"),moment().endOf('day').format("X")])

  const [checkTotal, setCheckTotal] = useState('0');
  const [checkBarData, setCheckBarData]:any = useState([]);
  useEffect(() => {
    deviceSource({}).then(res => {
      setSourceData(res)
    })
    deviceSync({}).then(res => {
      setSyncData(res)
    })
    getCheckTotal(checkTime,checkLevel);
  }, [])

  const checkLevelChange = e => {
    setCheckLevel(e);
    getCheckTotal(checkTime,e);
  }
  const syncWay = e => {
    console.log(e);
  }

  const dateChange = (date, str) => {
    setCheckTime([date ? date.startOf('day').format('X'): '',date ? date.endOf('day').format('X'): '']);
    getCheckTotal([date ? date.startOf('day').format('X'): '',date ? date.endOf('day').format('X'): ''],checkLevel)
  }
  const getCheckTotal = (time,check) => {
    let arr:string[] = [];
    if(check.length == 2) {
      arr = ["000000001","000000002","000000003","000001001","000001002","000001003"]
    }else if(check.length == 1) {
      arr = check[0] == 'deviceId' ? ["000000001","000000002","000000003"]: ["000001001","000001002","000001003"];
    }else {
      arr = []
    }
    deviceSourceStatisticsr({
      start: time[0],
      end: time[1],
      codes: arr
    }).then(res => {
      setCheckTotal(res && res.total || '0');
      setCheckBarData(res && res.x_device_check_result || []);
    })
  }
  const deviceContent = (
    <div>
      <div>设备编码校验规则:</div>
      <div>1)设备编码长度是否等于20;</div>
      <div>2)设备编码前6位不符合标准;</div>
      <div>3)设备编码前六位与区域编码是否一致;</div>
      <div>4)设备编码11至13位不符合标准</div>
    </div>
  )
  const latlongtContent =(
    <div>
      <div>设备经纬度校验规则:</div>
      <div>1)设备是否有经纬度;</div>
      <div>2)设备经纬度小数点不足六位数;</div>
    </div>
  )

  return (
    <Card bordered={false}>
      <Descriptions title="源管理" column={3}>
        <Descriptions.Item label={"校验等级"}>
          <span style={{marginRight:10,fontSize: 14,fontWeight: 700, color: "#fff"}}>({checkLevel.length ? checkLevel.length>1?"高":"中" : "低"})</span>
          <Checkbox.Group onChange={checkLevelChange} defaultValue={["deviceId","latlong"]}>
            <Popover content={deviceContent}>
              <Checkbox value="deviceId">设备编码</Checkbox>
            </Popover>
            <Popover content={latlongtContent}>
              <Checkbox value="latlong">经纬度</Checkbox>
            </Popover>
          </Checkbox.Group>
        </Descriptions.Item>
        <Descriptions.Item label="供应商">{sourceData.provider}</Descriptions.Item>
        <Descriptions.Item label="服务地址">{sourceData.serviceAddr}</Descriptions.Item>
        <Descriptions.Item label="同步时间">{sourceData.syncTime}</Descriptions.Item>
        <Descriptions.Item label="同步策略">{sourceData.synchronizationStrategy}</Descriptions.Item>
        <Descriptions.Item label="同步方式">
          <Radio.Group onChange={syncWay} value="fullAmount">
            <Radio value="fullAmount">全量</Radio>
            <Radio value="increment">增量</Radio>
          </Radio.Group>
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed={true}></Divider>
      <span>校验时间 : </span>
      <span style={{display: "inline-block", width:240}}>
        <DatePicker defaultValue={moment(new Date(),'YYYY-MM-DD')} allowClear={false} onChange={dateChange} />
      </span>
      <div style={{lineHeight: '40px'}}>
        <span>校验总量:</span>
        <span>{checkTotal}</span>
      </div>
      <div style={{width: '100%', height: 400}}>
        <Bar data={checkBarData} />
      </div>
      <Divider></Divider>
      <Descriptions title="设备同步" column={3}>
        <Descriptions.Item label="接收地址">{syncData.acceptAddr}</Descriptions.Item>
        <Descriptions.Item label="引擎名称">{syncData.engineName}</Descriptions.Item>
        <Descriptions.Item label="同步策略">{syncData.syncStrategy}</Descriptions.Item>
        <Descriptions.Item label="同步时间">{syncData.syncTime}</Descriptions.Item>
        <Descriptions.Item label="同步方式">
          <Radio.Group onChange={syncWay} value="fullAmount">
            <Radio value="fullAmount">全量</Radio>
            <Radio value="increment">增量</Radio>
          </Radio.Group>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}


export default DeviceSource