# 为什么数组下标从 0 开始？

### 原因一:

先来看下数组是怎么存储的,假设我们现在有这么一个数组:
```
[1,5,10,25,100]
```

Javascript Number 基于 IEEE 754 标准，数字在内存中分配的空间为 64 bits(8 bytes)，因此该数组共计分配 8 * 5 = 40 Bytes 空间，每个数字在内存中对应的地址分别为:

```
1 = memoryAddress
5 = memoryAddress + 8 bytes
10 = memoryAddress + 16 bytes
25 = memoryAddress + 24 bytes
100 = memoryAddress + 32 bytes
```

如果数组从 0 开始计数，那么我们得出如下公式:
```
itemAddress = memoryAddress + n * (8 bytes)
```

如果数组从 1 开始计数，那么我们得出如下公式:
```
itemAddress = memoryAddress + (n - 1) * (8 bytes)
```

显而易见，如果从 1 开始计数，每次访问数组元素都会多一次减法运算，不如从 0 开始计数来的高效。

### 原因二:

```
I believe the first language to have arrays was FORTRAN, one of the oldest languages. It used arrays based on 1. So did COBOL. C came along and used 0, because in C an array was nothing more than a shortcut for writing pointer arithmetic. An array subscript reference was interchangeable with pointer arithmetic in C. The developers of C were obsessed with tiny optimizations, because C was for them just a better assembly language. Pascal used 1, but its successor language Modula-2 (invented by the famous Prof. Wirth of ETH in Zurich) lets you define the starting and ending bounds of an array, so you could go from -5 .. +5 if that was convenient for your purposes. In Modula-2 you could have arrays of enumerated types as well, so if you declared an enumerated type of a_color = { red, green, blue } you could then declare an array of a_color, and then index an array by an enumerated type, like array[red]. This was a fantastic feature and hugely improved readability in Modula-2 over other languages. It is sad fact that people still look at C and think it is modern, and somehow justified, when in fact C is an archaic language, barely above assembler, and very clumsy when compared to the now old Modula-2. And for those historians, the mighty PL/1 also had user-definable array limits. To not be able to set array bounds to a programmer-specified range is really an unforgivable omission at this point in time, yet language designer after language designer skips this feature. And for those academics who think that because Edsger Dijsktra wrote a paper on why 0 was great it somehow must be right, you are omitting the fact that at that ancient time his limited imagination could only see two choices: 0-based and 1-based, when a more flexible definition capability is much more user friendly. Even back then, computers were faster than humans, and anything which reduces comprehension of programs by humans is a bad tradeoff. And the people at Google who took Modula-2 and copied it, kinda sorta, to create Go, blew it bad and took arrays back to the C-era.

C won the battle over PL/1 and other languages because the UNIX operating system beat MULTICS, OS/360, and the other mainframe OS’es, mostly because UNIX was the first kinda open source OS given to universities, and programmers all trained on UNIX. C was then adopted by Microsoft, which gave it another huge boost into the PC era. Interestingly, Apple had a terrific Pascal-based OS that was very reliable and easy to program, but because they wanted to switch to a UNIX kernel, converted to C with initially disastrous reliability problems. Apple is now pushing Swift, which is much cleaner than Objective-C, but guess what, Swift doesn’t allow negative subscripts. It is as if negative numbers hadn’t been invented yet. These so-called ‘new’ languages are saddled with old limitations and as they say, those that don’t learn from history are doomed to repeat it.

In my own Beads language, arrays are sparse, so you can store elements at negative values, or very large subscripts, or with enumerated subscripts, and even strings which Javascript also allows. Why limit yourself to archaic restrictions, which inevitably are more cumbersome?

Strong math languages like Mathematica don’t have any restrictions on subscripts, and can do very powerful things. Please don’t tell me that “the math” indicates that arrays should start at 0. I wouldn’t be surprised if some math tool allows subscripts that aren’t integers…some language can probably even let you use complex number subscripts. The compiler should handle all the trivial subtractions automatically, and programmers should use a notation that is convenient for the problem at hand.
```

参考资料:

[Why do array indexes start with 0 (zero) in many programming languages?](https://www.quora.com/Why-do-array-indexes-start-with-0-zero-in-many-programming-languages)