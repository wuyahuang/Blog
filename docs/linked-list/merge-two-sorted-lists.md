## 两个有序的链表合并(LeetCode 21 - Merge Two Sorted Lists)

### 问题描述
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

```
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

```
输入：l1 = [], l2 = []
输出：[]
```

```
输入：l1 = [], l2 = [0]
输出：[0]
```

#### 代码示例

```
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if(l1 == null){
        return l2;
    }
    if(l2 == null){
        return l1;
    }
    if(l1.val < l2.val){
        l1.next = mergeTwoLists(l1.next,l2);
        return l1;
    }else {
        l2.next = mergeTwoLists(l1,l2.next);
        return l2;
    }
};
```

#### 思路分析

```
如果 l1 为空，直接返回 l2。
如果 l2 为空，直接返回 l1。
如果 l1 的头节点小于 l2 的头节点，那么递归执行 l1.next 与 l2 头节点。
如果 l1 的头节点大于或者等于 l2 的头节点，那么递归执行 l1 头节点与 l2.next
```