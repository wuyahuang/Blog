# Javascript 数组去重

```
Array.prototype.unique = function (isSorted) {
  let res = []; // 元素唯一的数组
  let seen; // 最后一个见过的元素
  for (let i = 0; i < this.length; i++) {
    let item = this[i]; // 当前处理的元素
    item = typeof item == 'string' ? item.toLowerCase() : item; // 如果当前元素是 string 类型，则将其专程小写字母

    // 如果传入的数组是无序的，则通过 indexOf 判断
    // 如果传入的数组是有序的，则直接比对前后元素是否一致

    if (isSorted) {
      if (i == 0 || seen != item) {
        res.push(item);
      }
      seen = item;
    } else {
      if (res.indexOf(item) == -1) {
        res.push(item);
      }
    }
  }

  return res;
}


console.log(['a', 'A', 'a', 'B', 'b', 3, 2, 3, 2, 5, 4, 6, 5, 6, 4, 2].unique());
console.log([1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5].unique(true));
```