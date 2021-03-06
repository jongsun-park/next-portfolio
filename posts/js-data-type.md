---
title: "Core JavaScript Data Type"
date: "2021-03-14"
---

## 01 데이터 타입의 종류
	- 기본형: 숫자, 문자열, 불리언, null, undefiend, 심볼
	- 참조형: 객체, 배열, 함수, 날짜, 정규표현식, Map, WeakMap, Set, WeakSet

기본형은 값이 담긴 주소값을 바로 복제하는 반면 참조형은 값이 담긴 주솟값으로 이루어진 묶을을 가리키는 주솟값을 복제한다.

기본형은 불변성을 띈다. 
	- 메모리, 데이터
	- 식별자, 변수

## 02 데이터 타입에 관한 배경 지식
### 1-2-1 메모리와 데이터

데이터
	- 비트: 하나의 메모리 조각, 각 비트는 고유한 식별자를 지닌다.
	- 바이트: 8개의 비트를 하나로 묶어 값을 표현
	- 정적타입언어(C/C++)에서는 메모리의 낭비를 줄이기 위해 데이터 타입에 따라 2바이트, 4바이트 등으로 나누어서 사용.
	- 자바스크립트: 데이터 타입과 상관 없이 8바이트를 확보한다. 
	- 모든 데이터는 **메모리 주솟값**을 통해 서로 구분하고 연결 할 수 있다. (비트 - 바이트 - 식별자)

### 1-2-2 식별자와 변수
변수: 변할 수 있는 데이터 (숫자, 문자열, 객체, 배열…)
식별자: 어떤 데이터를 식별하는 데 사용하는 이름, 변수 명

## 03 변수 선언과 데이터 할당
### 1-3-1 변수 선언
변수: 변경 가능한 데이터가 담길 수 있는 공간 또는 그릇

`var a;`
	- 메모리의 빈공간에서 공간을 확보한다.
	- 이 공간 이름을 a(식별자)라고 지정한다.
	- 사용자가 a에 접근하면, 메모리에서 a라는 이름을 가진 주소를 검색해 해당 공간에 담긴 데이터를 반환한다.

### 1-3-2 데이터 할당
`a = 'abc'`
	- 데이터를 저장하기 위한 공간을 확보하고, // 데이터 영역
	- 해당 공간의 주소를 변수 영역에 저장한다. // 변수 영역

변수 영역 - 주소: @1003, 데이터: { 이름: a, 값: @5004 }
데이터 영역 - 주소: @5004, 데이터: 'abc'

변수 영역에 데이터를 바로 저장하지 않는 이유?
	- 데이터 변환을 자유롭게 할 수 있게 함과 동시에 메모리를 더욱 효율 적으로 관리하기 위해
	- 미리 확보한 공간안에서 데이터 변환을 해야 하는 경우, 확보된 공간을 데이터 크기에 맞게 늘리는 작업이 선행 되어야 한다. 
	- 변수 영역과 데이터 영역을 분리하면, 중복된 데이터에 대한 효율이 높아 진다.

새로운 값
	- 문자열: 문자열을 새로 만들어 별도의 공간에 저장하고, 그 주소를 변수 공간에 연결한다.
	- 자신의 주소를 지정하는 변수가 하나도 없으면 가비지 컬렉터의 수거 대상이 된다.

## 04 기본형 데이터와 참조형 데이터
### 1-4-1 불변값
변수와 상수의 구분
	- 변수 영역의 메모리
	- 데이터 할당이 이루어진 변수 공간에 다른 데이터를 재할당할 수 있는지. 

불변 값
	- 데이터 영역의 메모리
	- 숫자, 문자열, boolean, null, undefined, Symbol
	- 해당 값을 가진 데이터를 찾고, 없으면 새로 만들어서 변수에 저장한다.
	- 한 번 만든 값을 바꿀 수 없고, 변경은 새로 만드는 동작을 통해서만 이루어 진다.
	- 한 번 만들어진 값을 가비지 컬렉팅을 당하지 않는 한 영원히 변하지 않는다.

### 1-4-2 가변값

`var obj1 = {a: 1, b: 'bbb'}`

