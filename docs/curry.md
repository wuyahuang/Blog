# 手写 curry

柯里化，可以理解为提前接收部分参数，延迟执行，不立即输出结果，而是返回一个接受剩余参数的函数。因为这样的特性，也被称为部分计算函数。柯里化，是一个逐步接收参数的过程。

```
function curry(fn) {
  var args = Array.prototype.slice.call(arguments, 1); // 将参数初始化时传入的参数全部保存在内存里，等待后续使用
  return function () {
    var combinedArgs = args.concat(Array.prototype.slice.call(arguments)); // 再次调用函数时拼接参数

    if (combinedArgs.length < fn.length) {
      // 如果累计的参数还没有达到函数要求的数量，则继续等待
      return curry.call(this, fn, ...combinedArgs);
    } else {
      // 否则执行传入的 fn 函数
      return fn.apply(this, combinedArgs);
    }
  }
}

let _fn = curry(function (a, b, c, d, e) {
  console.log(a, b, c, d, e)
});

_fn(1, 2, 3, 4, 5); // print: 1,2,3,4,5
_fn(1)(2)(3, 4, 5); // print: 1,2,3,4,5
_fn(1, 2)(3, 4)(5); // print: 1,2,3,4,5
_fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5
```