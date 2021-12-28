import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
type TotalSourceProps = {
    styles: object;
    data?: any;
};

const TotalSource: React.FC<TotalSourceProps> = ({
    styles = {},
    data
}) => {
    const [wsArr, setWsArr] = useState([])
    const [nsArr, setNsArr] = useState([])

    useEffect(() => {
        handleFunelDate()
    }, [data]);

    const defaultWSData = {
        check_in_total: 100,
        pic_total: 20,
        validate_total: 40,
        person_db_total: 60,
        rec_total: 80
    }
    const defaultNSData = {
        check_in_total: 100,
        pic_total: 15,
        validate_total: 35,
        face_db_total: 65,
        rec_total: 80
    }

    const handleFunelDate = async () => {
        const { ns_pyramid = defaultNSData, ws_pyramid = defaultWSData } = data
        const wsArr: any = await getWsDate(ws_pyramid)
        const nsArr:any = await getNsDate(ns_pyramid)
        setWsArr(wsArr)
        setNsArr(nsArr)
        getOptionMap()
    }

    const getWsDate = (params) => {
        if (Object.keys(params).length > 0) {
            return [
                { name: '入住数', value: params.check_in_total },
                { name: '照片数', value: params.pic_total },
                { name: '认证核验数', value: params.validate_total },
                { name: '人像基础库数', value: params.person_db_total },
                { name: '识别数', value: params.rec_total }
            ]
        } else {
            return []
        }
    }

    const getNsDate = (params) => {
        if (Object.keys(params).length > 0) {
            return [
                { name: '入住数', value: params.check_in_total },
                { name: '照片数', value: params.pic_total },
                { name: '认证核验数', value: params.validate_total },
                { name: '人脸库数', value: params.face_db_total },
                { name: '识别数', value: params.rec_total }
            ]
        } else {
            return []
        }
    }

    const getOptionMap = () => {

        return {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}"
            },
            grid: {
                top: '5%',
                right: '10%',
                bottom: '10%',
                left: '5%'
            },
            color: ['#005FDC', '#004baf', '#004baf', '#4CA3DC', '#6CC5DC'],
            series: [
                {
                    type: 'funnel',
                    width: '45%',
                    height: '100%',
                    min: 0,
                    max: 100,
                    left: 0,
                    top: 0,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside',
                        color: '#fff'
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: 'transparent',
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    data: wsArr

                },
                {
                    type: 'funnel',
                    width: '45%',
                    left: '55%',
                    height: '100%',
                    top: 0,
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside',
                        color: '#fff'
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: 'transparent',
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    data: nsArr
                }
            ]
        };
    };

    return (
        <div>
            <ReactEcharts
                option={getOptionMap()}
                style={styles}
            />
        </div>
    )
};

export default TotalSource;