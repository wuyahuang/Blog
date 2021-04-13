# Javascript 判断是否为质数


大于等于 5 的质数一定和 6 的倍数相邻。例如 5 和 7，11 和 13,17 和 19。

```
// 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53
Number.prototype.isPrime = function () {
  if (this == 2 || this == 3) {
    return true;
  }

  // 如果数字不在 6 的倍数的两侧，说明不是质数，比如4、8、10、14、16
  if (this % 6 != 1 && this % 6 != 5) {
    return false;
  }

  // 6 的倍数两侧也有可能不是质数，比如 25, 35, 45
  let tmp = Math.sqrt(this);
  // 如果数字可以整数 5，7，11，13 这些质数，说明它不是质数
  for (let i = 5; i <= tmp; i = i + 6) {
    if (this % i == 0 || this % (i + 2) == 0) {
      return false;
    }
  }

  return true;
}


console.log((2).isPrime());
console.log((3).isPrime());
console.log((4).isPrime());
console.log((5).isPrime());
console.log((6).isPrime());
console.log((7).isPrime());
console.log((8).isPrime());
console.log((9).isPrime());
console.log((10).isPrime());
```