---
title: "Core JavaScript - Execution Context"
date: "2021-03-14"
---

실행 컨텍스트
	- 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
	- 실행 컨텍스트가 활성화되는 시점에서
	- 선언한 변수를 위로 끌어올리고 (호이스팅),
	- 외부 환경 정보를 구성하고,
	- this 값을 설정하는 등의 동작을 수행한다.

## 01 실행 컨텍스트란?
스택과 큐
	- 스택
		○ 출입구가 하나뿐인 깊은 우물 같은 데이터 구조
		○ 선입 후출
	- 큐
		○ 양쪽이 모듀 열려있는 파이프 구조
		○ 선입선출

실행 컨텍스트
	- 실행한 코드에 제공한 환경 정보를 모아 놓은 객체
	- 동일한 환경에 있는 코드들을 실행할  환경 정보를 모아 컨텍스트를 구성하고, 이를 콜 스택에 쌓아올렸다가, 가장 위에 쌓여있는 컨텍스트와 관련 있는 코드들을 실행하는 식으로 전체 코드의 환경과 순서를 보장한다.
	- 컨텍스트를 구성하는 방법: 함수를 실행하는 것
	- 최상단의 공간은 브라우저에서 자동으로 실행된다.

실행 컨텍스트가 활성화될 때 자바스크립트 엔진은 해당 컨텍스트에 관련된 환경 정보를 수집해 실행 컨텍스트 객체에 저장한다.

활성화된 실행 컨텍스트의 수집 정보
	- VariableEnvironment: 
		○ 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보. 
		○ 선언 시점의 LexicalEnvironment의 스냅샷, 
		○ 변경된 정보는 반영되지 않는다.
	- LexicalEnvironment
		○ 처음에는 VariableEnvironment와 같지만
		○ 변경 사항이 실시간으로 반영된다.
	- ThisBinding
		○ this 식별자가 바라봐야 할 대상 객체

## 02 VariableEnvironment
실행 컨텍스트를 생성 할 때
	- VariableEnvironment에 정보를 먼저 담은 다음,
	- 이를 그대로 복사해서 LexicalEnvironment를 만들고,
	- 이후에는 LexicalEnvironment를 주로 활용한다.

## 03 LexicalEnvironment // 사전적인
컨텍스트를 구성하는 환경 정보들을 사전에 접하는 느낌으로 모아 놓은 것
"현재 컨텍스트의 내부에는 a, b, c와 같은 식별자들이 있고 그 외부 정보는 d를 참조하도록 구성돼있다"

### 2-3-1 environmentRecord와 호이스팅
environmentRecord
	- 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다.
	- 함수에 지정된 매개변수 식별자, 
	- 함수 자체, var로 선언된 변수의 식별자
	- 컨텍스트 내부 전체를 처음부터 끝까지 순서대로 수집한다.

호이스팅
	- 자바스크립트 엔진은 식별자들을 최상단으로 끌여놓은 다음 실제 코드를 실행한다.

함수 선언문과 함수 표현식

함수 선언문 (function declaration)
	- function 정의부만 존재하고 별도의 할당 명령이 없는 것
	- 함수명 O

함수 표현식 (function expression)
	- function을 별도의 변수에 할당하는 것
	- 함수명 X / 익명 함수 표현식, 기명 함수 표현식
	- 기명 함수 표현식
		○ 함수 내부에서만 함수명에 접근 가능
		○ const c = function d() { /* … */ }
		○ 변수명 c / 함수명 d 
	- 현재 기명 함수 표현식은 거의 사용 되지 않는다.
		○ 모든 브라우저들이 익명 함수 표현식의 변수명을 함수의 name 프로퍼티에 할당하고 있다.

함수 선언문은 전체를 호이스팅 하고
함수 표현식은 선언부만 끌어 올린다. (변수의 할부는 우너래 자리에 남겨둔다)

상대적으로 함수 표현식이 안전하다.
	- 함수 선언문의 경우 호이스팅 되기 때문에, 기존에 선언된 함수가 덮여쓰이게 된다.
	- 원활한 협업을 위해서는 전역공간에 함수를 선언하거나 동명의 함수를 중복 선언하는 경우는 없어야한다. 

### 2-3-2 스코프, 스코프 체인, outerEnvironmentReference

스코프
	- 식별자에 대한 유효범위
	- 외부에서 선언한 변수는 내부에서 접근이 가능하지만, 내부에서 선언된 변수는 외수에서 접근이 불가능하다.

스코프 체인
	- '식별자의 유효범위'를 안에서 바깥으로 차례로 검색해나가는 것
	- LexicalEnvironmnet / outerEnvironment
	- outerEnvironmentReference는연결리스트 형태를 띈다.
	- 선언 시점의 LexicalEnvironment를 계속 찾아 올라가면 마지막으로 전역 컨텍스트의 LexicalEnvironment에 도달한다.
	- 여러 스코프에서 동일한 식별자를 선언하는 경우, 무조건 스코프 체인 상에서 가장 먼저 발결된 식별자에만 접근 가능하다.
	- 스코프 (블록) 안에서 외부 변수를 재선언 할 수 있다.
	- 변수 은닉화 (variavle shadowing): 함수 내부 a를 선언 한 경우 함수 외부 a에 접근할 수 없다.
	
전역변수와 지역변수: 전역 공간에서 선언한 변수는 전역변수이고, 함수 내부에서 선언한 변수는 무조건 지역변수이다.

## 04 this
thisBinding에 this로 지정된 객체가 저장된다.
(선언하지 않은 경우 전역 객체가 저장된다)

## 05 정리
실행 컨택스트
	- 실행할 코드에 제공할 환경 정보를 모아놓은 객체
	- 활성화 되는 시점에서 VariableEnvironment, LexicalEnvironmnet, ThisBiding의 세 가지 정보를 수집한다.
	- 초기값: VariableEnvironment / 업데이트값: LexicalEnvironment
		○ environmentRecord: 매개변수명, 변수의 식별자, 선언함 함수명
		○ outerEnvironmentReference: 바로 직전 컨텍스트의 LexialEnvironment 정보를 참조
	- 호이스팅
		○ environmentRecord의 수집 과정을 추상화한 개념
		○ 실행 컨텍스트가 관여하는 코드 집단의 ㅚ상단으로 이들을 '끌어올린다'고 해석하는 것
		○ 함수선언문 / 함수표현식 차이 발생
	- 스코프
		○ 변수의 유효범위
		○ outerEnvironmentReference는 해당 함수가 선언된 위치의 LexicalEnvironment를 참조한다.
		○ 탐색: 현재 컨텍스트 / LexicalEnvironment > outerEnvironmentRecord / LexicalEnvironment > 전역객체
	- this: 실행 컨텍스트를 활성화하는 당시에 지정된 this가 저장
