```
let array = [31, 27, 28, 42, 13, 8, 11, 30, 17, 41, 15, 43, 1, 36, 33, 14, 7, 3, 5, 9];

/**
  * 交换数组内两个元素的位置
  * @param array 需要交换的数组
  * @param first 第一个元素的数组下标
  * @param second 第二个元素的数组下标
*/
function swap(array, first, second) {
  let temp = array[first];
  array[first] = array[second];
  array[second] = temp;
}

/**
  * 快速排序
  * @param array 需要排序的数组
  * @param left 第一个元素的数组下标
  * @param right 最后一个元素的数组下标
*/
function quickSort(array, left, right) {
  if (right - left > 10) { // 只要数组长度大于10，就进入快速排序流程
    let pivot = partition(array, left, right); // 将数组进行左右分区，返回 pivot 下标位置
    if (left < pivot - 1) {
      quickSort(array, left, pivot - 1);
    }
    if (left < right) {
      quickSort(array, pivot, right);
    }
    return array;
  } else {
    return insertionSort(array, array.length);
  }
}

/**
  * 分区
  * @param array 需要分区的数组
  * @param left 第一个元素的数组下标
  * @param right 最后一个元素的数组下标
*/
function partition(array, left, right) {
  console.log('partition.');
  let pivot = Math.floor((left + right) / 2); // 选取中间位置元素为 pivot 
  let pivotValue = array[pivot];

  while (left <= right) { // 只要左右两个指针没有重合，就一直往下走
    while (array[left] < pivotValue) { // 从左往右 遍历 左边分区的元素，直到该元素大于 pivot
      left++;
    }

    while (array[right] > pivotValue) { // 从右往左 遍历 右边分区的元素，直到该元素小于 pivot
      right--;
    }

    if (left <= right) {
      swap(array, left, right); // 左右两个指针没有重合的情况下，交换左右两个分区达标的元素。
      left++;
      right--;
    }
  }
  return left;
}

/**
  * 插入排序
  * @param array 需要排序的数组
  * @param n 数组长度 
*/
function insertionSort(array, n) {
  console.log('insertion sort.');
  if (n == 1) {
    return array;
  }
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

console.log(quickSort(array, 0, array.length - 1));
```