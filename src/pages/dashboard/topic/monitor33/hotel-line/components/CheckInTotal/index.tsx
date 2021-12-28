import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

type CheckInTotalProps = {
    styles: object;
    data?: Array<{
        check_in_total: string;
        validate_total: string;
        created_at: number;
    }>
};

const CheckInTotal: React.FC<CheckInTotalProps> = ({
    styles = {},
    data
}) => {
    useEffect(() => {
    }, []);
    
    const defaultData = [
        {
            check_in_total: '50',
            validate_total: '70',
            created_at: 1621987200
        },
        {
            check_in_total: '50',
            validate_total: '70',
            created_at: 1622073600
        },
        {
            check_in_total: '50',
            validate_total: '70',
            created_at: 1622160000
        },
        {
            check_in_total: '50',
            validate_total: '70',
            created_at: 1622246400
        },
        {
            check_in_total: '30',
            validate_total: '60',
            created_at: 1622332800
        }
    ]
    const getOptionMap = () => {
        return {
            legend: {
                // data: ['人证核验量', '入住量'],
                textStyle: {
                    color: 'rgba(79, 217, 252, 1)'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            color: ['#4DF6A2', '#4FD9FC'],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: (data?.length? data : defaultData).map(item => item && item.created_at && moment(item.created_at * 1000).format('YYYY-MM-DD'))
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '人证核验量',
                    type: 'line',
                    stack: '总量',
                    data: (data?.length? data : defaultData).map(item => item.validate_total)
                },
                {
                    name: '入住量',
                    type: 'line',
                    stack: '总量',
                    data: (data?.length? data : defaultData).map(item => item.check_in_total)
                }
            ]
        };
    };

    return (
        <ReactEcharts
            option={getOptionMap()}
            style={styles}
        />
    )
};

export default CheckInTotal;