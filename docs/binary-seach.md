# 二分查找

Binary search works on sorted arrays. Binary search begins by comparing an element in the middle of the array with the target value. If the target value matches the element, its position in the array is returned. If the target value is less than the element, the search continues in the lower half of the array. If the target value is greater than the element, the search continues in the upper half of the array. By doing this, the algorithm eliminates the half in which the target value cannot lie in each iteration.[7]


### 示例代码:

```

/**
  * 二分查找
  * @param array 需要查找数据的数组
  * @param left 查找起始的位置
  * @param right 查找结束的位置
  * @param target 目标元素
*/

function binarySearch(array, left, right, target) {
  while (left <= right) {
    let mid = left + ((right - left) >> 1); // 获取数组中间位置元素

    if (array[mid] == target) { // 中间位置元素正好是目标元素
      return mid;
    } else if (array[mid] < target) { // 中间位置元素大于目标元素，则目标元素只可能在左边
      left = mid + 1;
    } else { // 否则目标元素在右边
      right = mid - 1;
    }
  }

  return -1;
}

let array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(binarySearch(array, 0, array.length - 1, 23));
```

### 思路分析:

<img src="../../assets/binary-search.png" alt="avatar" width="75%" height="75%">