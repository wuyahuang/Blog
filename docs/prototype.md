# Javascript 之原型链

Javascript 对象的原型链关系图如下所示：

![prototype](../assets/prototype.png)

图片源自[https://github.com/mqyqingfeng/Blog/issues/2](https://github.com/mqyqingfeng/Blog/issues/2)


```
function Person() {

}

Person.prototype.name = 'Kevin'
Object.prototype.name = 'Bob'

var person = new Person()

person.name = 'Daisy'
console.log(person.name) // Daisy

delete person.name
console.log(person.name) // Kevin

delete Person.prototype.name
console.log(person.name) // Bob


console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true

console.log(Person.prototype.__proto__ == Object.prototype)
console.log(Person.prototype.__proto__.constructor == Object)
```

```
Daisy
Kevin
Bob
true
true
true
true
```

如示例代码运行结果所示，在打印 person.name 时，运行程序会依次往上查询对应的 name 属性。实例对象 person 没有的话，就去找 Person.prototype，再没有就去找 Object.prototype，依次往上一级查询。
