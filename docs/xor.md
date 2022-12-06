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