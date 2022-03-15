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
          text: '毕业生毕业薪资饼分布图'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '3k~5k' },
              { value: 735, name: '5k~7k' },
              { value: 580, name: '7k~1w' },
              { value: 484, name: '1w~2w' },
              { value: 300, name: '2w以上' }
            ]
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