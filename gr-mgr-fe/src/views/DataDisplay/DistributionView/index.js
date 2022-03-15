import { defineComponent, ref, onMounted } from 'vue'; 
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import chinaJson from '../../../assets/data.json';

export default defineComponent({
  setup() {
    const chart = ref();

    echarts.registerMap('chinaJson',chinaJson);

    const testPoint = [{
      name: '北京市',
      value: [116.405285,39.904989,500]
    },
    {
      name: '上海市',
      value: [121.472644,31.231706,300]
    },
  ]
    
    function init () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(chart.value);
      

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '毕业生去向省份分布'
        },
        legend: {
          top: 'bottom'
        },
        series: [
          {
            type: 'map',
            map: 'chinaJson',
            data: testPoint
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    };

    onMounted(() => {
      init();
    });

    return {
      chart,
    }
  }
})