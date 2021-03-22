# recursion

Recursion can feel difficult to new developers. Perhaps that's because many resources teach it using algorithmic examples (Fibonacci, linked-lists). 

Recursion is when a function calls itself until someone stops it. If no one stops it then it'll recurse (call itself) forever.


Infinite Recursion

```
function run() {
    console.log('running');
    run();
}

run();
// running
// running
// ...
```

Without a stopping condition, run will forever call itself. You can fix that with an if statement.


```
function run(x) {
    if (x === 3) return;
    
    console.log('running');
    run(x + 1);
}

run(0);
// running
// running
// running

// x is 3 now, we're done.
```