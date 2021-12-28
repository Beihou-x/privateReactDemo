import React, { } from 'react';
import styles from './index.less';
import TotalStatistics from './components/TotalStatistics';
import {
    Row,
    Col,
    Card,
    Statistic,
} from 'antd';
import BarIntegrality from './components/BarIntegrality';
import TotalSource from './components/TotalSource';
import Map from './components/Map';
import ProbabilityTotay from './components/ProbabilityToday';
import ProportionTotal from './components/ProportionTotal';
import BarNegative from './components/BarNegative';
import AutoRefresh from './components/AutoRefresh';
import { hotelDataSearch, hotelGraphSearch, hotelHistory } from '@/services/v1';
import moment from 'moment';

const Screen = () => {

    return (
        <div className={styles.screen}>
            {/* <header>
                <h2>旅馆专题可视化</h2>
            </header> */}
            <div className={styles["header-total"]}>
                <AutoRefresh
                    // services={() => hotelHistory({
                    //     name: "history_screen"
                    // })}
                >
                    {
                        (data: any) => {
                            return (
                                <Row gutter={32} justify="space-around" align="middle">
                                    <Col span={4}>
                                        <TotalStatistics
                                            title="旅馆数"
                                            total={
                                                <span>
                                                    <span>
                                                        {data && data.hotel_total || 30}
                                                    </span>
                                                </span>
                                            }
                                        />
                                    </Col>
                                    <Col span={4} style={{ height: '100%' }}>
                                        <TotalStatistics
                                            title="设备数"
                                            total={
                                                <span>{data && data.device_total || 55}</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={4} style={{ height: '100%' }}>
                                        <TotalStatistics
                                            title="今日数据量"
                                            total={
                                                <span>{data && data.data_total || 60}</span>
                                            }
                                        />
                                    </Col>
                                </Row>
                            )
                        }
                    }
                </AutoRefresh>
            </div>
            <div style={{ width: '98%', height: '72vh', position: 'relative' }}>
                <Row gutter={24} style={{ margin: 0 }} justify="center">
                    <Col span={6} style={{ position: 'absolute', left: 0, width: '28%', maxWidth: '28%' }}>
                        <Card className={styles['screen-card']} bordered={false} title="数据来源" style={{ marginBottom: '5px' }}>
                            <div className={styles.conBorBox}>
                                <div className={styles.bor}></div>
                                <div className={`${styles.line} ${styles.lineTop}`}></div>
                                <div className={`${styles.line} ${styles.lineBottom}`}></div>
                            </div>
                            <div style={{ height: '160px' }}>
                                <AutoRefresh
                                    // services={() => hotelDataSearch({
                                    //     name: "data_source"
                                    // })}
                                >
                                    {
                                        (data: any) => {
                                            return (
                                                <TotalSource
                                                    styles={{
                                                        height: '150px',
                                                        width: '100%'
                                                    }}
                                                    data={Object.keys(data).length > 0 ? data : {}}
                                                />
                                            )
                                        }
                                    }
                                </AutoRefresh>
                            </div>
                        </Card>
                        <Card className={styles['screen-card']} bordered={false} title="今日情况">
                            <div className={styles.conBorBox}>
                                <div className={styles.bor}></div>
                                <div className={`${styles.line} ${styles.lineTop}`}></div>
                                <div className={`${styles.line} ${styles.lineBottom}`}></div>
                            </div>
                            <AutoRefresh
                                // services={() => hotelDataSearch({
                                //     name: "data_rate"
                                // })}
                            >
                                {
                                    (data) => {
                                        return (
                                            <div style={{ height: '26vh' }}>

                                                <div className={styles['circular-ring']}>
                                                    <span>旅馆入住率</span>
                                                    <ProbabilityTotay
                                                        value={data.check_in_db_rate}
                                                        styles={{
                                                            height: '5vh',
                                                            width: '80%'
                                                        }}
                                                    />
                                                </div>
                                                <div className={styles['circular-ring']}>
                                                    <span>人证核验率</span>
                                                    <ProbabilityTotay
                                                        value={data.validate_rate}
                                                        styles={{
                                                            height: '5vh',
                                                            width: '80%'
                                                        }}
                                                    />
                                                </div>
                                                <div className={styles['circular-ring']}>
                                                    <span>入库成功率</span>
                                                    <div style={{ width: '80%', display: 'flex' }}>
                                                        <ProbabilityTotay
                                                            value={data.check_in_db_rate}
                                                            title="旅馆入住记录库"
                                                            styles={{
                                                                height: '5vh',
                                                                width: '33%'
                                                            }}
                                                        />
                                                        <ProbabilityTotay
                                                            value={data.persion_db_rate}
                                                            title="人像基础库"
                                                            styles={{
                                                                height: '5vh',
                                                                width: '33%'
                                                            }}
                                                        />
                                                        <ProbabilityTotay
                                                            value={data.face_db_rate}
                                                            title="人脸库"
                                                            styles={{
                                                                height: '5vh',
                                                                width: '33%'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={styles['circular-ring']}>
                                                    <span>引擎识别率</span>
                                                    <ProbabilityTotay
                                                        value={data.rec_rate}
                                                        title="百度引擎"
                                                        styles={{
                                                            height: '5vh',
                                                            width: '80%'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            </AutoRefresh>

                        </Card>
                    </Col>
                    <Col span={10} style={{ height: '53vh' }}>
                        <Map
                            styles={{
                                height: '100%'
                            }}
                        />
                    </Col>
                    <Col span={6} style={{ position: 'absolute', right: 0, width: '28%', maxWidth: '28%' }}>
                        <Card className={styles['screen-card']} bordered={false} title="人证核验率最低TOP5旅馆" style={{ marginBottom: '5px' }}>
                            <div className={styles.conBorBox}>
                                <div className={styles.bor}></div>
                                <div className={`${styles.line} ${styles.lineTop}`}></div>
                                <div className={`${styles.line} ${styles.lineBottom}`}></div>
                            </div>
                            <div style={{ height: '18vh' }}>
                                <AutoRefresh
                                    // services={() => hotelDataSearch({
                                    //     name: "validate"
                                    // })}
                                >
                                    {
                                        (data) => {
                                            return (
                                                <>
                                                    {
                                                        (data || []).slice(0, 3).map((item, index) => (
                                                            <div style={{ marginBottom: '5px' }}>
                                                                <ProportionTotal
                                                                    key={item || item.device_id || ""}
                                                                    tab={index + 1}
                                                                    title={item && item.name || ""}
                                                                    total={`${item && item.validate_rate && (item.validate_rate.substr(0, 2) + '.' + item.validate_rate.substr(2) + '%') || 0}`}
                                                                />
                                                            </div>
                                                        ))
                                                    }
                                                    <Row justify="space-around">
                                                        {
                                                            (data || []).slice(3, 5).map((item, index) => (
                                                                <Col span={6} key={index}>
                                                                    <Statistic
                                                                        title={item && item.name || ""}
                                                                        value={`${item && item.validate_rate && (item.validate_rate.substr(0, 2) + '.' + item.validate_rate.substr(2) + '%') || 0}`}
                                                                    />
                                                                </Col>
                                                            ))
                                                        }
                                                    </Row>
                                                </>
                                            )
                                        }
                                    }
                                </AutoRefresh>
                            </div>
                        </Card>
                        <Card className={styles['screen-card']} bordered={false} title="识别率最低TOP5设备">
                            <div className={styles.conBorBox}>
                                <div className={styles.bor}></div>
                                <div className={`${styles.line} ${styles.lineTop}`}></div>
                                <div className={`${styles.line} ${styles.lineBottom}`}></div>
                            </div>
                            <div style={{ height: '25vh' }}>
                                <AutoRefresh
                                    // services={() => hotelDataSearch({
                                    //     name: "data_rec_lower"
                                    // })}
                                >
                                    <BarIntegrality
                                        styles={{
                                            height: '100%',
                                            width: '100%'
                                        }}
                                    />
                                </AutoRefresh>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <div className={styles['screen-bottom']} >
                    <div className={styles.conBorBox}>
                        <div className={styles.bor}></div>
                    </div>
                    <div className={styles['screen-bottom-title']}>
                        数据存储
                    </div>
                    <div style={{ height: '10vh' }}>
                        {/*<Radio.Group defaultValue="a" className={styles["radio-group"]}>*/}
                        {/*<Radio.Button value="a">近一个月</Radio.Button>*/}
                        {/*<Radio.Button value="b">近一周</Radio.Button>*/}
                        {/*</Radio.Group>*/}
                        <AutoRefresh
                            // services={() => hotelGraphSearch({
                            //     created_ats: [moment().startOf('month').unix(), moment().endOf('month').unix()],
                            //     name: 'data_graph'
                            // })}
                        >
                            <BarNegative
                                styles={{
                                    height: '100%',
                                    width: '100%'
                                }}
                            />
                        </AutoRefresh>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Screen;