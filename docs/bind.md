# 手写 bind

一句话介绍 bind:

```
bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
```

如果不需要支持 new 构造函数的话，bind 其实非常简单:

```
if (!Function.prototype.bind2) (function () {
  var slice = Array.prototype.slice;
  Function.prototype.bind2 = function () {
    var self = this;
    // 检查调用 bind2 的是不是函数
    if (typeof self !== 'function') {
      throw new TypeError('Function.prototype.bind - ' +
        'what is trying to be bound is not callable');
    }
    var context = arguments[0]; // 调用 bind 时传入的 context
    var args = slice.call(arguments, 1); // 调用 bind 时传入的参数
    return function () {
      // 这里是一个闭包，上面的 args 在调用 bind 以后，实际执行时依然可以访问到
      var funcArgs = args.concat(slice.call(arguments)) // 将 bind 时传入的参数与实际执行时传入的参数合并
      return self.apply(context, funcArgs);
    };
  };
})();
var value = 2;

var foo = {
  value: 1
};

function bar(name, age) {
  console.log(this.value);
}

var bindFoo = bar.bind2(foo);

var obj = new bindFoo('18'); // 1
```

如果要支持 new 构造函数的话，也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值需要失效，但传入的参数依然生效。

以上面的代码为例，new bindFoo('18')时，this 不应该再指向 foo。所以上面的代码要再改改:

```
Function.prototype.bind2 = function () {
  if (typeof this != 'function') {
    throw new error('init failed.');
  }

  var self = this;
  var context = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);// 调用 bind 时传入的参数

  var bound = function () {
    var conbinedArgs = Array.prototype.slice.call(arguments);// 将调用 bind 时传入的参数与实际使用时传入的参数合并在一起
    return self.apply(this instanceof fNOP ? this : context, args.concat(conbinedArgs));
  }

  // 将 bound 的 prototype 指向 this.prototype
  var fNOP = function () { };
  fNOP.prototype = this.prototype;
  bound.prototype = new fNOP();
  return bound;
}

var value = 2;

var foo = {
  value: 1
};

function bar(name, age) {
  console.log('executed.');
  console.log(this.value);
}

var bindFoo = bar.bind2(foo);

var obj = new bindFoo('18'); // undefined
```