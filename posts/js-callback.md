---
title: "Core JavaScript - Callback"
date: "2021-03-14"
---

## 01 콜백 함수란?
다른 코드의 인자로 넘겨주는 함수.
콜백함수를 넘겨 받은 코드는 이 콜백 함수를 필요에 따라 적절한 시점에서 실행

## 02 제어건
## 4-2-1 호출 시점
	- 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수 호출 시점에 대한 제어권을 가진다.
	- cbFunc(); // 사용자 호출 // 사용자 제어
	- setInterval(cbFunc, 300) // setInterval호출 // setInterval 제어

```js
var count = 0;
var cbFunc = () => {
  console.log(count);
  if(++count > 4 ) clearInterval(timer)
};
var timer = serInterval(cbFunc, 300); // 300ms 마다 함수 실행 
```

## 4-2-2 인자
	- 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수를 호출할 때 인자에 어떤 값을 어떤 순서로 넘길지에 대한 제어권을 가진다.
	- array.map( (value, index, thisArg) => { /*…*/ })
	- map 이 콜백함수의 제어권을 가지므로, map 메서드가 정한 순서대로 인자를 넣어 줘야 한다.

## 4-2-4 this
	- 콜백 함수도 함수이기 때문에 기본적으로 this가 전역객체를 참조하지만, 제어권을 넘겨받을 코드에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상은 참조 하게 된다.

map 메서드 구현 (두번째 인자로 바인딩할 객체를 정할 수 있다)
```js
Array.prototype.map = function(callback, thisArg){
  var mappedArr = [];
  for (var i = 0; i < this.length; i ++){
    var mappedValue = callback.call(thisArg || window, this[i], i, this);
    mappedArr[i] = mappedValue;
  }
  return mappedArr;
}
```

## 03 콜백 함수는 함수다
	- 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 함수로 호출된다.
	- 메서드 안의 this 는 객체를 가르키지 않고, 연결된 this 객체가 없다면 전역 객체인 window를 가르킨다.
	- 콜백 함수로 전달 되는 과정에서 binding 이 없어 진다. 

## 04 콜백 함수 내부의 this에 다른 값 바인딩하기
	1. this 대신 다른 변수를 사용 // const self = this;
	2. bind 메서드 사용 //const obj1.func.bind(obj1);

## 콜백 지옥과 비동기 제어
콜백 지옥: 익명 함수로 전달하는 과정이 반복되어 코드의 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상

동기적인 코드
	- 현재 실행 중인 코드가 완료된 후에야 다음 코드를 실행하는 방식
	- 즉시 처리가 가능한 대부분의 코드

비동기적인 코드
	- 현재 실행 중인 코드의 완료 여부와 무관하게 즉시 다음 코드로 넘어감
	- 별도의 요청, 실행 대기, 보류 등과 관련된 코드
	- setTimeout, addEventListener, XMLHttpRequest


ES6 Promise
	- new 연산자와 함께 호출한 Promise의 인자로 넘겨주는 콜백 함수는 호출 할 때 바로 실행 되지만, 그 내부에 resolve 또는 reject 함수를 호출하는 구문이 있을 경우 둘줄 하나가 실행되기 전까지는 다음(then) 또는 오류 구문(catch)으로 넘어가지 않는다.
	- new Promise(  (resolve, reject) => { /*…*/ }).then().then().catch()
	- var addCoffee = (name) => (prevName) => new Promise( (res, rej) => { /*…*/ })
	- addCoffee('에소프레소')().then(addCoffee('아메리카노'));

ES6 Generator
	- Generator 함수를 실행하면 Iterator가 반환되는데, Iterator는 next라는 메서드를 가지고 있다. next 메서드를 호출하면 함수 내부에 가장 먼저 등장하는 yield에서 함수 실행을 멈추고, next 메서드를 호출하면 다음 yield에서 실행을 멈춘다.
	- var coffeGenerator = funtion*(){ var esopresso = yield addCoffee(); /*…*/ }
	- var coffeMaker = coffeGenerator();
	- coffeMake.next();

Promise + Async/await
	- 비동기 작업을 수행하고자 하는 함수 앞에 async를 표기하고, 함수 내부에서 실질적인 비동기 작업이 필요한 위치 마다 await를 표기하는 것만으로 뒤의 내용을 Promise로 자동 전환하고, 해당 내용이 resolve된 이후에야 다음으로 진행한다.
	- var addCoffee = name => new Promise(res=>{ /*…*/ })
	- var coffeeMaker = async () => { await _addCoffee('에스프레소'); /*…*/ }

## 06 정리
	- 콜백 함수는 다른 코드에 인자를 넘겨줌으로써 그 제어권도 함께 위임한 함수이다.
	- 제어권을 넘겨받은 코드는 다음과 같은 제어권을 가진다.
		○ 콜백 함수를 호출하는 시점을 스스로 판단해서 실행한다.
		○ 콜백 함수를 호출할 때 인자로 넘겨줄 값들 및 그 순서가 정해져 있다. 이 순서를 따르지 않고 코드를 작성하면 엉뚱한 결과를 얻게 된다.
		○ 콜백 함수의 this가 무엇을 바라보도록 할지가 정해져 있는 경우도 있다. 정하지 않은 경우에는 전역 객체를 바라본다. 사용자 임의로 this를 바꾸고 싶을 때는 bind 메서드를 활용한다.
	- 어떤 함수에 인자로 메서드를 전달하더라도 이는 결국 함수로서 실행된다.
	- 비동기 제어를 위해 콜백함수를 사용하다 보면 콜백 지옥에 빠지기 쉽다. 
		○ 대안: Promise, Generator, aync/await



