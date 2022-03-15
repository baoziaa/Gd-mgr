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
          text: '毕业生毕业去向单位性质分布图'
        },
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: 40, name: '国有企业' },
              { value: 38, name: '民营企业' },
              { value: 32, name: '合资企业' },
              { value: 30, name: '外商独资企业' },
              { value: 28, name: '政府机关' },
              { value: 26, name: '事业单位' },
              { value: 22, name: '自由职业' },
              { value: 18, name: '待业' }
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