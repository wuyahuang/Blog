## 删除链表的倒数第 N 个结点(LeetCode 19 - Remove Nth Node From End of List)

### 问题描述
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

```
输入：head = [1], n = 1
输出：[]
```

```
输入：head = [1,2], n = 1
输出：[1]
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
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let newLinkedList = new ListNode(0);
    newLinkedList.next = head;

    let second = newLinkedList;
    // first 从 newLinkedList.next 开始，是因为我们从第 n - 1 个节点删掉 next 节点，因此我们 second 的目标节点是 n - 1 。
    let first = newLinkedList.next;

    for(let i = 0; i < n; i++){
        first = first.next;
    }

    while(first !=null){
        first = first.next;
        second = second.next;
    }

    second.next = second.next.next;
    return newLinkedList.next;
};
```

#### 思路分析

初始时 first 指向第二个节点，second 指向头节点。我们首先使用 first 对链表进行遍历，遍历的次数为 n。此时，first 和 second 之间间隔了 n 个节点，即 first 比 second 超前了 n 个节点。

在这之后，我们同时使用 first 和 second 对链表进行遍历。当 first 遍历到链表的末尾（即 first 为 NULL）时，second 恰好指向倒数第 n - 1 个节点，此时将 second 的 next 节点指向 second.next.next 即完成了删除。

<img src="../../assets/linked-list/linked-list-7.png" alt="avatar" width="75%" height="75%">