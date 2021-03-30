# ES6 箭头函数二三事

ES6 剪头函数是传统函数不错的替代方案，但它并不适合所有场景。

## 区别 & 限制:

### 1.剪头函数没有它自己的 this 和 super，不能当成 [methods](https://developer.mozilla.org/en-US/docs/Glossary/Method) 使用

```
'use strict';

var obj = { // does not create a new scope
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log(this.i, this);
  }
}

obj.b(); // prints undefined, Window {...} (or the global object)
obj.c(); // prints 10, Object {...}
```

obj 没有创建新的作用域，所以剪头函数 b() 的 this 会到全局 window 中找，找不到返回 undefined



### 2.剪头函数没有 arguments 和 new.target 关键词

```
var arguments = [1, 2, 3];
var arr = () => arguments[0];

arr(); // 1

function foo(n) {
  var f = () => arguments[0] + n; // foo's implicit arguments binding. arguments[0] is n
  return f();
}

foo(3); // 3 + 3 = 6
```

剪头函数没有 arguments，会一直往上找剪头函数作用域的 arguments 对象



### 3.剪头函数不适用于 call、apply、bind 等方法，因为这些方法依赖于作用域

call、apply、bind 是为了函数在不同作用域下执行而设计的，但是箭头函数不绑定 this。

我们先来看下普通的函数是怎么运行的：

```
// A simplistic object with its very own "this".
var obj = {
    num: 100
}

// Setting "num" on window to show how it is NOT used.
window.num = 2020; // yikes!

// A simple traditional function to operate on "this"
var add = function (a, b, c) {
  return this.num + a + b + c;
}

// call
var result = add.call(obj, 1, 2, 3) // establishing the scope as "obj"
console.log(result) // result 106

// apply
const arr = [1, 2, 3]
var result = add.apply(obj, arr) // establishing the scope as "obj"
console.log(result) // result 106

// bind
var result = add.bind(obj) // establishing the scope as "obj"
console.log(result(1, 2, 3)) // result 106
```

再来看剪头函数的代码，add 在 window 作用域下被创建，因此 this 指向 window。

```
// A simplistic object with its very own "this".
var obj = {
    num: 100
}

// Setting "num" on window to show how it gets picked up.
window.num = 2020; // yikes!

// Arrow Function
var add = (a, b, c) => this.num + a + b + c;

// call
console.log(add.call(obj, 1, 2, 3)) // result 2026

// apply
const arr = [1, 2, 3]
console.log(add.apply(obj, arr)) // result 2026

// bind
const bound = add.bind(obj)
console.log(bound(1, 2, 3)) // result 2026
```

不管是 call、apply、bind，剪头函数一直都指向 window 作用域


### 4.剪头函数不能当成构造函数使用

如果把剪头函数当作构造函数使用，会抛出异常

```
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor
```

为啥呢？因为构造函数需要将 foo._proto_ 绑定到 Foo.prototype，而箭头函数没有 prototype，所以报错

```
var Foo = () => {};
console.log(Foo.prototype); // undefined
```


### 5.箭头函数内部不能使用 yield，也不能被当作 generators 使用
