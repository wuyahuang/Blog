# Javascript 数组拍平 flat


```
Array.prototype.fakeFlat = function (number = 1) {
  if (number < 1) {
    return this;
  }

  let retArray = this;
  while (number > 0) {
    // 检查数组元素中是否还有数组
    if (retArray.some((item) => { return Array.isArray(item) })) {
      retArray = [].concat(...retArray);    // 数组中还有数组元素的话并且 num > 0，继续展开一层数组 
    } else {
      break;
    }
    number--;
  }
  return retArray;
}


const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }];

console.log(arr.fakeFlat(Infinity));
```