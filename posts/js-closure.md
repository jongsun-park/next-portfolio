---
title: "Core JavaScript - Closure"
date: "2021-03-14"
---

## 01 클로저의 의미 및 원리 이해
클로저의 정의
	- 자신을 내포하는 함수의 컨텍스트에 접근할 수 있는 함수 / 더글라스 크록포드
	- 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 것 / 에단 브라운
	- 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수 / 존 레식**
	- 이미 생명 주기상 끝난 외부 함수의 변수를 참조한느 함수 / 송형주 고현준**
	- 자유번수가 있는 함수와 자유번수를 알 수 있는 환경의 결합 / 에릭 프리먼
	- 로컬 변수를 참조하고 있는 함수 내의 함수 / 야마다 요시히로
	- 자신이 생성될 때의 스코프를 알 수 있었던 변수들 중 언젠간 자신이 실행될 때 사용한 변수들만을 기억하여 유지시키는 함수 / 유인동**

MDN
	- A closer is the combination of a function and the lexical environment within which that function was declared.
	- 클로저는 함수와 그 함수가 선언될 당시의 lexical environment의 상호관계에 따른 현상
	- 어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상
	- "외부 함수의 LexicalEnvironment가 가비자 컬렉팅되지 않는 현상"

클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부 함수 B를 외부로 전달할 경우 A의 실행컨텍스가 종료된 이후에도 변수 a가 사라지지 않는 현상
	- 외부 함수의 변수를 참조하는 내부 함수
	- 지역변수를 참조하는 내부함수를 외부로 전달하는 경우: setInterval/setTimeout/eventListener

```js
var outer = function(){
  var a = 1;
  var inner = function(){
    return ++a; // 외부 변수 a 참조
  };
  return inner;
};
var outer2 = outer();
console.log(outer2()); // 변수 a가 사라지지 않고 참조 유지
console.log(outer2()); // 메서드를 통해서면 변수에 접근이 가능
```

## 클로저와 메모리 관리
메모리 누수
	- 개발자의 의도와 달리 어떤 값의 참조 카운트가 0이 되지 않아 GC(가비지 커렉터)의 대상이 되지 않는 경우.
	- 참초카운터를 0으로 만든다: 식별자에 참조형이 아닌 기본형 데이터(null, undifined)를 할당한다.

`outer = null; // outer 식별자의 inner 함수 참조를 끊음`

## 03 클로저 활용 사례
### 5-3-1 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

```js
var alertFruitBuilder = function(fruit){
  return function(){ // 고차함수: 함수를 반환하는 함수 // alertFruit.bind(null, fruit)
    alert('Your choice is' + fruit);
  }
}

fruits.forEach(function(fruit){
  var $li = document.createElement('li');
  $li.innerText = fruit;
  $li.addEventLisener('click', alertFruitBuilder(fruit));
  $ul.appendChild($li);
});
```

### 5-3-2 접근 권한 제어(정부 은닉)
	- 어떤 모듈의 내부 로직에 대한 외부로의 노출을 최소화해서 모듈간의 결합도를 낮추고 유연성을 높이고자 하는 현대 프로그래밍 언어의 중요한 개념 중 하나
	- public: 외부에서 접근 가능
	- private: 내부에서만 사용하면 외부에 노출하지 않음
	- protected

함수 외부에서는 함수 이름을 사용해서 실행은 할 수 있지만, 내부에는 어떠한 개입도 할 수 없다.
	- 외부에 제공할 정보만 return 하고, 내부에서만 사용할 정보는 return 하지 않는 것으로 접근 권한 제어가 가능해진다. 
	
클로저로 변수를 보호한 객체
```js
var createCar = function(){
  /*…*/
  var publicMembers = { … }
  Object.freeze(publicMembers);
  return publicMembers;
};
```

### 5-3-3 부분 적용 함수
n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가, 나중에 (n-m)개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있게끔 하는 함수

디바운스: 짧은 시간 동안 동일한 이벤트가 많이 발생할 경우, 이를 전부 처리하지 않고 처음 또는 마지막에 발생한 이벤트에 대해 한번만 처리하는 것 (ex. lodash 라이브러리)

```js
// 각 이벤트가 바로 이전 이벤트로부터 wait 시간 이내에 발생하는 한 
// 마지막에 발생한 이벤트만이 초기화되지 않고 무사히 실행
var debounce = function (eventName, func, wait){
  var timeoutId = null; // 내부 변수 생성
  return function(event){
    var self = this; // this를 별도의 변수에 담고
    console.log(eventName, 'event 발생');
    clearTimeout(timeoutId); // 무조건 대기 큐를 초기화
    timeoutId = setTimeout(func.bind(self, event), wait); // wait 시간 만큼 지연시킨다음, 원래의 func를 호출
  }
}

var moveHandler = function(e){
  console.log('move event 처리');
};

var wheelHandler = function(e){
  console.log('wheel event 처리');
};

document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));
document.body.addEventListener('mousewheel', debounce('wheel', moveHandler, 700));
```

Symbol.for:
	- 전역 심볼 공간에 인자로 넘어온 문자열이 있으면 해당 값을 참조하고, 선언돼 있지 않으면 새로만드는 방식
	- 어디서든 접근 가능하면서 유일무일한 상수를 만들고자 할 때 적합
	- var _ = Symbol.for('EMPTY_SPACE');

### 5-3-4 커링 함수
	- 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것
	- 한번에 하나의 인자만 전달
	- 실행 결과는 다음 인자를 받기 위해 대기 할 뿐, 마지막 인자가 전달 되기 전까지 원본 함수가 실행 되지는 않는다.
	- 지연 실행: 당장 필요한 정보만 받아서 전달하고 필요한 정보가 들어면 전달하는 식으로 하면 결국 마지막 인자가 넘어갈 때 까지 함수 실행을 미루는 셈이다.
	- var getInformation = baseUrl => path => id => fetch(baseUrl + path + '/' + id);

```js
// 리덕스 미들웨어 'Logger'
const logger = store => next => action => {
  console.log('dispatching', action);
  console.log('next state', store.getState());
  return next(action);
};
// 리덕스 미들웨어 'Thunk'
const thunk = store => next => action => {
  return typeof action === 'function'
    ? action(dispatch, store.getState)
    : next(action);
};
```

## 04 정리
	- 클로저란 어떤 함수에서 선언한 변수를 참조하는 내부변수를 외부로 전달할 경우, 함수의 실행 컨텍스트가 종료된 후에도 해당 변수가 사라지지 않는 현상
	- 내부함수를 외부로 전달하는 방법에는 함수를 return 하는 경우뿐만 아니라 콜백으로 전달하는 경우도 포함된다.
	- 클로저는 그 본질이 메모리를 계속 차지하는 개념이므로 더는 사용하지 않게 된 클로저에 대해서는 메모리를 차지하지 않도록 관리해줄 필요가 있다.






