import React, { useEffect, useState, useRef } from "react";
import { Radio  } from "antd";


const CheckDate = (props) => {

  const {radioChange} = props;

  return (
    <>
      <Radio.Group buttonStyle="solid" onChange={radioChange} defaultValue="a" style={{marginBottom: 20}}>
        <Radio.Button value="a">今天</Radio.Button>
        <Radio.Button value="b">昨天</Radio.Button>
      </Radio.Group>
    </>
  )
}

export default CheckDate