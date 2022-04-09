import { defineComponent, ref, onMounted } from 'vue'; 
import * as echarts from 'echarts';

export default defineComponent({
  setup() {
    const chart = ref();
    
    function init () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(chart.value);

      // 指定图表的配置项和数据
      var option = {
        title: {
          // text: '毕业生毕业去向分类分布图'
        },
        tooltip: {},
        legend: {
          data: ['数据']
        },
        yAxis: {
          data: ['立即就业', '待定', '考研', '考公', '出国深造', '先实习一段时间']
        },
        xAxis: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '数据',
            type: 'bar',
            data: [15, 5, 10, 6, 0, 8],
            barWidth: '30%',
            itemStyle: {
              barBorderRadius: 1,
              borderType: 'solid',
            }
          },
          
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