참조형 데이터의 할당
	- 변수 영역: 주소 @1002 / 데이터 { 이름: obj1, 값: @5001 }
	- 데이터 영역: 
		○ 주소 @5001 / 데이터 [@7103 ~ ]
		○ 주소 @5003 / 데이터 1
		○ 주소 @5004 / 데이터 'bbb'
	- 객체 @5001의 변수 영역: 
		○ 주소 @7103 / 데이터 {이름: a, 값: @5003}
		○ 주소 @7104 / 데이터 {이름: b, 값: @5004}
		○ …

참조값의 주소
	- 이름: 식별자 / 값: 메모리 주소 배열이 저장된 데이터의 주소 
	- 프로퍼티 데이터가 저장되어 있는 메모리의 주소 집합
	- 각 프로퍼티는 별도의 메모리에 저장 

'객체의 변수(프로퍼티) 영역'이 별도로 존재한다.
	- 참조형 데이터의 '데이터 영역'은 기존의 메모리 공간을 그대로 활용한다. (불변값)
	- 하지만, 변수에는 다른 값을 얼마든지 대입할 수 있다.
	- 일부 속성의 값을 변경 했을 때, 객체는 새로 만들어 진 것이 아니라 기존 객체 내부의 값만 바뀐 것이다.

참조 카운트
	- 어떤 데이터에 대해 자신의 주소를 참조하는 변수의 개수
	- 참조 카운트가 0이 되면 가비지 컬렉터의 수거 대상이 된다.

### 1-4-3 변수 복사 비교

기본형 데이터와 참조형 데이터 모두 같은 주소를 바라보게 되는 점에서 동일하다. (복사 하는 변수가 가진 값을 저장한 메모리 주소를 변수 데이터에 저장한다.)

기본형 데이터의 값을 변경하면, 새로운 공간에 저장하고 해당 주소를 변수 값에 연결한다. / 원본과 다른 값을 가진다. ( a !== b)

참조형 데이터의 속성 값을 변경 할 경우,  값을 가르치는 주소의 위치가 변경 되는 것은 아니기 때문에 원본과 다른 값을 가진다. / (obj1 === obj2)

'기본형은 값을 복사하고 참조형은 주솟값을 복사한다'
-> 어떤 데이터 타입이든 변수에 할당하기 위해서는 주솟값을 복사한다.
-> 기본형은 주솟값을 복사하는 과정이 한번 만 이루어지고,
-> 참조형은 한 단계를 더 거치게 된다. 

기본형
	- 1단계: 주소 + 식별자 + 값이 담긴 메모리 주소 (one)
	- 2단계: 주소 + 값

참조형
	- 1단계: 주소 + 식별자 + 주소 집합을 값으로 가진 데이터의 주소
	- 2단계: 값이 담긴 메모리 주소 (many)
	- 3단계: 주소 + 값 

참조형 데이터가 '가변값'이라고 설명할 때의 '가변'은 참조형 데이터 자체를 변경할 경우가 아니라 그 내부의 프로퍼티를 변경할 때만 성립한다.
	- 객체에 새로운 값을 할당 할 때 // 불변 (새로운 값을 담을 메모리를 연결한다)
	- 객체의 속성에 새로운 값을 할당 할 때 // 가변 (값을 가르키는 주소 배열은 변경 되지 않는다)

## 05 불변 객체
### 1-5-1 불변 객체를 만드는 간단한 방법
참조형 데이터의 '가변'은 데이터 자체가 아닌 내부 프로퍼티를 변경할 때만 성립한다. (새로운 데이털르 할당하고자 하면 기존 데이터는 변하지 않는다.)

내부 프로퍼티를 변경 할 때마다 새로운 객체를 만들어 재할당하면 불변성을 지킬 수 있다.

불변 객체가 필요한 경우
	- 전달 받은 객체를 변경을 가하더라도
	- 원본 객체는 변경하지 않아야 하는 경우

얕은 복사: 기존 정보를 복사해서 새로운 객체를 반환하는 함수
```js
var copyObject = function(target){
  var result = {};
  for (var prop in target){
    result[prop] = target[prop];
  }
  return result;
```

