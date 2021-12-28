import React, {} from 'react';
import styles from './index.less';
import TotalStatistics from './components/TotalStatistics';
import {
    Row,
    Col,
    Card,
    Statistic,
    Progress
} from 'antd';
import BarNegative from './components/BarNegative';
import Map from './components/Map';
import TotalProportion from './components/TotalProportion';
import { Bullet } from '@ant-design/charts';
import ServiceCard from './components/ServiceCard';
import Pie from './components/Pie';

const Screen = () => {

    var data = [
        {
            title: '商汤',
            ranges: [30, 90, 120],
            measures: [65],
            target: 80,
        },
        {
            title: '依图',
            ranges: [30, 90, 120],
            measures: [50],
            target: 100,
        },
        {
            title: '科达',
            ranges: [30, 90, 120],
            measures: [40],
            target: 85,
        },
        {
            title: '百度',
            ranges: [30, 90, 120],
            measures: [50],
            target: 100,
        },
    ];
    var config: any = {
        data: data,
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        color: {
            range: ['#FFB1AC', '#FFDBA2', '#B4EBBF'],
            measure: '#5B8FF9',
            target: '#5B8FF9',
        },
        label: {
            measure: {
                position: 'middle',
                style: { fill: '#fff' },
            },
        },
        xAxis: { line: null },
        yAxis: false,
        legend: {
            custom: true,
            position: 'bottom',
            items: [
                {
                    value: '差',
                    name: '差',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#FFB1AC',
                            r: 5,
                        },
                    },
                },
                {
                    value: '良',
                    name: '良',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#FFDBA2',
                            r: 5,
                        },
                    },
                },
                {
                    value: '优',
                    name: '优',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#B4EBBF',
                            r: 5,
                        },
                    },
                },
                {
                    value: '国际编码正常率',
                    name: '国际编码正常率',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#5B8FF9',
                            r: 5,
                        },
                    },
                }
            ],
        },
    };

    return (
        <div className={styles.screen}>
            <header>
                <h2>苏州城市盾牌感知数据治理</h2>
            </header>
            <div className={styles["header-total"]}>
                <Row gutter={32} justify="space-around" align="middle" style={{height: '5vh'}}>
                    <Col span={4} style={{ height: '100%' }}>
                        <TotalStatistics
                            icon="camera"
                            title="累计路数"
                            total={
                                <span>
                                    <span>
                                        58003台
                                    </span>
                                </span>
                            }
                        />
                    </Col>
                    <Col span={4} style={{ height: '100%' }}>
                        <TotalStatistics
                            icon="internet"
                            title="互联网"
                            total={
                                <span>10W</span>
                            }
                            comparison={
                                <span>
                                    <span className={styles.up}>

                                    </span>
                                    <span style={{color: 'red'}}>5482</span>
                                </span>
                            }
                        />
                    </Col>
                    <Col span={4} style={{ height: '100%' }}>
                        <TotalStatistics
                            icon="network"
                            title="视频网"
                            total={
                                <span>11W</span>
                            }
                            comparison={
                                <span>
                                    <span className={styles.dowm}>
                                    </span>
                                <span style={{color: 'green'}}>3482</span>
                                </span>
                            }
                        />
                    </Col>
                    <Col span={4} style={{ height: '100%' }}>
                        <TotalStatistics
                            icon="access"
                            title="公安网"
                            total={
                                <span>5W</span>
                            }
                            comparison={
                                <span>
                                    <span className={styles.up}>
                                    </span>
                                <span style={{color: 'red'}}>482</span>
                                </span>
                            }
                        />
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: '1vh'}}>
                <Row>
                    <Col span={6}>
                        <Card className={styles['screen-card']} bordered={false} title="设备在线">
                            <div style={{ height: '27vh' }}>
                                <BarNegative
                                    styles={{
                                        height: '27vh',
                                        width: '100%'
                                    }}
                                />
                            </div>
                        </Card>
                        <Card className={styles['screen-card']} bordered={false} title="质量监测">
                            <div style={{ height: '20vh' }}>
                                <Bullet
                                    {...config}
                                />
                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Map
                            styles={{
                                height: '100%'
                            }}
                        />
                    </Col>
                    <Col span={6}>
                        <Card className={styles['screen-card']} bordered={false} title="数据共享">
                            <div style={{ height: '27vh' }}>
                                <Row>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="百度"
                                            total={
                                                <span>5897/81%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="金盾"
                                            total={
                                                <span>5297/81%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="依图"
                                            total={
                                                <span>3423/85%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="城之瞳"
                                            total={
                                                <span>4323/84%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="yellow"
                                            title="商汤"
                                            total={
                                                <span>3425/67%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="任子行"
                                            total={
                                                <span>7643/93%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="科达"
                                            total={
                                                <span>6443/88%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="yellow"
                                            title="新奕软件"
                                            total={
                                                <span>3453/63%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="中软"
                                            total={
                                                <span>6434/89%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="耐思捷"
                                            total={
                                                <span>7845/93%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="以萨"
                                            total={
                                                <span>5297/78%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="聚合"
                                            total={
                                                <span>4235/78%</span>
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <TotalProportion
                                            icon="green"
                                            title="华为"
                                            total={
                                                <span>7234/93%</span>
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                        <div className={styles['screen-service-card']}>
                            <div className={styles['screen-service-card-title']}>
                                服务
                            </div>
                           <div style={{ height: '20vh' }}>
                               <Row justify="space-around" style={{ marginBottom: '1vh' }}>
                                   <Col span={8}>
                                       <ServiceCard
                                           title="接入服务"
                                       >
                                           <Pie
                                               styles={{
                                                   height: '6vh',
                                                   width: '100%'
                                               }}
                                           />
                                       </ServiceCard>
                                   </Col>
                                   <Col span={8}>
                                       <ServiceCard
                                           title="转发服务"
                                       >
                                           <Pie
                                               styles={{
                                                   height: '6vh',
                                                   width: '100%'
                                               }}
                                           />
                                       </ServiceCard>
                                   </Col>
                               </Row>
                               <Row>
                                   <Col span={8}>
                                       <ServiceCard
                                           title="文件服务"
                                       >
                                           <Pie
                                               styles={{
                                                   height: '6vh',
                                                   width: '100%'
                                               }}
                                           />
                                       </ServiceCard>
                                   </Col>
                                   <Col span={8}>
                                       <ServiceCard
                                           title="队列服务"
                                       >
                                           <Pie
                                               styles={{
                                                   height: '6vh',
                                                   width: '100%'
                                               }}
                                           />
                                       </ServiceCard>
                                   </Col>
                                   <Col span={8}>
                                       <ServiceCard
                                           title="统计服务"
                                       >
                                           <Pie
                                               styles={{
                                                   height: '6vh',
                                                   width: '100%'
                                               }}
                                           />
                                       </ServiceCard>
                                   </Col>
                               </Row>
                           </div>
                        </div>
                    </Col>
                </Row>
                <div className={styles['screen-bottom']}>
                    <div className={styles['screen-bottom-title']}>
                        资源库
                    </div>
                    <Row justify="space-around">
                        <Col span={4}>
                           <div style={{ display: 'flex'}}>
                               <Statistic title="路人库" value={84753843} />
                           </div>
                        </Col>
                        <Col span={4}>
                            <Statistic title="车辆" value={84753843} />

                        </Col>
                        <Col span={4}>
                            <Statistic title="重点人员" value={84753843} />

                        </Col>
                        <Col span={4}>
                            <Statistic title="在逃库" value={84753843} />

                        </Col>
                        <Col span={4}>
                        </Col>
                    </Row>
                </div>

            </div>
        </div>
    );
};

export default Screen;