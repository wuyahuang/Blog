## 单链表反转(LeetCode 206 - Reverse Linked List)

### 问题描述
```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

#### 代码示例(迭代)
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

##### 思路分析(迭代)
```
1->2->3->4->5->NULL
NULL<-1->2->3->4->5
NULL<-1<-2->3->4->5
NULL<-1<-2<-3->4->5
NULL<-1<-2<-3<-4->5
NULL<-1<-2<-3<-4<-5
```

#### 代码示例(递归)
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
    if(head == null || head.next == null){
        return head;
    }
    let newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
};
```

#### 思路分析(递归)
(图片摘自[编程狂想曲](https://leetcode-cn.com/problems/reverse-linked-list/solution/yi-bu-yi-bu-jiao-ni-ru-he-yong-di-gui-si-67c3/))

<img src="../../assets/linked-list/linked-list-1.png" alt="avatar" width="50%" height="50%">

递归解题首先要做的是明确递推公式的含义，在这里对于结点1来说，它只需要知道它之后的所有节点反转之后的结果就可以了，也就是说递推公式reverseList的含义是：把拿到的链表进行反转，然后返回新的头结点。

<img src="../../assets/linked-list/linked-list-2.png" alt="avatar" width="50%" height="50%">

结点1之后的结点，经过递归公式reverseList处理之后的结果如下图：

<img src="../../assets/linked-list/linked-list-3.png" alt="avatar" width="50%" height="50%">

接着要做的就是反转结点1，也就是将head指向的结点作为其下一个结点的下一个结点，即head.next.next=head。

<img src="../../assets/linked-list/linked-list-4.png" alt="avatar" width="50%" height="50%">

最后，将head指向的结点的下一个结点置为null，就完成了整个链表的反转。

<img src="../../assets/linked-list/linked-list-5.png" alt="avatar" width="50%" height="50%">