### 1-5-2 얕은 복사와 깊은 복사
얕은 복사: 바로 아래 단계의 값만 복사하는 방법
깊은 복사: 내부의 모든 값을 하나하나 찾아서 복사하는 방법

기본형 데이터일 경우에는 그대로 복사하면 되지만
참조형 데이터는 다시 그 내부의 프로퍼티를 복사해야 한다.

참조형 데이터가 있을 때 마다 재귀적으로 수행해야만 비로서 깊은 복사가 수행된다.

```js
var copyObjectDeep = function(target){
  var result = {};
  if ( typeof target === 'object' && target !== null ){
    for (var prop in target){
      result[prop] = copyObjectDeep( target[prop] );
    }
  } else {
    result = target;
  }
  return result;
```

JSON을 활용한 간단한 깊은 복사
객체를 JOSN 문법으로 표현한 문자열로 전환 했다가 다시 JSON 객체로 바꿀수 있다.
```js
var copyObjectViaJSON = function (target) {
  return JSON.parse(JSON.stringify(target));
}
```

## undefined와 null
undefined
	- 값이 존재하지 않을 때 자바스크립트 엔진에서 자동으로 부여
		○ 값을 대입하지 않은 변수 (데이터 영의 메모리 주소를 지정하지 않은 식별자에 접근할 때)
		○ 객체 내부의 존재하지 않은 프로퍼티에 접근하려고 할 때
		○ return 문이 없거나 호출되지 않은 함수의 실행 결과
	- empty: 빈 요소를 확보했지만, 확보된 각 요소에 어떤 값도, 심지어 undefined조차도 할당돼 있지 않은 경우
	- undefined를 할당한 요소와 비어있는 요소(empty)
		○ empty: 순회 대상에서 제외 된다.
		○ 존재하지 않은 프로퍼티에 대해서는 순회할 수 없다.
		○ 배열도 특정 인덱스에 값을 지정할 때 비로서 빈 공간을 확보하고 인덱스 이름을 지정하고 데이터의 주솟값을 저장한다.
	- 값을 대입하지 않은 변수; undefined 값을 할당 하는 것이 아니라, 변수 a에 접근하고자 할 때 비로서 undefined를 반환하는 것이다.

null
	- '비어있음'을 명시적으로 내타내고 싶을 때
	- (undefiend: 값을 대입하지 않은 변수에 접근하고자 할 때 자바스크립트 엔진이 반환해주는 값)
	- 주의: typeof null //  object
	- null == object // true
	- null === object // false 

## 정리
	1. 자바스크립트의 데이터 타입은 크게 기본형과 참조형이 있다.
	2. 기본형은 불변값, 참조형은 가변값이다.
	3. 변수는 변경 가능한 데이터가 담길 수 있는 공간이고,
	4. 식별자는 그 변수의 이름이다.
	5. 변수를 선언하면
		a. 우선 빈 공간에 식별자를 저장하고
		b. 그 공간의 값은 undefined를 할당한다.
	6. 기본형 데이터를 할당하고자 하면
		a. 별도의 공간에 데이터를 저장하고,
		b. 그 공간의 주소를 변수의 값 영역에 할당한다.
	7. 참조형 데이터를 할당하고자 하면
		a. 내부 프로퍼티들은 윌한 변수 영역을 별도로 확보해서 확보된 주소를 변수에 연결하고
		b. 확보한 변수영역에 각 프로퍼피의 식별자를 저장하고
		c. 각 데이터를 별도의 공간에 저장해서 그 주소를 식별자들과 매칭시킨다.
	8. 참고형 데이터가 여러 개의 프로퍼티를 모은 그룹이기 때문에, 참조형 데이터를 가변값으로 여겨야만 하는 상황이 발생한다.
	9. 참고형 값을 불변값으로 사용: 내부 프로퍼티를 일일이 복사 (깊은 복사), 라이브러리
	10. 없음: 
		a. undefined: (자바스크립트 엔진) 어떤 변수에 값이 존재 하지 않음을 의미
		b. null: 사용자가 명시적으로 '없음'을 표현하기 위해 대입한 값








