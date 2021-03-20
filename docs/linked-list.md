# 链表
```
链表（Linked list）是一种常见的基础数据结构，是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)。
由于不必须按顺序存储，链表在插入的时候可以达到O(1)的复杂度，比另一种线性表顺序表快得多，但是查找一个节点或者访问特定编号的节点则需要O(n)的时间，
而顺序表相应的时间复杂度分别是O(logn)和O(1)。

使用链表结构可以克服数组链表需要预先知道数据大小的缺点，链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。
但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大。
(摘自维基百科)
```

关于链表与数组的区别，可以参考这篇文章。[Difference between Linked List and Arrays](https://www.faceprep.in/data-structures/linked-list-vs-array/#:~:text=Arrays%20Vs%20Linked%20Lists&text=An%20array%20is%20a%20collection,randomly%20using%20the%20array%20index.)


### 单链表反转
```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

#### 代码示例(迭代):
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
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let current = head;
    let nextTemp = null;
    while(current!=null){
        nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
        // [current.next,prev,current] = [prev,current,current.next]; ES6 Only
    }
    return prev;
};
```

##### 代码运行流程:
```
1->2->3->4->5->NULL
NULL<-1->2->3->4->5
NULL<-1<-2->3->4->5
NULL<-1<-2<-3->4->5
NULL<-1<-2<-3<-4->5
NULL<-1<-2<-3<-4<-5
```