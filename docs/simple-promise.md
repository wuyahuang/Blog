# 手写最简单 Promise


```
// Nodejs 版本最简单的 Promise
function newPromise(executor) {
  this.resolveQueue = [];    // Promise resolve时的回调函数集

  // 传递给 Promise 处理函数的 resolve
  const resolve = (value) => {
    this.data = value;
    process.nextTick(() => { // Nodejs 事件循环机制中，process.nextTick 优先于任务队列执行
      while (this.resolveQueue.length > 0) { // Promise 是否还有 then 函数
        const callback = this.resolveQueue.shift();
        callback(value);
      }
    });
  }
  executor(resolve);
}

// Promise 链式调用
newPromise.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.resolveQueue.push(() => {
      const result = onResolved(this.data);
      result instanceof Promise ? result.then(resolve) : resolve(result);
    });
  });
};

const test = new newPromise((resolve) => {
  setTimeout(() => {
    resolve('aaaa');
  }, 1);
});

test.then((result) => {
  console.log(result);
}, (error) => {
  console.log(error);
});
```