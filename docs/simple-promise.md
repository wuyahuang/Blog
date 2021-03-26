# 手写最简单 Promise


```
// Nodejs 版本最简单的 Promise
function newPromise(executor) {
  this.resolveQueue = []; // Promise resolve 时的回调函数集
  this.rejectQueue = [];  // Promise rejecet 时的回调函数集

  // 传递给 Promise 处理函数的 resolve
  const resolve = (value) => {
    this.data = value;
    process.nextTick(() => { // Nodejs 事件循环机制中，process.nextTick 优先于异步任务队列执行
      while (this.resolveQueue.length > 0) { // Promise 是否还有 then 函数
        const callback = this.resolveQueue.shift(); // 取出第一个回调函数
        callback(value);
      }
    });
  }

  // 传递给 Promise 处理函数的 reject 

  const reject = (value) => {
    this.data = value;
    process.nextTick(() => { // Nodejs 事件循环机制中，process.nextTick 优先于异步任务队列执行
      while (this.rejectQueue.length > 0) {
        const callback = this.rejectQueue.shift(); // 取出第一个回调函数
        callback(value);
      }
    });
  }
  executor(resolve, reject); // 执行 new Promise 时传入的函数
}
// Promise 链式调用
newPromise.prototype.then = function (resolveFunction, rejectFunction) {
  // 返回新的 Promise用于链式调用
  return new Promise((resolve, reject) => {
    const onResolved = (value) => {
      try {
        //执行第一个(当前的)Promise 的成功回调,并获取返回值
        let result = resolveFunction(value);
        // 如果返回值是 Promise，则调用下一个 then
        // 如果返回值不是 Promise，则直接 resolve
        result instanceof newPromise ? result.then(resolve, reject) : resolve(result);
      } catch (error) {
        reject(error);
      }
    }
    //把后续 then 收集的依赖都 push 进当前 Promise 的成功回调队列中(resolveQueue), 这是为了保证顺序调用
    this.resolveQueue.push(onResolved);

    // reject 于 resolve 流程类似
    const onRejected = (value) => {
      try {
        let result = rejectFunction(value);
        result instanceof newPromise ? result.then(resolve, reject) : resolve(result);
      } catch (error) {
        reject(error);
      }
    }
    this.rejectQueue.push(onRejected);
  });
};

const test = new newPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('aaa');
    reject('bbb');
  }, 1);
});

test.then((result) => {
  console.log(result);
}, (error) => {
  console.log(error);
});
```