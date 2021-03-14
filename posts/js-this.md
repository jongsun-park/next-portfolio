---
title: "Core JavaScript - this"
date: "2021-03-14"
---

객체 지향 언어 this: 클래스로 생성한 인스턴스 객체
JavaScript
	- 함수와 객체의 구분이 느슨하다.
	- 어디에서나 this를 사용 할 수 있다.
	- 상황에 따라 this가 가르키는 대상이 다르다.

## 01 상황에 따라 달라지는 this
실행 컨텍스트가 생성 될 때 함께 결정 된다. (함수 호출)

## 3-1-1 전역 공간에서의 this
전역 공간에서는 this는 전역 객체를 가리킨다.
	- 전역 컨텍스트를 생성하는 주체
	- 브라우저: window / node: global
	- 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다.
	- 추가적으로 해당 프로퍼티의 configurable 속성을 false로 정의 한다. (변경 및 삭제 가능성)
	- var로 선언한 전역변수와 전역객체의 프로퍼티는 호이스팅 여부 및 configurable 여부에서 차이를 보인다.

## 3-1-2 메서드로서 호출할 때 그 메서드 내부에서의 this
함수와 메서드
	- 미리 정의한 동작을 수행하는 코드 뭉치
	- 함수: 그 자체로 독립적인 기능을 수행
	- 메서드: 
		○ 자신 호출한 대상 객체에 관한 동작을 수행
		○ △ 객체의 프로퍼티에 할당된 함수
		○ 객체의 메서드로서 호출할 경우에만 메서드로 동작하고, 그렇지 않으면 함수로 동작한다.
	- 함수를 호출 할 때 그 함수 이름(프로퍼티) 앞에 객체가 명시되어 있는 경우에는 메서드로 호출한 것이고, 그렇지 않은 모든 경우 함수로 호출 한 것이다
	- 메서드 내부에서의 this: 함수명(프로퍼티명) 앞의 객체 

## 3-1-3 함수로서 호출할 때 그 함수 내부에서의 this
함수 내부에서의 this 
	- 실행 컨텍스트를 활성화할 당시에 this가 지정되지 않은 경우 this는 전역 객체를 바라본다.
	- 함수에서의 this는 전역 객체를 가리킨다

메서드 내부함수에서의 this
	- 내부함수 역시 이를 함수로 호출 했는지, 메서드로 호출 했는지에 따라 this의 값이 정확이 맞출 수 있다.
	- this 바인딩 / 함수를 실행하는 당시 주변의 환경 (메서드 내부인지, 함수 내부인지) 중요하지 않고, 오직 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표시가 있는지 없는지가 중요하다.

메서드 내부 함수에서의 this를 우회하는 방법
	- ES5: 변수를 사용해서 this를 우회할 수 있다.
	- self, _this, that, …

```js
var obj = {
  outer: function(){
    console.log(this); // { outer: f } // 객체 obj
    var innerFunc1 = function(){
      console.log(this); // Window { … } // 전역 객체
    };
    innerFunc1();

    var self = this; // 객체 obj
    var innerFunc2 = function () {
      console.log(self); // { outer: f } // 객체 obj
    };
    innerFuncs();
  }
};
obj.outer();
```

this를 바인딩하지 않는 함수 
화살표 함수
	- 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어,
	- 상위 스코프의 this를 그대로 활용할 수 있다.

call, apply 등의 메서드를 활용해 함수를 호출할 때 명시적으로 this를 지정할 수 있다.

## 3-1-4 콜백 함수 호출 시 그 함수 내부에서의 this
콜백 함수
	- 함수 A 의 제어권을 다른 함수 (메서드) B에게 넘겨주는 경우
	- 함수 A는 함수 B의 내부 로직에 따라 실행되며, this 역시 함수 B 내부 로직에서 정한 규칙에 따라 값이 결정된다.
	- setTimeout, forEach: 콜백 함수의 내부에서의 this는 전역객체를 참조한다.
	- addEventListener: 콜백함수를 호출할 때 자신의 this를 상속한다.

## 3-1-5 생성자 함수 내부에서의 this 
생성자 함수
	- 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수
	- (객체지향언어) 생성자 함수: 클래스 / 클래스를 통해 만든 객체: 인스턴스
	- new 명령어와 함께 함수를 호출하면 해당 함수가 생성자로서 동작하게 된다.
	- 함수가 생성자 함수로서 호출된 경우 내부에서의 this는 인스턴스 자신을 가르킨다.

	1. 생성자 함수 호출 (new)
	2. 생성자 함수의 prototype 프로퍼티를 참조하는 __proto__ 프로퍼티가 있는 객체를 만들고
	3. 미리 준비된 공통 속성 및 개성을 해당 객체(this)에 부여

```js
var Cat = function (name, age) {
  this.bark = '야옹'; // 기본값
  this.name = name; // 입력값
  this.age = age; // 입력값
}

var choco = new Cat('초코', 7);
var nabi = new Cat('나비', 5);
console.log(choco, nabi);
```
	
## 02 명시적으로 this를 바인딩하는 방법
### 3-2-1 call 메서드
	- Function.prototype.call(thusArg[, arg1[, arg2[, …]]])
	- 함수를 그냥 실행하면 this를 전역객체를 참조하지만,
	- call 메서드를 이용하면 임의의 객체를 this로 지정할 수 있다.

```js
var func = function(){console.log(this)};
func(); // Window
func.call({x:1}); // { x : 1 }
```

