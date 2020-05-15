# FE-Interview

## ES6新特性
### `let` 和 `var`区别
1. 变量提升
```
console.log(c) // print undefined
var c = "c"

// 实际执行顺序: 预处理变量
var c = "c"
console.log(c);
c = "c";

console.log(c) // Exception
let c = "c";
```
2. 同一作用域下能否重复定义同一个名称
```
var d = 1;
var d = 100;
console.log(d); // 100

let d = 1
let d = 100 // Exception
```
```
可以改变原有的值
let t = 100;
t = 100; 
console.log(t); // 100
```
3. 有无严格的作用域：函数作用域和块级作用域（ES6)  
`var`属于函数作用域：
```
function whatever() {
  var n = 30;
  if (true) {
    var n = 100;
  };
  console.log(n);
}
whatever(); // 100
console.log(n) // exception
```
`let`属于块级作用域
```
function whatever() {
  let n = 30;
  if (true) {
    let n = 100; // 没有错误信息是因为不在同一个作用域。
  };
  console.log(n);
}
whatever(); // 10
```

