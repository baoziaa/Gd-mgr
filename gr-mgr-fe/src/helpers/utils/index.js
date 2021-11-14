/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { message } from 'ant-design-vue';

export const result = (response, autoShowErrorMsg = true) => { // autoShowErrorMsg默认值true
  const { data } = response;// 拿到data

  if ((data.code === 0) && autoShowErrorMsg) {
    message.error(data.msg);
  }

  return { // retrun一个对象,对象里面有三个方法
    success(cb) { // 外面传一个回调函数进来cb
      if (data.code !== 0) {
        cb(data, response);

        return this; // 链式调用的效果,返回过去还是一个包含三个方法的对象
      }
    },
    fail(cb) {
      if (data.code === 0) {
        cb(data, response);
      }

      return this;
    },
    finally(cb) {
      cb(data, response);

      return this;
    },
  };
};
