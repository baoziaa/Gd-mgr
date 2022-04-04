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

export const clone = (obj) => { //完成一个自身拷贝的方法
  return JSON.parse(JSON.stringify(obj));
};


const timestampPadStart = (str) => {
  str = String(str);
  
  return str.padStart(2,'0');
};

// todo 格式化时间戳 并导出
export const formatTimestamp = (ts) => {
  // 获取当前时间，防止取到的是字符串，Number转换一下类型
  const date = new Date(Number(ts));

  // 取到年月份,月是从0开始的所以+1
  const YYYY = date.getFullYear();
  const MM = timestampPadStart(date.getMonth() + 1);
  const DD = timestampPadStart(date.getDate());

  // 取到时分秒
  const hh = timestampPadStart(date.getHours());
  const mm = timestampPadStart(date.getMinutes());
  const ss = timestampPadStart(date.getSeconds());

  return `${YYYY}/${MM}/${DD}`;
};

export const formatTimestampDetail = (ts) => {
  // 获取当前时间，防止取到的是字符串，Number转换一下类型
  const date = new Date(Number(ts));

  // 取到年月份,月是从0开始的所以+1
  const YYYY = date.getFullYear();
  const MM = timestampPadStart(date.getMonth() + 1);
  const DD = timestampPadStart(date.getDate());

  // 取到时分秒
  const hh = timestampPadStart(date.getHours());
  const mm = timestampPadStart(date.getMinutes());
  const ss = timestampPadStart(date.getSeconds());

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
};