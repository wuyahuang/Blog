# 异或

基于异或的数组元素交换


```
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

swap(array, 0, 1);
console.log(array);

function swap(array, i, j) {
  array[i] = array[i] ^ array[j];
  array[j] = array[i] ^ array[j];
  array[i] = array[i] ^ array[j];
}
```

警告：需要保证交换的两个值在内存中不是在同一块空间，否则就是同样一个位置的值在跟自己异或，会把该位置的值替换成 0。


应用：
在一个整数数组中，有一个数字出现了奇数次，其他数字出现了偶数次，请找出奇数次的数字。

```
let array = [3, 3, 3, 2, 2, 2, 2, 2, 2];

let final = array[0];

for (let i = 1; i < array.length; i++) {
  final = final ^ array[i];
}
console.log(final);
```