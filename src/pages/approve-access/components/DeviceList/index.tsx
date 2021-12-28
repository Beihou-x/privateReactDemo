import React, { useEffect, useState } from 'react';
import {
  Transfer
} from 'antd';

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

  useEffect(() => {
    handleDeivceSearch({});
  }, []);

  const handleDeivceSearch = async (params) => {
    try {
      const response = await services({
        offset: 0,
        limit: 10,
        ...params
      });

      setDeivce(response && response.items || []);
    } catch (e) {
      console.error(e)
    }
  };
  const filterOption = (inputValue, option) => option && option.alias && option.alias.indexOf(inputValue) > -1;
  return (
    <Transfer
      titles={['未选择设备', '已选择设备']}
      showSearch
      dataSource={deviceList}
      targetKeys={values}
      onChange={onChange}
      filterOption={filterOption}
      pagination
      render={(item: any) => item.alias}
      rowKey={(item: any) => item.id}
      listStyle={{
        width: 340,
      }}
    />
  );
};

export default DeivceList;