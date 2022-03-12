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
          text: '高等院校毕业人数折线分析图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['先实习一段时间', '出国深造', '考公', '立即就业', '考研','待定']
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Number of graduates',
            type: 'line',
            stack: 'Total',
            data: [765, 795, 820, 834, 874, 909, 1076]
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