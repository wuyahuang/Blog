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
  if (left < right) { // 只要数组长度大于1，就进入快速排序流程

    if (right - left <= 10) {
      return insertionSort(array, array.length);
    }

    let pivot = partition(array, left, right); // 将数组进行左右分区，返回 pivot 下标位置

    quickSort(array, left, pivot - 1); // 左分区再次进行快排运算
    quickSort(array, pivot + 1, right); // 右分区再次进行快排运算
  }
  return array;
}

/**
  * 分区
  * @param array 需要分区的数组
  * @param left 第一个元素的数组下标
  * @param right 最后一个元素的数组下标
  * 这个函数选择最右边的元素为 pivot，将所有小于 pivot 的元素放到左边，将所有大于 pivot 的元素放到右边
*/
function partition(array, left, right) {
  console.log('partition.');
  // 随机选择一个元素作为 pivot
  let pivot = Math.floor(Math.random() * (right - left + 1) + left);
  swap(array, right, pivot);

  let pivotIndex = left;
  const pivotValue = array[right]; // 选取最右边的元素为 pivot

  for (let i = left; i < right; i++) {
    if (array[i] < pivotValue) { // 如果当前元素小于 pivot value，则与 pivotIndex 交换位置
      swap(array, i, pivotIndex);
      pivotIndex++;
    }
  }
  swap(array, right, pivotIndex); // 将 pivotIndex 和 pivot 交换位置
  return pivotIndex;
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