import { defineComponent, ref, onMounted } from 'vue'; 
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import chinaJson from '@/assets/data.json';
import { map } from '@/service';

export default defineComponent({
  setup() {
    const chart = ref();

    // console.log("map",chinaJson);

    echarts.registerMap('chinaJson',chinaJson);


    const testPoint = [
    {
      name: '北京市',
      value: [116.405285,39.904989,500]
    },
    {
      name: '上海市',
      value: [121.472644,31.231706,300]
    },
    {
      name: '浙江省',
      value: [120.153576,30.287459,200]
    },
    {
      name: '天津市',
      value: [117.190182,39.125596,800]
    },
    {
      name: '河北省',
      value: [114.502461,38.045474,100]
    },
    {
      name: '江苏省',
      value: [118.767413,32.041544,400]
    },
    {
      name: '重庆市',
      value: [106.504962,29.533155,300]
    },
    {
      name: '四川省',
      value: [104.065735,30.659462,100]
    },
    {
      name: '广东省',
      value: [113.280637,23.125178,800]
    },
  ]
    
    function init () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(chart.value);
      

      // 指定图表的配置项和数据
      var option = {
        title: {
          // text: '毕业生去向省份分布'
        },
        legend: {
          top: 'bottom'
        },
        geo: {
          type: 'map',
          map: 'chinaJson',
          /* itemStyle: {
            areaColor: '#0099ff',
            borderColor: '#00ffff',
            shadowColor: 'rgba(230,130,70,0.3)',
            shadowBlur: 30,
            emphasis: {
              focus: 'self',
            },
          }, */
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        tooltip: { //设置点的提示
          trigger: 'item',
        },
        /* visualMap: {
          type: 'continuous',
          min: 10,
          max: 500,
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d'],
          },
          textStyle: {
            color: '#fff',
          }
        }, */
        series: [
          {
            type: "effectScatter", //波纹散点图
            itemStyle: {
              color: 'purple',
            },
            coordinateSystem: 'geo',
            data: [
              {
                name: '北京市',
                value: [116.405285,39.904989,150]
              },
              {
                name: '上海市',
                value: [121.472644,31.231706,160]
              },
              {
                name: '浙江省',
                value: [120.153576,30.287459,20]
              },
              {
                name: '天津市',
                value: [117.190182,39.125596,80]
              },
              {
                name: '河北省',
                value: [114.502461,38.045474,100]
              },
              {
                name: '江苏省',
                value: [118.767413,32.041544,40]
              },
              {
                name: '重庆市',
                value: [106.504962,29.533155,30]
              },
              {
                name: '四川省',
                value: [104.065735,30.659462,10]
              },
              {
                name: '广东省',
                value: [113.280637,23.125178,180]
              },
            ],
            encode: {
              value: 2,
            },
            symbolSize:(val) => {
              // 坐标上的点缩小10倍
              return val[2]/10
            },
            label: {
              show: false, //隐藏
              position: 'right',
              formatter: function(v) { //获取城市名称和calue值
                return `${v.data.name} - ${v.data.value[2]}`
              }
            },
            emphasis: {
              label: {
                show: true, //光标移入显示
              }
            },
            hoverAnimation: true, //鼠标移入时的动画效果
            rippleEffect: {
              brushType: 'stroke', //空心波纹效果
              shadowBlur: 10, //z增加一些波纹阴影
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    };

    onMounted(() => {
      init();
      map.list();
    });

    return {
      chart,
    }
  }
})