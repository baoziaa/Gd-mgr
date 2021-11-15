import { defineComponent } from 'vue'; // todo defineComponentd代码提示

export default defineComponent({
  setup() {
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
    ]; // 它是一个数组,每一项代表每一列的配置项
    const dataSource = [
      {
        name: '小包',
        age: '2',
      },
    ]; // 它是指原始数据,每一项表示表格的一行
    return {
      columns,
      dataSource,
    };
  },
});
