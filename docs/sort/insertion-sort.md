# 插入排序

Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.

### 思路分析:

```
1: 从 arr[1] 到 arr[n] 遍历整个数组。
2: 拿当前元素与它前面数字进行对比。
3: 如果当前元素小于它前面的数字，则重复2。
4: 如果当前元素大于它前面的数字，则将当前元素插入该数字的后面。
```

<img src="../../assets/sort/sort-2.png" alt="avatar" width="50%" height="50%">

### 示例代码:

```
let array = [18, 1, 2, 5, 7, 9, 4, 5, 3, 2, 1, 22, 21, 24, 13, 15];

function insertionSort(array, n) {
  let i, current, j;
  for (i = 1; i < n; i++) {
    current = array[i]; // 当前元素
    j = i - 1; // 前一个元素

    // 移动数组 array[0] 到 array[i - 1] 之前的所有元素，如果该元素大于当前元素，则将它们从当前的位置往后移一位
    while (j >= 0 && current < array[j]) { // 
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return array;
}

console.log(insertionSort(array, array.length));
```

