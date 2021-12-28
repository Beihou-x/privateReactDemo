import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import geoJson from "@/assets/mapjson/320500.json";
import * as echarts from "echarts";
import { unusualDevice, areaUnusualDeviceNum } from "@/services/feel_view";
import Event from "@/utils/eventEmitter";

const Map = (props) => {
  const { data = [],getDeviceTop5, getPlaceName } = props;
  useEffect(() => {
    let arr = (data|| []).map((item) => {
      return {
        name: item.k1,
        value: item.k3,
        code: item.k2,
      };
    });
    setMapData(arr);
  }, [data]);

  const [code, setCode] = useState("");
  useEffect(() => {
    if (code) {
      getUnusualDevice(code);
      // getDeviceTop5({place_code:code});

    }
  }, [code]);

  const [mapData, setMapData] = useState([]);
  const [areaUnusualDevice, setAreaUnusualDevice]:any = useState([]);

  echarts.registerMap("SUZHOU", geoJson as any);
  const styles = {
    width: "100%",
    height: "773px",
  };

  const getUnusualDevice = (code) => {
    areaUnusualDeviceNum(code).then((res) => {
      setAreaUnusualDevice(res.abnormalDeviceByUnit)
    });
  };

  const getOptionMap = () => {
    return {
      tooltip: {
        padding: 0,
        enterable: true,
        transitionDuration: 1,
        textStyle: {
          color: "#fff",
          decoration: "none",
        },
        // position: function (point, params, dom, rect, size) {
        //   return [point[0], point[1]];
        // },
        //  formatter: function(params) {
        //     if(params.value){
        //         return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value + '个&nbsp;&nbsp;';
        //     }else{
        //         return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;0个&nbsp;&nbsp;';
        //     }
        // }
        formatter: function (params) {
          var tipHtml = "";
          tipHtml =
            `<div style="min-width: 264px;height: 140px;border:1px solid #2B3548;background: #2B3548;padding: 10px;">
            ${params.name} (异常设备 / 设备总数)
              <div style="display:flex; justify-content: space-between;padding:0 20px ;">
                ${
                  params.data ? 
                  areaUnusualDevice.map((item,index) =>
                    `<div key={${index}} style="margin: 10px 20px">
                      <p>人卡 : ${item.k5} / ${item.k3}</p>
                      <p> 超卡 : ${item.k6} / ${item.k4}</p>
                      <p> 其他 : ${item.k8} / ${item.k7}</p>
                    </div>`
                  )
                  : 
                  `<div>
                    <p>人卡:0</p>
                    <p> 超卡:0</p>
                  </div>`
                }
                
              </div>
              
            </div>
            `
          return tipHtml;
          // getToolTip(params);
        },
      },
      grid: {
        top: "10%",
        // left: "10%",
        // right: "5%",
        // bottom: "15%",
        // containLabel: true
      },
      geo: {
        map: "SUZHOU",
        show: true,
        roam: false,
        label: {
          emphasis: {
            show: true,
          },
        },
        itemStyle: {
          normal: {
            show: false,
          },
        },
      },
      series: [
        {
          type: "map",
          map: "SUZHOU",
          aspectScale: 0.75,
          //zoom:1.1,
          label: {
            normal: {
              formatter: function (para) {
                return "{name|" + para.name + "}";
              },
              rich: {
                cnNum: {
                  fontSize: 11,
                  color: "#fff",
                  align: "center",
                },
                name: {
                  fontSize: 11,
                  color: "#ffff",
                  align: "center",
                  lineHeight: 20,
                },
              },
              //formatter: '{b}',
              color: "#fff",
              show: true,
            },
            emphasis: {
              textStyle: {
                color: "#fff",
              },
            },
          },
          itemStyle: {
            normal: {
              areaColor: "rgba(4, 159, 207, 0.4)",
              borderColor: "#049FCF",
              borderWidth: 1,
            },
            emphasis: {
              areaColor: "rgba(255, 219, 92, 0.4)",
              borderColor: "#FFDB5C",
              textStyle: {
                color: "#fff",
              },
            },
          },
          data: mapData,
        },
      ],
    };
  };
  const events = {
    mouseover: (params) => {
      if (params.data) {
        setCode(params.data.code);
        // getPlaceName(params.data.name)
      }
    },
  };
  return (
    <div>
      <ReactEcharts option={getOptionMap()} style={styles} onEvents={events} />
    </div>
  );
};

export default Map;
