import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

type VerificationTotalProps = {
    styles: object;
    data?: Array<{
        validate_total: string;
        created_at: number;
        validate_success_total: string;
    }>
};

const VerificationTotal: React.FC<VerificationTotalProps> = ({
    styles = {},
    data
}) => {

    useEffect(() => {
    }, []);  

    const defaultData = [
        {
            validate_success_total: '30',
            validate_total: '30',
            created_at: 1621987200
        },
        {
            validate_success_total: '50',
            validate_total: '70',
            created_at: 1622073600
        },
        {
            validate_success_total: '50',
            validate_total: '70',
            created_at: 1622160000
        },
        {
            validate_success_total: '50',
            validate_total: '70',
            created_at: 1622246400
        },
        {
            validate_success_total: '30',
            validate_total: '60',
            created_at: 1622332800
        }
    ]
    const getOptionMap = () => {
        return {
            legend: {
                // data: ['人证核验量', '人证核验成功量'],
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
                    name:  '人证核验成功量',
                    type: 'line',
                    stack: '总量',
                    data: (data?.length? data : defaultData).map(item => item.validate_total)
                },
                {
                    name: '人证核验量',
                    type: 'line',
                    stack: '总量',
                    data: (data?.length? data : defaultData).map(item => item.validate_success_total)
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

export default VerificationTotal;