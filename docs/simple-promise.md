
```
// 定义 Promise 三个状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise2(executor) {
  // 初始化新的 Promise
  this.status = PENDING;
  this.data = null;
  this.callbacks = [];

  const resolve = (value) => {
    if (this.status == PENDING) {
      this.status = FULFILLED;
      this.data = value;
      // 异步执行 resolve
      setTimeout(() => {
        // 从 callbacks 取出 then 的成功回调函数
        while (this.callbacks.length > 0) {
          const callback = this.callbacks.shift();
          callback.onFulfilled(value);
        }
      });
    }
  }

  const reject = (value) => {
    if (this.status == PENDING) {
      this.status = REJECTED;
      this.data = value;
      // 异步执行 reject
      setTimeout(() => {
        // 从 callbacks 取出 then 的失败回调函数
        while (this.callbacks.length > 0) {
          const callback = this.callbacks.shift();
          callback.onRejected(value);
        }
      });
    }
  }

  executor(resolve, reject);
}

Promise2.prototype.then = function (onFulfilled, onRejected) {
  return new Promise2((resolve, reject) => {
    // 当 Promise 状态未更新时，将 then 回调函数全部压入 callbacks 数组中
    if (this.status == PENDING) {
      this.callbacks.push({
        onFulfilled: onFulfilled,
        onRejected: onRejected
      });
    }

    // 执行 then 成功回调函数
    if (this.status == FULFILLED) {
      onFulfilled(this.data);
    }

    // 执行 then 失败回调函数
    if (this.status == REJECTED) {
      onRejected(this.data);
    }
  })
};


const test = new Promise2((resolve, reject) => {
  setTimeout(() => {
    resolve('aaa');
    reject('bbb');
  });
});

test.then((result) => {
  console.log(result);
  return 'ccc';
}, (error) => {
  console.log(error);
});
```