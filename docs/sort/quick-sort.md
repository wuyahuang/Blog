# 快速排序

Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways. 

* Always pick first element as pivot.
* Always pick last element as pivot (implemented below)
* Pick a random element as pivot.
* Pick median as pivot.

The key process in quickSort is partition(). Target of partitions is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x. All this should be done in linear time.


### 示例代码：

```
let array = [5,3,7,6,2,9];

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
  if (array.length > 1) { // 只要数组长度大于1，就进入快速排序流程
    let pivot = partition(array, left, right); // 将数组进行左右分区，返回 pivot 下标位置
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

console.log(quickSort(array, 0, array.length - 1));
```


### 思路分析：

Here are the steps to perform Quick sort that is being shown with an example [5,3,7,6,2,9].

* STEP 1: Determine pivot as middle element. So, 7 is the pivot element.

* STEP 2: Start left and right pointers as first and last elements of the array respectively. So, left pointer is pointing to 5 at index 0 and right pointer is pointing to 9 at index 5.

* STEP 3: Compare element at the left pointer with the pivot element. Since, 5 < 6 shift left pointer to the right to index 1.

* STEP 4: Now, still 3 <6 so shift left pointer to one more index to the right. So now 7 > 6 stop incrementing the left pointer and now left pointer is at index 2.

* STEP 5: Now, compare value at the right pointer with the pivot element. Since 9 > 6 move the right pointer to the left. Now as 2 < 6 stop moving the right pointer.

* STEP 6: Swap both values present at left and right pointers with each other.

* STEP 7: Move both pointers one more step.

* STEP 8: Since 6 = 6, move pointers to one more step and stop as left pointer crosses the right pointer and return the index of the left pointer.

