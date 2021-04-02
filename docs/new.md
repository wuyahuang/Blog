# 手写 new

一句话介绍 new:
```
new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
```

代码示例:
```
function objectFactory(fn) {
  var obj = new Object(); // 新建一个对象
  obj.__proto__ = fn.prototype; // 新对象的原型指向 fn
  var result = fn.apply(obj, Array.prototype.slice.call(arguments, 1)); // 将 fn 的上下文运行环境绑定至 obj
  // 判断被 new 的函数返回值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们返回 obj
  return typeof result === 'object' ? result : obj;
};


function Person(name, age) {
  this.strength = 60;
  this.age = age;

  return {
    name: name,
    habit: 'Games'
  }
}

var person1 = objectFactory(Person, 'Kevin', '18');
console.log(person1.name) // undefined
console.log(person1.habit) // undefined
console.log(person1.strength) // 60
console.log(person1.age) // 18

var person2 = new Person('Kevin', '18');
console.log(person2.name) // undefined
console.log(person2.habit) // undefined
console.log(person2.strength) // 60
console.log(person2.age) // 18
```