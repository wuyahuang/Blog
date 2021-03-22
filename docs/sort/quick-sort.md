# 快速排序

Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways. 

* Always pick first element as pivot.
* Always pick last element as pivot (implemented below)
* Pick a random element as pivot.
* Pick median as pivot.

The key process in quickSort is partition(). Target of partitions is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x. All this should be done in linear time.


示例代码：

```
let array = [31, 27, 28, 42, 13, 8, 11, 30, 17, 41, 15, 43, 1, 36, 33, 14, 7, 3, 5, 9];

/**
  * 替换数组内两个元素的位置
  * @param array 需要操作的数组
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
  if (array.length > 1) {
    let pivot = partition(array, left, right);
    if (left < pivot - 1) {
      quickSort(array, left, pivot - 1);
    }
    if (left < right) {
      quickSort(array, pivot, right);
    }
  }
  return array;
}

/**
  * 分区
  * @param array 需要分区的数组
  * @param left 第一个元素的数组下标
  * @param right 最后一个元素的数组下标
*/
function partition(array, left, right) {
  let pivot = Math.floor((left + right) / 2);
  let pivotValue = array[pivot];

  while (left <= right) {
    while (array[left] < pivotValue) {
      left++;
    }

    while (array[right] > pivotValue) {
      right--;
    }
    if (left <= right) {
      swap(array, left, right);
      left++;
      right--;
    }
  }
  return left;
}

console.log(quickSort(array, 0, array.length - 1));
```