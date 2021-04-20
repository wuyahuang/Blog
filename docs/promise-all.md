
```
Promise.fakeAll = function (array) {
  return new Promise((resolve, reject) => {
    if (array.length == 0 || !Array.isArray(array)) { // 判断传入的数组
      return resolve(array);
    }

    let ret = [];
    for (let i in array) { // 遍历 Promise 数组
      (function () {
        Promise.resolve((array[i])).then((value) => { // 执行 promise resolve 函数，在 then 函数中统一将返回值写入 ret 数组
          ret.push(value);

          if (i == array.length - 1) { // 数组中所有 Promise 执行完毕，统一返回
            return resolve(ret);
          }
        }, (reason) => { // 只要有一个 Promise 报错，直接执行 reject 处理
          return reject(reason);
        });
      })();
    }
  });
}


const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log("all: " + values);
});
// expected output: Array [3, 42, "foo"]

Promise.fakeAll([promise1, promise2, promise3]).then((values) => {
  console.log("fake all: " + values);
});
```