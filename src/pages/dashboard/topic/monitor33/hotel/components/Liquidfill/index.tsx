import React, { } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';

const Liquidfill = ({
    styles = {}
                    }) => {

    const getOptionMap = () => {
        return  {

            series: [{
                type: 'liquidFill',
                radius: '80%',
                data: [0.6],
                label: {
                    normal: {
                        // textStyle: {
                        color: 'red',
                        insideColor: 'yellow',
                        fontSize: 20
                        // }
                    }
                }
            }]
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

export default Liquidfill;