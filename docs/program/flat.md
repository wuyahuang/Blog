# Javascript 数组拍平 flat


```
Array.prototype.fakeFlat = function (number = 1) {
  if (number < 1) {
    return this;
  }

  let retArray = this;
  while (number > 0) {
    // 检查数组元素中是否还有数组元素
    if (retArray.some((item) => { return Array.isArray(item) })) {
    	// 将数组继续展开一层
      retArray = Array.prototype.concat(...retArray);
    } else {
    	// 已经全部拍平了
      break;
    }
    number--;
  }
  return retArray;
}


const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }];

console.log(arr.fakeFlat(Infinity));
```