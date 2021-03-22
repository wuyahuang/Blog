# 快速排序

Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways. 

* Always pick first element as pivot.
* Always pick last element as pivot (implemented below)
* Pick a random element as pivot.
* Pick median as pivot.

The key process in quickSort is partition(). Target of partitions is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x. All this should be done in linear time.


### 示例代码：

```
let array = [5, 19, 3, 11, 9];

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

console.log(quickSort(array, 0, array.length - 1));

```

### 思路分析：

```
[5, 19, 3, 11, 9]

1.
选择最右边的元素为 pivot，所以 pivot 元素为 9。
i 和 pivotIndex 分别指向 left 的位置，此时 i = 0，pivotIndex = 0。
开始第一次数组遍历

2.
i = 0, pivotIndex = 0
5 < 9, 所以 array[i] 和 array[pivotIndex] 交换位置
[5, 19, 3, 11, 9]

3.
i = 1, pivotIndex = 1
19 > 9, 不交换位置
[5, 19, 3, 11, 9]

4.
i = 2, pivotIndex = 1
3 < 9, 所以 array[i] 和 array[pivotIndex] 交换位置
[5, 3, 19, 11, 9]

5.
i = 3, pivotIndex = 2
11 > 9, 不交换位置
[5, 3, 19, 11, 9]

6.
遍历完成，pivotIndex 和 right 交换位置
[5, 3, 9, 11, 19]
```