# JavaScript 实现千位分隔符

将普通的数字转换为带千位分隔符格式的数字字符串是一个非常常见的问题，千位分隔符格式的规则是数字的整数部分每三位一组，以“，”分节。小数部分不分节 。
示例：19,351,235.235767

```
Number.prototype.dotFormart = function (targetLength) {

  targetLength = targetLength ? targetLength : 3; // 没有传参的话，默认执行千分位格式

  const number = (this + '').split("."); // 将小数点后面的数字预留出来

  let integer = number[0]; // 截取整数部分
  let integerArray = []; // 用于存储数字的数组
  let index = 0; // 用于标识当前是第几位

  // 从后往前遍历整数
  for (let i = integer.length - 1; i >= 0; i--) {
    index++;
    integerArray.push(integer[i]);
    // 如果 index == targetLength 并且 当前不是第一个数字，说明满足分割条件，往数组中写入逗号，同时重置 index
    if (index == targetLength && i != 0) {
      integerArray.push(",");
      index = 0;
    }
  }

  integerArray = integerArray.reverse().join('');

  // 将小数点后面的数组补回来
  if (number[1]) {
    integerArray = integerArray + '.' + number[1];
  }
  return integerArray;
}

let test1 = 123123456789.1234;
let test2 = 223123456789;

console.log('千分位');
console.log(test1.dotFormart(3));
console.log(test2.dotFormart(3));

console.log('');
console.log('万分位');
console.log(test1.dotFormart(4));
console.log(test2.dotFormart(4));
```