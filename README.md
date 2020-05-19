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
### `const`  
Read only constant
```
const w = 100;
w = 100; // Error
const r; // Error, 一定要有赋值处理。
```
`const`的指向是stack内存，实际改的时候是heap内存。top 和bottom level const
```
const obj = {};
obj.name = "whatever"；// OK
```
### Arrow Function
简化了函数的定义
```
let f = v => v; // let函数名 = 参数 => 返回值
// equivalent to below
var f = function(v) {
    return v;
  }；
```
```
var f2 = function() {
    return 123;
  }；
let f2 = () => 123;

var f3 = function(n1, n2) {
    return n1 + n2;
  };
let f3 = (n1, n2) => n1 + n2;
```
谁调用，指向谁。
### 数组去重
```
var arr1 = [2, 3, 4, 4, 4, 4, 5, 5, 5, 5];
var arr2 = [...new Set(arr1)];
```
### map
```
const m = new Map();
m.set("name", "m").set("age", 18);
```
### for of
```
for (let [key, value] of m) {
  
}
```
## 防抖和节流  
防抖：指在触发事件n秒内函数只执行一次，若在n秒内再次触发则重新计算。  比如：点击按钮-->两秒后调用。在1.5秒后又点了，两秒重新计算。  
应用：拍照/ 下拉触底加载下一页（出现抖动，因为抖动一次或者两次加载的页面不一样）  
节流： 连续发生的事件，在n秒内只执行一次函数。  
应用： 即时查询：比如搜索，出现一下查一次，出现两下查两次-->后端调用次数过多。  

### 输入完一秒再调用 （debounce）
debounce  
```
function debounce(func, wait) {
  let timeout; // 定时器
  return function() {
    if (timeout) clearTimeout(timeout); // 取消之前的调用任务
    timeout = setTimeout(function() {
      func.apply(this); // 执行func这个函数。
    }, wait)
  }
}
// 调用
debounce(需要调用的函数名字，1000)； 
```
### 输入完立即查询，但下一次查询要等2秒 （debounce）
```
function debounce(func, wait) {
  let timeout;
  return function() {
    if (timeout) clearTimeout(timeout);
    let callNow = ! timeout; // js类型转换。判断当前有没有定时器。
    timeout = setTimeout(() => {
      timeout = null; //清空当时定时器
    }, wait);
    if (callNow) func.apply(this); // 第一次执行
  }
}
```
### 节流
```
// 定时器实现 ： 固定时间发送请求
function throttle(func, wait) {
  let timeout;
  return function() {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this);
      }, wait)
    }
  }
}
```
```
// 时间戳
frunction throttle(func, wait) {
  let prev = 0;
  return function() {
    let now = Date.now();
    if (now - prev > wait){
      func.apply(this);
      prev = now;
    }
  }
}
```

## 模拟题1
```
var n = 123; // 全局
function f1() {
  console.log(n);
}

function f2() {
  var n = 456;
  f1(); // f1 在f2中执行，没有调用者，作用域为全局。
}
f2(); // 没有调用者，作用者，window

// 考察点：预解析，作用域

// print 123 123
```

```
var n = 123; // 全局
function f1() {
  console.log(n);
}

function f2() {
  var n = 456;
  f1(n); // f1 在f2中执行，没有调用者，作用域为全局。
}
f2(); // 没有调用者，作用者，window

// 考察点：预解析，作用域

// print 123 123
```

## 模拟题2
```
var length = 100;
function f1() {
  console.log(this.length);
}

// arguments --- js内置对象，参数数组, 实际上是一个对象
var obj = {
  x: 10,
  f2: function(f1) {
    console.log(this); // obj
    f1(); // 无调用者 this = window => 100
    arguments[0](); // arguments[0] = f1 无调用者 作用域arguments对象
  }
}

obj.f2(f1, 1);
```

```
function f2() {
  console.log(this.a); // this==window
}

var obj = {
  a: 2,
  f: f
}

var f2 = obj.f;
var a = "hello";
f2(); // 无调用者，this为全局。
// print hello
```


