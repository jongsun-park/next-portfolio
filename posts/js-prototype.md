---
title: "Core JavaScript - Prototype"
date: "2021-03-14"
---

클래스 기반 언어에서는 '상속'을 사용하지만,
프로토타입 기반 언어에서는 어떤 객체를 원형(prototype)으로 삼고 이를 복제(참조)함으로써 상속과 비슷한 효과를 얻는다.

## 프로토타입의 개념 이해
### 6-1-1 constructor, prototype, instance
	- 어떤 생성자 함수(Constructor)를 new 연산자와 함께 호출하면
	- Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스(instance)가 생성된다.
	- 이때 instance에는 __proto__라는 프로퍼티가 자동으로 부여되는데.
	- 이 프로퍼티는 Constructor의 prototype이라는 프로퍼티를 참조한다.

	- new Constructor => instance
	- instance.__proto__  = Constructor.prototype

prototype 객체 내부에는 인스턴스가 사용할 메서드를 저장한다. 그러면 인스턴스에서도 숨겨진 프로퍼티인 __proto__를 통해 이 메서드들에 접근할 수 있게 된다.

ES5.1 명세에는 __ proto__가 아니라 `[[prototype]]`이라는 명칭으로 정의 되어 있다.
	- △ instace.__proto__ // 브라우저 호환성을 위해 지원
	- O Object.getPrototypeOf(instance)
	- O Refelect.getPrototypeOf(instance)

```js
var Person = function(name){
  this._name = name;
}

Person.prototype.getName = function(){
  return this._name;
};

var suzi = new Person('Suzi');

suzi.__proto__.getName(); 
// undefined 
// this의 바인딩 대상이 잘못 되었다.
suzi.__proto__._name = 'SUZI__proto__';
suzi.__proto__.getName(); // SUZI__proto__

Person.prototype === suzi.__proto__ // true

var iu = new Person('Jieun', 28);
iu.getName(); // Jieun
```

__proto__
	- __proto__를 빼면 this가 instance가 된다.
	- 생략 가능한 프로퍼티
	- suzi.__proto__.getName / suzi(.__proto).getName / suzi.getName

"new 연산자로 Constructor를 호출하면 instance가 만들어지는데, 이 instance의 생략 가능한 프로퍼티인 __proto__는 Constructor의 prototype을 참조한다!"

"생성자 함수의 prototype에 어떤 메서드나 프로퍼티가 있다면 인스턴스에서도 마치 자신의 것처럼 해당 메서드나 프로퍼티에 접근할 수 있게 된다"

### 6-1-2 constructor 프로퍼티
인스턴스의 __proto__가 생성자 함수의 prototype 프로퍼티를 참조하여 __proto__가 생략가능하기 때문에 인스턴스에서 직접 constroctor에 접근할 수 있는 수단이 생긴다.
	- 생성자.prototype.constructor
	- 인스턴스(.__proto__).constructor

constructor를 변경하더라도 참조하는 대상이 변경될 뿐 이미 만들어진 인스턴스의 원형이 바뀐다거나 데이터 타입이 변하는 것은 아니다.

다음은 모두 동일한 대상을 가르킨다
	- [Constructor]
	- [instance].__proto__.constructor
	- [instance].constructor
	- Object.getPrototypeOf([instance]).constructor
	- [Constructor].prototype.constructor

다음은 모두 동일한 객체(prototype)에 접근할 수 있다.
	- [Constructor].prototype
	- [instance].__proto__
	- [instance]
	- Object.getPrototypeOf([instance])

## 02 프로토타입 체인
### 6-2-1 메서드 오버라이드
	- 원본은 제거하고 다른 대상으로 교체하는 것이 아니라 원본이 그대로 있는 상태에서 다른 대상을 그위에 얹는 이미지
	- 자바스크립트 엔진이 getName이라는 메서드를 찾는 방식은 가장 가까운 대상인 자신의 프로퍼티를 검색하고, 없으면 그다음으로 가까운 대상인 __proto__를 검색하는 순서로 진행된다.
	- __proto__ 메서드로 접근하는 방법
		○ [instance].__proto__.method.call([instance])
		○ 생성자 함수의 prototype에 접근한 후, thisArg를 인스턴스로 지정

