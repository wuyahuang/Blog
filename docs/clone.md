# Javascript 对象拷贝

Javascript 常用的对象拷贝有3种，赋值、浅拷贝、深拷贝


1. 赋值

```
const obj = {
  name: 'alice'
};
const copiedObj = obj;
copiedObj.name = 'bob';
console.log(obj);
console.log(copiedObj);
```

输出:

```
{ name: 'bob' }
{ name: 'bob' }

// copiedObj、obj 指向同一内存地址，copiedObj 修改以后，obj 也被修改。
```


2. JSON.parse

```
function Person() {
  this.name = 'Alice';
  this.gender = 0;
  this.birthday = new Date();
}
Person.prototype.age = 15;

const person1 = new Person();
console.log(person1);
console.log(person1.age);

let person2 = JSON.parse(JSON.stringify(person1));
console.log(person2);
console.log(person2.age);

```

输出:

```
Person { name: 'Alice', gender: 0, birthday: 2021-03-24T09:06:33.990Z }
15
{ name: 'Alice',
  gender: 0,
  birthday: '2021-03-24T09:06:33.990Z' } // 对象里的函数、正则、Date 等无法被正确拷贝
undefined // 无法拷贝 obj 对象原型链上的属性和方法
```


3. Object.assign

Object.assign 方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

```
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2

// 上面代码中，源对象obj1的a属性的值是一个对象，Object.assign拷贝得到的是这个对象的引用。
// 这个对象的任何变化，都会反映到目标对象上面。
```


Object.assign 遇到同名属性处理方法是替换，而不是添加。

```
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }

// 上面代码中，target对象的a属性被source对象的a属性整个替换掉了，
// 而不会得到{ a: { b: 'hello', d: 'e' } }的结果。这通常不是开发者想要的，需要特别小心。
```

Object.assign 可以用来处理数组，但是会把数组视为对象。

```
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]

// 上面代码中，Object.assign把数组视为属性名为 0、1、2 的对象，
// 因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。
```

Object.assign 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

```
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }

// 上面代码中，source对象的foo属性是一个取值函数，Object.assign不会复制这个取值函数，
// 只会拿到值以后，将这个值复制过去。
```

4. 手写深拷贝

```
function clone(target, map = new WeakMap()) {
  // 如果目标是对象
  if (typeof target === 'object') {
    // 传入的 target 是不是数组
    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};

    // 处理循环引用问题
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);

    // 获取 target 的 keys，数组直接返回 [0,1,2,3,4]
    let keys = Object.keys(target);
    let index = 0;
    const length = keys.length;
    // 遍历 target 进行复制
    while (index < length) {
      let key = keys[index];
      cloneTarget[key] = clone(target[key], map);
      index++;
    }

    return cloneTarget;
  } else {
    // 如果目标不是对象，则直接返回
    return target;
  }
}

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};

target.target = target;

console.time();
const result = clone(target);
console.timeEnd();
console.log(result);
```

输出:

```
{ field1: 1,
  field2: undefined,
  field3: { child: 'child' },
  field4: [ 2, 4, 8 ],
  f: { f: { f: [Object] } },
  target: [Circular] }
```

以上代码不完善，更多细节优化请参考 [如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)

参考资料:

[Object.assign()](https://www.jianshu.com/p/d5f572dd3776)

