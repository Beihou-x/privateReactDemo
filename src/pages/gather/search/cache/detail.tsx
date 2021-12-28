import React, { useRef, useEffect, useState } from "react";
import { Button, Card, Divider, Image, Spin } from "antd";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";
// import { useHistory } from "react-router-dom";
import styles from './index.less'
import { cacheDetail, subimageList } from "@/services/v2";
import { getImgUrl } from '@/utils/utils'
import { ArrowLeftOutlined } from '@ant-design/icons';
const CacheDetail = (props) => {
  const { match: { params = {} }, history } = props
  const { device_id, request_id, start, end, type } = params
  const [data, setData]: any = useState(null);
  const [imgList, setImgList]: any = useState(null);
  const [typeImg, setTypeImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  // const history = useHistory();
  useEffect(() => {
    setLoading(true)
    setLoading1(true)
    cacheDetail({ device_id, request_id, start, end }).then(res => {
      if (res && res.data) {
        setData(res.data)
      }
      setLoading1(false)
    })
    subimageList({ device_id, request_id, start, end }).then(res => {
      if (res && res.subImages) {
        console.log('res==', res.subImages.map(m => m.Type))
        setImgList(res.subImages)
        const index = res.subImages.findIndex(m => m.Type === '01' || m.Type === '02' || m.Type === '04' || m.Type === '05' || m.Type === '09');
        if (index > -1) {
          setTypeImg('car');
        } else {
          setTypeImg('face');
        }
      }
      setLoading(false)
    })
  }, [])

  const renderItem = (title, type) => {
    const url = getImgUrl(imgList, type);
    return <>
      <div className={styles.imageList_title}>{title}</div>
      {
        url ?
          <Image src={url} height={'100%'} />
          :
          <div className={styles.imageList_noData}>暂无图片</div>
      }

    </>
  }

  return (
    <Card bordered={false}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p>图片列表</p>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() =>
          history.push({
            pathname: '/gather/data/cache',
            query: {
              device_id,
              request_id,
              start,
              end,
              type
            }
          })}>
          返回列表
        </Button>
      </div>
      <Spin tip="Loading..." spinning={loading}>
        <div className={styles.imageList}>
          <div className={styles.imageList_left}>
            <div className={styles.imageList_left_item}>
              {renderItem('场景图', '14')}
            </div>
          </div>
          <div className={styles.imageList_right}>
            <div className={styles.imageList_right_item}>
              {typeImg === 'face' ?
                renderItem('压缩背景', '99')
                :
                renderItem('车牌彩色小图', '02')
              }
            </div>
            <div className={styles.imageList_right_item}>
              {typeImg === 'face' ?
                renderItem('人脸图', '11')

                :
                renderItem('车辆特写图', '09')
              }
            </div>
            {typeImg === 'face' ?
              <div className={styles.imageList_right_item}>
                {renderItem('人员图', '10')}
              </div>
              :
              <div className={styles.imageList_right_item1}>
                <div className={styles.imageList_right_item1_item}>
                  {renderItem('驾驶员面部特征图', '04')}
                </div>
                <div className={styles.imageList_right_item1_item}>
                  {renderItem('副驾驶面部特征图', '05')}
                </div>
              </div>}

          </div>
        </div>
      </Spin>
      <Divider />
      <p>报文信息</p>
      <Spin tip="Loading..." spinning={loading1}>
        <JSONInput
          locale={locale}
          height={'90vh'}
          width={'100%'}
          colors={{
            background: "#191f2a",
            default: "#848585",
          }}
          style={{
            contentBox: {
              fontSize: "16px",
              color: "#848585",
            },
            labelColumn: {
              fontSize: "16px",
            },
          }}
          placeholder={data}
          viewOnly
        />
      </Spin>
    </Card>
  )
}
export default CacheDetail;