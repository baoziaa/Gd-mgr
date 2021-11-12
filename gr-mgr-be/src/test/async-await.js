//promise


/* const fn = async () => {
  return 1;
};


fn().then((res) => {
  console.log(res);
})
 */


/* const request = (arg,cb) => {
  setTimeout(() => {
    console.log(arg);
    cb(arg + 1);
  },300);
};


request(1,function(res){
  console.log('res',res);
}) */

/* 
const request = (arg,isReject) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if(isReject) {
        reject('出错了');
        return;
      }
      console.log(arg);
      resolve(arg + 1);
    },300);
  });
};

request(1)
  .then((res1) => {
    return request(res1,true)
  })
  .catch((msg) => {
    console.log(msg);
  })
  .then((res2) => {
    return request(res2)
  })
  .then((res3) => {
    return request(res3)
  })
  .then((res4) => {
    return request(res4)
  })
  .then((res5) => {
    console.log('res5:',res5)
  })
 */

  /* const request = (arg,isReject) => {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        if(isReject) {
          reject('出错了');
          return;
        }
        console.log(arg);
        resolve(arg + 1);
      },300);
    });
  }; */

  const request = (arg,isReject) => {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        if(isReject){
          console.log("出错了!")
        }
        console.log(arg);
        resolve(arg + 1);
      },1000);
    });
  };

  const fn = async () => {
    const res1 = await request(1);
    const res2 = await request(res1);
    const res3 = await request(res2);
    const res4 = await request(res3);
    const res5 = await request(res4);

    console.log(res5);
  }

  fn();
