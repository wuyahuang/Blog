# Object.create VS new Object()

在 Javascript 中创建新的实例，我们可以通过 Object.create() 或者 构造函数 new Object()来实现。

这两最大的区别是什么呢？简单来说：

new X() = Object.create(X.prototype) + 执行 constructor 构造函数

看如下代码：

```
const Person = function () {
  this.name = "Alice";
};

Person.prototype.sayHello = function () {
  return "hello!";
};

const person1 = new Person();
const person2 = Object.create(Person.prototype, {
  "gender": {
    value: "male",
    writable: true
  }
});

// person1
console.log("person1.name: " + person1.name);// Alice
console.log("person1.sayHello: " + person1.sayHello());// hello
console.log("person1.gender: " + person1.gender);// undefined

// person2
console.log("person2.name: " + person2.name);// undefined
console.log("person2.gender: " + person2.gender);// male
console.log("person2.sayHello: " + person2.sayHello());// hello
```

从代码输出可以看出 name 只有在 person1 中存在，为什么 person2 没有？因为 person2 在创建时只绑定了 Person 的 prototype，并没有执行构造函数。同时我们也可以看到 person1 没有 gender，因为 gender 是在 person2 创建时添加的。

再来看看它们内部运行时发生了啥。

new Test():

```
let obj = new Object();
obj.__proto__ = Test.prototype;
return Test.call(obj) || obj;
```

Object.create(Test):

```
let obj = new Object();
obj.__proto__ = Test.prototype;
return obj;
```

因此我们可以知道 Object.create 不会执行构造函数。
