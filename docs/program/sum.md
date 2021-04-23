# JS 实现两个大数相加


```
JS 中整数的最大安全范围可以查到是：Number.MAX_SAFE_INTEGER = 9007199254740991
```

如果实现两个超过安全范围的数字相加，示例代码如下：

```
let a = "9007199254740991";
let b = "1234567899999999999";

function add(a, b) {
  const maxLength = Math.max(a.length, b.length); // 判断 a、b 谁更大

  a = a.padStart(maxLength, 0); // 将 a 前补0
  b = b.padStart(maxLength, 0); // 将 b 前补0

  console.log(a); // a = 0009007199254740991
  console.log(b); // b = 1234567899999999999

  // 从个位数开始逐个相加
  let sum = 0; // 每次相加的和
  let carry = 0;   //进位
  let totalSum = ''; // 总的相加后的和
  for (let i = maxLength - 1; i >= 0; i--) {
    sum = parseInt(a[i]) + parseInt(b[i]) + carry; // 运算当前的和
    carry = sum >= 10 ? 1 : 0; // 相加后是否需要进位, carry 待下次运算时再计入 sum 中
    totalSum = sum % 10 + totalSum; // 进位后剩下的余数加入总和中
  }

  // 最后一次进位后的数计入 sum 中
  if (carry == 1) {
    totalSum = "1" + totalSum;
  }
  return totalSum;
}

console.log(add(a, b)); // 1243575099254740990
```