### 6-2-2 프로토타입 체인
	- 프로토타입 체인: 어떤 데이터의 __proto__ 프로퍼티 내부에서 다시 __proto__ 프로퍼티가 연쇄적으로 이어진 것
	- 프로토타입 체이닝: 이 체인을 따라가며 검색하는 것

### 6-2-3 객체 전용 메서드의 예외사항
	- 어떤 생성자 함수이든 prototype은 반드시 객체이기 때문에 Object.prototype이 언제나 프로토타입 체인의 최상단에 존재한다.
	- Object.prototype 내부에 정의된 메서드는 다른 데이터 타입도 메서드를 사용할 수 있따.
	- 객체만을 대상으로 동작하는 객체 전용 메서들은 부득이 Oject.prototype이 아닌 Object에 스태틱 메서드로 부여할 수 밖에 없다.
	- 생성자 함수인 Object와 인스턴스인 객체 리터럴 사이에는 this를 통한 연결이 불가능하기 때문에 여느 전용 메서드처럼 '메서드 명 앞의 대상이 곧 this'가 되는 방식 대신 this의 사용을 포기하고 대상 인스턴스를 인자로 직접 주입 해야 하는 방식으로 구현되어있다.
	- 즉, instance.method() X // Object.method() O

Object.prototype에는 어떤 데이터에서도 활용할 수 있는 범용적인 메서드들만 있다. (toString, hasOwnProperty, valueOf, isPrototypeOf)

Object.create(null)은 __proto__가 없는 객체를 생성한다.
	- 내장 메서드 및 프로퍼티를이 제거됨으로써 기본 기능에 제약이 생긴 대신, 객체 자체의 무게가 가벼워짐으로써 성능상 이점을 가진다.

## 6-2-4 다중 프로토타입 체인
	- 기본 내장 데이터 타입들은 모두 프로토타입 체인이 1단계 (객체)나 2단계(나머지)로 끝난다
	- 사용자가 새롭게 만드는 경우 그 이상도 가능하다.
	- 이 방법을 통해서 다른 언어의 클래스와 비슷하게 동작하는 구조를 만들 수 있다.
	- __proto__ 가 가르키는 대상, 즉 생성자 함수의 prototype이 연결하고자 하는 상위 생성자 함수의 인스턴스를 바라보게끔 해주면 된다.

## 03 정리
	- 생성자 함수를 new 연산자와 함께 호출 하면, 
	- Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스가 생성되는데,
	- 이 인스턴스에는 __proto__라는, Constructor의 prototype 프로퍼티를 참조하는 프로퍼티가 자동으로 부여된다.
	- __proto__는 생략 가능한 속성이라서, 인스턴스는 Contructor.prototype의 메서드를 마치 자신의 메서드인 것 처럼 호출 할 수 있다.
	- Constructor.prototype에는 constructor라는 프로퍼티가 있는데, 이는 다시 생성자 함수 자신을 가리킨다. 이 프로퍼티는 인스턴스가 자신의 생성자 함수가 무엇인지 알고자 할 때 필요한 수단이다.
	- 프로토타입 체이닝: __proto__ 안에 다시 __proto__를 찾아가는 과정
	- 프로토타입 체이닝을 통해 각 프로토타입 메서드를 자신의 것처럼 호출 할 수 있다.
	- 가장 가까운 대상 부터 먼 대상으로 나아가며, 원하는 값을 찾으면 검색을 중단 한다.
	- Object.prototype에는 모든 데이터 타입에서 사용할 수 있는 범용적인 메서드만이 존재하며, 객체 전용 메서드는 여느 데이터 타입과 달리 Object 생성자 함수에 스태틱 하게 담겨 있다.
	- 프로토타입은 2단계로만 이루어지는 것이 아니라 무한대의 단계를 생성할 수 있다.

	