### 3-2-2 apply 메서드
	- call 메서드와 기능적으로 동일
	- call: 첫번째 인자를 제외한 나머지 인자들을 호출할 함수의 매개변수로 지정
	- apply: 두 번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개 변수로 지정
```js
var func = function(a,b,c){ console.log(this, a, b, c) }
func(1,2,3); // Window, 1, 2, 3
func.call({x:1}, 1, 2, 3); // {x:1}, 1, 2, 3
func.apply({x:1, [1,2,3]}; // {x:1}, 1, 2, 3
```

### 3-2-3 call / apply 메서드의 활용
유사배열객체에 배열 메서드 적용
	- 유사배열객체: 키가 0, 양수로 이루어져 있고, length 프로퍼티가 0이나 양의 정수인 객체
	- 객체는 배열 메서드를 사용 할 수 없다.
	- 함수 내부에서 접근할 수 있는 arguments 객체, NodeList 도 call, apply를 사용해서 배열 메서드를 사용 할 수 있다.
	- length 속성을 가지는 문자열은 length가 읽기 속성이기 때문에 원본 문자열에 변경을 가하는 메서드(push, pup, shift, unshift, splice …)는 에러를 던지며, concat처럼 대상이 반드시 배열이여야하는 경우에도 에러는 나지만 제대로 된 결과는 얻을 수 없다.

```js
var obj = { 0: 'a', 1:'b', 2:'c', length: 3};
Array.prototype.push.call(obj, 'b'); // b를 마지막 인덱스에 추가
var arr = Array.prototype.slice.call(obj); // 배열 얕은 복사
```

Array.from()
	- ES6
	- 유사배열객체 또는 순회 가능한 모든 종류의 데이터 타입을 배열로 전환
	- typeof Array.from({a:1, b:2, length:2}) // array

생성자 내부에서 다른 생성자를 호출
	- 생성자 내부에 다른 생성자와 공통된 내용이 있을 경우
	- call 또는 apply를 이용해서 다른 생성자를 호출하면 간단하게 반복을 줄 일 수 있다.
```js
function Person(name, gender){
  this.name = name;
  this.gender = gender;
}

function Student(name, gender, school){
  Person.call(this, name, gender);
  this.school = school;
}

function Employee(name, gender, company){
  Person.call(this, name, gender);
  this.company = company;
}

var by = new Student('보영', 'female', '단국대');
var jn = new Employee('재난', 'male', '구골');
```

여러 인수를 묶어 하나의 배열로 전달하고 싶을 때 - apply 활용
```js
var numbers = [10, 20, 3, 16, 45];
var max = Math.max.apply(null, numbers); // Math.max(…numbers);
var min = Math.min.apply(null, numbers); // Math.min(…numbers);
console.log(max, min)l
```

### 3-2-4 bind 메서드
	- Function.prototype.bind(thisArg[, arg1[, arg2[, …]]])
	- 즉시 호출 하지 않고 넘겨 받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 함수// 함수에 this를 미리 적용
	- 함수를 호출할 때 인수를 넘겨주면, 그 인수들은 bind 메서드를 호출 할 때 전달 했던 인수들의 뒤에 있어서 등록 // 부분 적용 함수 구현

```js 
var func = function(a,b,c,d){ console.log(this, a, b, c, d);
func(1, 2, 3, 4); // Window, 1, 2, 3, 4

var bindFunc1 = func.bind({x:1});
bindFunc1(5, 6, 7, 8); // {x:1} 5 6 7 8;

var bindFunc2 = func.bind({x:1}, 4, 5); // a, b // this 지정과 함께 부분 적용 함수 구현
bindFunc2(6, 7); // {x:1} 4 5 6 7 // c, b
bindFunc2(8, 9); // {x:1} 4 5 8 9

name 프로퍼티
	- bind 메서드를 적용해서 새로 만든 함수는 name 프로퍼티에 bound 접두어가 붙는다.
		○ name: 'bound xxx'
		○ 함수명이 xxx인 원본 함수에 bind 메서드를 적용한 새로운 함수 이다.

상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기
```js
var innerFunc = function(){ console.log(this); };
innerFunc.call(this);
```

```js
var innerFunc = function(){ console.log(this); }.bind(this);
innerFunc();
```

### 3-2-4 화살표 함수의 예외사항
화살표함수 내부에서 this에 접근하고자 하면, 스코프체인상 가장 가까운 this에 접근하게 된다.

### 3-2-6 별도의 인자로 this를 받는 경우 (콜백 함수 내에서의 this)
thisArg 값을 지정하면 콜백 함수 내부에서 this 값을 원하는 대로 변경할 수 있다.

## 03 정리
	- 전역공간에서의 this는 전역객체를 참조한다 (window / global)
	- 어떤 함수를 메서드로 호출한 경우 this는 메서드 호출 주체를 참조한다.
	- 어떤 함수를 함수로 호출한 경우 this는 전역 객체를 참조한다.
	- 콜백 함수 내부에서의 this는 해당 콜백함수의 제어권을 넘겨받은 함수가 정의한 바에 따르며, 정의하지 않은 경우에는 전역객체를 참조한다.
	- 생성자 함수에서의 this는 생성될 인스턴스를 참조한다.

명시적 this 바인딩
	- call, apply 메서드는 this를 명시적으로 지정하면서 함수 또는 메서드를 호출한다.
	- bind 메서드는 this 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만든다.
	- 요소를 순회하면서 콜백 함수를 반복 호출하는 내용의 일부 메서드는 별도의 인자로 this를 받기도 한다. (forEach, map, filter, some, every, find, findIndex, flatMap, Set, Map)
