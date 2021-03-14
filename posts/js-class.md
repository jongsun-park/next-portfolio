---
title: "Core JavaScript - Prototype"
date: "2021-03-14"
---
자바스크립트는 프로토타입 기반 언어라서 '상속' 개념이 존재하지 않는다. ES6의 클래스에서도 일정 부분은 프로토타입을 활용함으로써 클래스를 구현한다.

## 01 클래스와 인스턴스의 개념 이해
인스턴스
	- 어떤 클래스의 속성을 지니는 실존하는 개체를 일컬어 인스턴스라고 한다.
	- 어떤 조건에 부합하는 구체적인 예시
		○ 조건: 클래스
		○ 예시: 인스턴스
	- 인스턴스는 하나의 클래스만을 바탕으로 만들어 진다.

클래스
	- 공통 요소를 지니는 집단을 분류하기 위한 개념
	- 클래스가 먼저 정의돼어야만 그로 부터 공통적인 요소를 지니는 개체들을 생성할 수 있다.

## 자바스크립트의 클래스
	- const array = new Array()
	- array 는 생성자 함수 Array 의 prototype 객체 내부 요소들이 인스턴스에 상속된다.
	- (정확히는 프로토타입 체이닝에 의한 참조)
	- Array 내부 프로퍼티 증 prototype 프로퍼티를 제외한 나머지는 인스턴스에 상속되지 않는다. 
		○ 상속X: static member
		○ 상속O: instance memebr // prototype method

```js
// 생성자
var Rectangle = function (width, height){
  this.width = width;
  this.height = height;
}

// (프로토타입) 메서드
Rectangle.prototype.getArea = function(){
  return this.width = this.height;
};

// 스태틱 메서드
Rectangle.isRectangle = function (instance) {
  return instance instanceof Rectangle && instance.width > 0 && instance.height > 0;
}

var rec1 = new Rectangle(3, 4); // 인스턴스 = new Constructor
console.log(rect1.getArea()); // 12 (0) // instance method // prototype method
console.log(rect1.isRectangle(rect1)); // Error (x) // static method
cnosole.log(Rectangle.isRectangle(rect1)); // true // static method
```

프로토타입 메서드: 인스턴스에서 바로 호출 할 수 있는 메서드

스태틱 메서드: 인스턴스에서 직접 접근할 수 없는 메서드



