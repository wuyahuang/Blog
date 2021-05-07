# Javascript Event Loop


<img src="../assets/event-loop.png" alt="avatar" width="75%" height="75%">

* [Javascript 事件循环机制](https://cloud.tencent.com/developer/article/1332957)


Node.js 与浏览器的主要区别


测试代码：

```
setImmediate(() => console.log('immediate1'));
setImmediate(() => {
  console.log('immediate2')
  Promise.resolve().then(() => console.log('promise resolve'))
});
setImmediate(() => console.log('immediate3'));
setImmediate(() => console.log('immediate4'));
```

上述代码在 Chrome 以及 Node 11 运行结果为：

```
timeout1
timeout2
promise resolve
timeout3
timeout4
```

在 Node 10 运行结果为：

```
timeout1
timeout2
timeout3
timeout4
promise resolve
```


* node 11 之前的版本，宏任务里面的微任务会在所有宏任务队列执行完成以后再执行
* node 11 之后的版本，宏任务里面的微任务会在当前宏任务中立即执行
