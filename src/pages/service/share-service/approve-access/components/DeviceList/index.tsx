import React, { useEffect, useState } from "react";
import { Transfer,Spin } from "antd";

type DeviceListProps = {
  services: (params: object) => Promise<any>;
  onChange?: (values: string[]) => void;
  values?: string[];
};

const DeivceList: React.FC<DeviceListProps> = ({
  services,
  onChange,
  values,
}) => {
  const [deviceList, setDeivce] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination,setPagination] = useState({
    total: 0,
    pageSize: 10,
    pageNumber: 1,
    showSizeChanger: true,
    showQuickJumper: true,
    current: 1,
  });
  useEffect(() => {
    handleDeivceSearch({});
  }, []);

  const handleDeivceSearch = async (params) => {
    try {
      setLoading(true);
      const response = await services({
        ...params,
        offset:0,
        limit: 99999
      });
      console.log(response,'response');
      
      setDeivce((response && response.items) || []);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };
  const filterOption = (inputValue, option) =>
    option && option.alias && option.alias.indexOf(inputValue) > -1;
  return (
    <Spin spinning={loading}>
      <Transfer
        titles={["未选择设备", "已选择设备"]}
        showSearch
        dataSource={deviceList}
        targetKeys={values}
        onChange={onChange}
        filterOption={filterOption}
        // selectedKeys={values}
        pagination
        render={(item: any) => item.alias}
        rowKey={(item: any) => item.device_id}
        listStyle={{
          width: 340,
        }}
      />
    </Spin>
  );
};

export default DeivceList;
