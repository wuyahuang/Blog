# 手写继承

目前最常用的继承是寄生组合式继承,看代码:

```
// 定义父对象 Car
function Car(name) {
  this.name = name;
  this.color = 'white';
}

// 定义父对象Car 的 getName 方法
Car.prototype.getName = function () {
  console.log(this.name);
}

// 定义子对象 Toyota
function Toyota(name, serviceLife) {
  Car.call(this, name);
  this.serviceLife = serviceLife;
}

// 将子对象 prototype 指向父对象 Car
// 通过 F 来中转的目的是，隔离多个子对象同时对 Car.prototype 产生影响
// 比如我定义一个 Toyota.prototype.sayHi，这个 sayHi 方法也会出现在 Car.prototype 中
// 也可以通过 Object.create 实现，Toyota.prototype = Object.create(Car.prototype);
var F = function () { };
F.prototype = Car.prototype;
Toyota.prototype = new F();

var camry = new Toyota('camry', 2);

console.log(camry);
```

引用《JavaScript高级程序设计》中对寄生组合式继承的夸赞就是：

这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
