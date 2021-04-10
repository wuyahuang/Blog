# Javascript 判断是否为质数


大于等于 5 的质数一定和 6 的倍数相邻。例如 5 和 7，11 和 13,17 和 19。

```
Number.prototype.isPrime = function () {
  if (this == 2 || this == 3) {
    return true;
  }

  // 不在6的倍数两侧的一定不是质数
  if (this % 6 != 1 && this % 6 != 5) {
    return false;
  }
  let tmp = Math.sqrt(this);
  // 在6的倍数两侧的也可能不是质数
  for (let i = 5; i <= tmp; i += 6)
    if (this % i == 0 || this % (i + 2) == 0)
      return false;
  // 排除所有，剩余的是质数
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