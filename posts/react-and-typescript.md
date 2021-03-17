---
title: "React and Typescript: Build a Portfolio Project"
date: "2021-03-16"
---

[React and Typescript: Build a Portfolio Project](https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/)

Created by Steplen Grider

# TypeScript Basic

Typescript = JavaScript + A type system

The TS Type System

- Helps us catch errors during development // 기존: 코드를 실행해서 확인해야 한다.
- Uses 'type annotations' to analyze our code
- Only active during development // 브라우저나 노드에 영향을 미치지 않는다
- Doesn't provide any performance optimization.

Process

- Typescript Code (JS + type annotations)
- Typescript Compiler
- Plain old Javascript
- Browser executes plain Javascript, has no idea we wrote Typescript

## Environment Setup

`npm install -g typescript ts-node`

`tsc --help`
(tsc typescript complier)

## A First App / fetchjson

```
mkdir fetchjson
cd fetchjson
npm init -y
npm install axios
```

index.ts

```ts
import axios from "axios";

const url = "http://jsonplaceholder.typicode.com/todos/1";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then((response) => {
  const todo = response.data as Todo;

  const id = todo.id;
  const title = todo.title;
  const completed = todo.completed;

  logoTodo(id, title, completed);
});

const logoTodo = (id: number, title: string, completed: boolean) => {
  console.log(`
  The Todo with ID: ${id}
  Has a tile of: ${title}
  Is it finished? ${completed}
  `);
};
```

`tsc index.ts` // 타입스크립트를 자바스크립트로 컴파일한 후
`node index.js` // index.ts 실행
`ts-node index.ts` // tsc index.ts + node index.js

타입 스크립트를 사용하면, 코드를 실행하기 전에 피드백을 받을 수 있다.

- interface <name>{ … }
- function ( id: number, title: string, completed: boolean ){ … }

## Types

Type

- Easy way to refer to the different properities + function that a value has
- shortcut / label / Every simple of value has a type!

"red"

- Its a stinrg
- It is a value that has all the properties + mothods that we assume that a string has

Type examples

- string: 'hi there', "", 'Today is Monday'
- number: .00025, -20, 400000000
- boolean: true, false
- Date: new Date()
- Todo: { id: 1, completed: true, title: "Trash" }

Primitive & Object

- Primitive Types:
  - number / boolean / void / undefined / string / symbol / null
- Object Types:
  - 하나의 값이 여러 타입을 가질 수 있는 경우
  - functions / arrays / classes / objects

Why do we care about types?

- Types are used by the Typescript Compiler to analyze our code for errors
- Types allow other engineers to understand what values are flowing around our codebase.
- 타입은 값이 가지는 속성과 메서드를 나타낸다. 이 타입을 사용하여 코드를 실행하기 전에 에러를 발견할 수 있다. 협업 하는 과정에서 타입은 해당 코드를 이해하는 중요한 기준이 된다.

Example of Types

```js
const today = new Date(); // const today: Date
today.getMonth();

const person = {
  // const person: { age: number }
  age: 20,
};

class Color {}
const red = new Color(); // const red: Color
```

## Type Annotations + Type Interence

- Variables
- Functions
- Objects

Type annotations // 타입 주석

- We tell Typescript the type
- Code we add to tell Typescript what type of value a variable will refer to

Type inference // 타입 추론

- Typescript guesses the type
- Typescript tries to figure out what type of value a variable refers to

## Annotations with Variables

```js
let apples: number = 5;
let speed: string = "fast";
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;

// built in objects
let now: Date = new Date();

// Array
let colors: string[] = ["red", "green", "blue"];
let myNumbers: number[] = [1, 2, 3];
let truths: boolean[] = [true, true, false];

// Classes
class Car {}
let car: Car = new Car();

// Object literal
let point: { x: number, y: number } = {
  x: 10,
  y: 20,
};

// Function
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

// : (i: number) => void // description of function
// : number // description of parameters
```

## Understanding Inference // 타입 추론

`const color = 'red'`

If declaration and initialization are on the same line, Typescript will figure our the type of 'color' for us.
값을 할당 하지 않은 경우, 타입을 추론하지 않는다. (any)

When to use

- Type inference: Any time
- Type annotations
  - When we declare a variable on one line then initialize it later // 선언만 하고 할당은 나중에 하는 경우
  - When we want a variable to have a type that can't be inferred // 타입을 추론할 수 없는 경우
  - When a function returns the 'any' type and we need to clarity the value // 특정 할 수 없는 타입을 리턴하는 경우

any

- A type, just as 'string' or 'boolean' are
- Means TS has no idea what this is - can't check for correct property references
- _Avoid variables with 'any' at all costs._
- any 타입 지정한 경우, 타입 스크립트은 제 역할을 수행하지 않는다.

```js
// 1) Function that returns the 'any' type
// input 에 따라 다양한 타임의 output 이 나올 수 있다.
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number, y: number } = JSON.parse(json);
console.log(coordinates); // {x: 10, y:20};

// 2) When we cleare a variable on one line
// an initialize it later
// 변수를 선언할 때 타입명도 같이 기재한다.
// (better) 변수를 선언할 때 기본 값도 같이 할당한다.
let words = ["red", "green", "blue"];
let foundWord = false;
// let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === "green") {
    foundWord = true;
  }
}

// 3) Variavle whose type cannot be inferred correctly
// 가능한 타입을 OR 연산자로 타입을 지정한다.
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
```

## Annotations & Inference Around Functions

Type annotations for functions

- Code we add to tell Typescript what type of arguments a function will and what type of values it will return
  - 매개변수 + 리턴값

Type inference for functions

- Typescript tries to figure out what type of value a function will return.
  - 리턴값

```js
// (param1: type, param2: type): type of return value
const add = (a: number, b: number): number => {
  return a + b;
};

const substract = (a: number, b: number): number => {
  return a - b;
};
```

## Anonymous Functions

```js
function divide(a: number, b: number): number {
  return a / b;
}

const multiply = function (a: number, b: number): number {
  return a * b;
};
```

## Void and Never

void: 반환하는 값이 없는 경우

never: 코드가 끝까지 도달하지 않는 경우 (throw error)

```js
const logger = (message: string): void => {
  console.log(message);
  // return null;
  // return undefined;
};

const throwError = (message: string): void => {
  if (!message) {
    throw new Error(message);
  }
};

// const throwError = (message: string): never => {
//   throw new Error(message);
// };

// const throwError = (message: string): string => {
//   if (!message) {
//     throw new Error(message);
//   }
//   return message;
// };
```

## Destructing with Annotations

```js
const todaysWeather = {
  date: new Date(),
  weather: "sunny",
};

const logWeather = ({
  date,
  weather,
}: {
  date: Date,
  weather: string,
}): void => {
  console.log(date);
  console.log(weather);
};

// const logWeather = (forecast: { date: Date; weather: string }): void => {
//   console.log(forecast.date);
//   console.log(forecast.weather);
// };

// // ES2015
// const logWeather = ({ date, weather }) => {
//   console.log(date);
//   console.log(weather);
// };

logWeather(todaysWeather);
```

## Annotations Around Objects

객체의 타입을 가져올 때는, 객체 구조에 따라 타입을 표기한다.

```js
const profile = {
  name: "alex",
  age: 20,
  coords: {
    lat: 0,
    lng: 15,
  },
  setAge(age: number): void {
    this.age = age;
  },
};

// const { age }: number = profile;
const { age }: { age: number } = profile;
// const { age, name }: { age: number; name: string } = profile;

const {
  coords: { lat, lng },
}: { coords: { lat: number, lng: number } } = profile;
```

## Arrays in TypeScript

Typed Arrays

- Arrays where each element is some consistent type of value
- 한 가지 타입을 가진 배열을 만한다.

```js
const carMakers: string[] = ["ford", "toyota", "chevy"];
const dates = [new Date(), new Date()];

// const carsByMake = [["f150"], ["corolla"], ["camero"]]; // :string[][]
const carsByMake: string[][] = [];
// 초기 값을 할당하지 않는 경우 타입 지정
```

## Why Typed Arrays?

Why do we care?

- TS can do type inference when extracting values from an array. 배열로 부터 값을 가져올 때 타입을 같이 가져 온다)
- TS can prevent us from adding imcompatible values to the array (지정된 타입이 아닌 값을 배열에 적용할 때 에러를 발생 시킨다.)
- We can get help with 'map', 'forEach', 'reduce' functions (해당 타입의 메서드를 쉽게 사용할 수 있다.)
- Flexible - arrays can still contain multiple different types

```js
const carMakers: string[] = ["ford", "toyota", "chevy"];
const dates = [new Date(), new Date()];

// const carsByMake = [["f150"], ["corolla"], ["camero"]]; // :string[][]
const carsByMake: string[][] = [];
// 초기 값을 할당하지 않는 경우 타입 지정

// Help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent imcompatible values
carMakers.push(100);

// Help with 'map'
carMakers.map((car: string): string => {
  return car.toUpperCase();
});

// Flexible types
// const importantDates = [new Date(), "2030-10-10"];
// (string | Date)[]

const importantDates: (string | Date)[] = [];
importantDates.push("2030-10-10");
importantDates.push(new Date());
```

## When to use typed arrays

Any time we need to represent a collection of records with some arbitary sort order.

## Tuples in typescript

Tuple

- Array-like structure where each element represents some property of a record.
- 튜플의 각 요소는 하나의 속성을 가르킨다. / 객체의 값으로 구성된 배열
- 키 값이 생략 되었으므로, 순서가 중요하다

## Tuples in action

들어갈 자료형을 지정하는 배열과 달리, 튜플은 들어갈 자료형의 순서를 지정한다.
type alias를 사용해서 interface 처럼 타입을 지정할 수 있다.

```js
const drink = {
  color: "brown",
  cardonated: true,
  sugar: 40,
};

// const pepsi = ["brown", true, 40];
// arry
// (string | boolean | number)[]
// 데이터 모델은 순서를 기반으로 한다.

// Type alias
type Drink = [string, boolean, number];

const pepsi: Drink = ["brown", true, 40];
// 항상 문자열, 불린, 숫자 순서를 가진다.
const sprite: Drink = ["clear", true, 40];
const tea: Drink = ["brown", false, 0];
```

## Why tuples?

키 값이 생략된 튜플 대신 객체를 사용하는 경우가 많다.

```js
const carSpecs: [number, number] = [400, 3354];

const carStats = {
  horsepower: 400,
  weight: 3354,
};
```

## Interfaces

Create a new type, describing the property names and value types of an object.

1. interface를 통해 중복된 코드를 줄 일 수 있다.
2. 인터페이스는 매개변수로 입력되는 객체의 타입 주석을 처리하며, 함수의 경우 반환되는 값의 타입을 지정할 수 있다.
3. 인터페이스가 작성된 경우, 함수를 호출 할 때 매개 변수 객체의 타입을 결정한다.
4. 인터페이스는 매개변수가 만족해야 하는 최소 조건 이다. (매개 변수가 다른 속성 / 메서드를 가지고 있더라도 에러가 발생하지 않는다)

```js
const oldCivic = {
  name: "civic",
  year: 2000,
  broken: true,
};

interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
}
const printVehicle = (vehicle: Vehicle): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken: ${vehicle.broken}`);
};

printVehicle(oldCivic);
```

Code Reuse with Interfaces

인터페이스 및 함수를 보다 일반적으로 만들어, 다양한 경우에 사용 할 수 있도록 한다.

```js
// Reportable: summary() 메서드를 가지고 있고 문자열을 반환한다.
interface Reportable {
  summary(): string;
}

// Reportable 인터페이스를 만족하는 인자를 가져와 summary 메서드를 출력한다.
const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};
```

## General Plan with Interfaces

1. Create functions that accept arguments that are typed with interfaces
2. Objects/classes can decide to 'implement' a given interface to work with a function
3. 함수에 인자로 들어 가는 객체는 특정 인터페이스를 만족해야한다.
4. 해당 인터페이스는 함수를 실행하기전 인자를 검수하는 역할을 한다.

## Classes

Blueprint to create an object with some fields (value) and methods (functions) to represent a 'thing'

## Basic Inheritance

## Class Method Modifiers

- public: This method can be called any where, any time
  - 기본값
- private: This method can only be called by other methods in this class\*
  - 클래스 외부에서 호출 할 수 없다.
  - 인스턴스에서 호출 할 수 없다.
  - this.fn() 형태로만 접근 가능
- protected: This method can be called by _other methods in this class_, or by _other methods in child classes._
  - 클래스 내부, 자식 클래스 내부에서 호출 할 수있다.

```js
class Vehicle {
  // drive(): void {
  //   console.log("chugga chugga");
  // }
  protected honk(): void {
    console.log("beep");
  }
}

class Car extends Vehicle {
  private drive(): void {
    console.log("vroom");
  }

  startDrivingProcess(): void {
    this.honk();
  }
}

const car = new Car();
car.startDrivingProcess();
// car.honk();
```

## Fields in Classses

```js
// class Vehicle {
//   color: string; // = "red"; // 기본값

//   constructor(color: string) {
//     this.color = color;
//   }

//   protected honk(): void {
//     console.log("beep");
//   }
// }
class Vehicle {
  constructor(public color: string) {}

  protected honk(): void {
    console.log("beep");
  }
}

const vehicle = new Vehicle("Orange");
console.log(vehicle.color); // red
```

## Fields with inheritance

```js
class Car extends Vehicle {
  constructor(public wheels: number, color: string) { // color의 경우 부모 클래스에서 선언 한 변수 이기 때문에 modifier를 따로 입력 하지 않는다.
    super(color); // 부모 클래스의 constructor을 실행한다. 필수 인자를 넘겨줘야 한다.
  }
  private drive(): void {
    console.log("vroom");
  }

  startDrivingProcess(): void {
    this.honk();
  }
}

const car = new Car(4, "red"); // 생성자 함수에 필요한 인자를 입력하여 인스턴스를 생성한다.
car.startDrivingProcess();
```

# Project - Maps

`npm install -g parcel-bundler`

타입스크립트를 브라우저에서 구동할 수 있도록 도와주는 패키지

## Parcel in Action

TS를 JS로 컴파일 해서 script 태그에 반영

`parcel index.html `

// server running at http://localhost:1234

## Project structure

one class represend one element (map / user / company)

`index.ts`

- Map.ts
  - Components
  - 대문자로 시작
  - export class 목적으로 생성된 경우
- User.ts
- Company.ts

## Generating Random Data

`npm 'faker' pacakge`

## Type Definition Files

JS 라이브러리를 TS 프로젝트로 가져올 때 TS가 JS의 타입을 검증하기 위한 Type definition file 이 필요하다. 라이브러리 마다 기본적으로 제공하는 경우도 있고, 아닌 경우도 있다. 대부분의 유명한 라이브러리는 @types/{라이브러리} 프로젝트에서 definition file 을 제공하고 있다.

Definitely Typed Naming Scheme

@types/{library name}

@types/faker

## Using type definition files

## Export statements in typescript

타입스크립트에서는 default statement를 잘 사용하지 않는다.
라이브러리에서 가져오는지, 내부 폴더에서 가져오는지 구분하기 위해서!

```js
import faker from "faker"; // 외부 라이브러리
import { User } from "./User"; // 내부 파일
```

## Defining a Company

User.ts

```js
import faker from "faker";

export class User {
  name: string;
  location: {
    lat: number,
    lng: number,
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }
}
```

Company.ts

```js
import faker from "faker";

export class Company {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number,
    lng: number,
  };

  constructor() {
    this.companyName = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      // this.location.lat // location 값이 설정되어 있지 않아 에러가 발생한다.
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }
}
```

## Adding Google Maps Support

## Google Maps Integration with TypeScript

전역 객체를 TS 안에서 사용 하는 방법 (google map 은 index.html에 script 로 삽입됨)
ctrl 클릭 후 d ts 파일에서 name space 확인!

## Hiding Functionality

외부 코드에서 내부 객체 메서드 접근을 막아야한다.
실제로 사용하는 메서드만 남기고 나머지 메서드는 숨긴다.
새로운 클래스를 만들어 필요한 메서드만 가져온다

## Why use private modifiers? Here's why

프로젝트에서 내에서 사용할 map 클래스를 만들고,
외부에서 금지할 메서드/속성은 private를 할당한다.
private로 설정된 메서드/속성은 클래스 내에서만 접근이 가능하다.

```js
export class CustomMap {
  private googleMap: google.maps.Map;
  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: { lat: 0, lng: 0 },
    });
  }
}
// const customMap = new CustomMap();
// customMap.googleMap; // 접근 불가
```

## Adding Markers

```js
  addUserMaker(user: User): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: user.location.lat,
        lng: user.location.lng,
      },
    });
  }
```

## Duplicate code

다른 두 메서드가 비슷한 로직으로 사용되는 경우

## One possible solution

```js
addMarker(mappable: User | Company): void {}
// User, Company 인터페이스를 순회하면서 동시에 가지고 있는 키와 값을 타입 기준으로 삼는다. // location 타입을 가진 인자만을 가지고 온다.
```

문제점: 확장성 한계 / 맵에 클래스를 추가 할 때 마다 CustomMap 을 수정해야 한다.

마크에 표시할 클래스는 특정 조건을 만족해야 한다.
특정 조건을 인터페이스로 분리해서 재사용한다.

## Implicit Type Checks

## Showing Popup Windows

## Updating inteface definitions

## Optional implementation clauses

```js
interface Mappable {
  //
}

class User implements Mappable {
  //
}
```

User 의 인스턴스는 반드시 Mappable 인터페이스를 만족해야한다.
인스턴스를 검수 할 뿐만 아니라 클래스 자체를 검수 할 수 있도록 한다.

Typical Typescript File

- Interface definitions for working with this class
- Class definition

# 2 Types Around Props and State

자식 컴포넌트 안에서 interface를 지정하고, props에 해당 인터페이스를 적용한다.
부모 컴포넌트에서 해당 자식 컴포넌트를 사용할 때, 인터페이스에서 지정한 값을 반드시 포함시켜야 한다.

Parent -> Child

- Interface to define what props Child expects to receive.

Parent

- Are we providing the correct props to Child when we show it in Parent?

Child

- Are we using the correctly named + typed props in Child?

```js
interface ChildProps {
  color: string;
}

export const Child = ({ color }: ChildProps) => {
  return <div>{color}</div>;
};

export const ChildAsFC: React.FC<ChildProps> = ({ color }) => {
  // React.FunctionComponent
  return <div>{color}</div>;
};
```

`({color}: ChildProps) `

- 타입스크립트는 해당 코드가 리액트 코드인지 인지 할 수 없다.
- propTypes / displayName / defaultProps / contextTypes 속성에 접근할 수 없다.

`export const Child: React.FC<ChildProps> = ({color}) => {`

- 'Child' will be a React function component
- 'Child' might have properties assigned to it like 'propTypes' and 'contextTypes'
- 'Child' will receive props of type 'ChildProps'

## Annotations with Children

리액트 컴포넌트 React.FC<ChildProps> 인 경우 children props를 자동으로 가진다.  
React.FC로 설정하지 않은 경우, children 을 인터페이스에 추가해야 한다.

Parent.tsx

```js
import { ChildAsFC } from "./Child";

const Parent = () => {
  return (
    <ChildAsFC
      color="red"
      onClick={() => {
        console.log("click");
      }}
    ></ChildAsFC>
  );
};

export default Parent;
```

Children.tsx

```js
interface ChildProps {
  color: string;
  onClick: () => void;
}

export const Child = ({ color, onClick }: ChildProps) => {
  return (
    <div>
      {color}
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

export const ChildAsFC: React.FC<ChildProps> = ({
  color,
  onClick,
  children,
}) => {
  return (
    <div>
      {color}
      {children}
      <button onClick={onClick}>Click me</button>
    </div>
  );
};
```

## State with Typescript

`const GuestList: React.FC = () => {`

부모 요소에서 자식 요소에 전달하는 props 가 없는 경우, 이전 처럼 `<interface>` 를 작성하지 않아도 된다.

## Type Inference with State

```js
const [name, setName] = useState("");
const [guests, getGuests] = useState<string[]>([]);
// seState([]); // 타입을 지정하지 않으면 never[] 로 지정되어, setState를 사용할 수 없다.
```

## Type Unions in state

```js
const [name, setName] = useState("");
const [user, setUser] = useState<{ name: string; age: number } | undefined>();
// 입력 가능한 타입을 or 연산자를 사용해서 지정할 수 있다
```

# 3 Types Around Events and Refs

## Inline Event Hanlders

```js
const onChange = (e) => {
  console.log(e);
};
// Parameter 'e' implicitly has an 'any' type.
```

## Typing standalone event handlers

standalone: 독립형 / 다른 어떤 장치의 도움도 필요 없이 그것만들으로 완비된 장치

에러가 일어 나는 이유?

- 타입 추론은 오직 인라인으로 이벤트가 연결 되었을 때만 적용된다. 함수 표현식으로 작성된 이벤트의 경우 적용되지 않는다.
- 함수를 선언 할 때, 이벤트 객체에 대한 타입을 지정 해줘야한다. 타입 추론되는 타입을 확인하고 복사해서 타입을 지정한다.

```js
const onChange = (event: ReactChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};
```

## Handling drag events too!

```js
const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
  console.log(event);
};

<div draggable onDragStart={onDragStart}>
  Drag Me!
</div>;
```

onDragStart props에 마우스를 올려서 나오는 이벤트 객체의 타입을 복사해 이벤트 객체의 타입을 지정한다.

## TypeScript with Class Components

```js
interface User {
  name: string;
  age: number;
}
interface UserSearchProps {
  users: User[];
}

interface UserSearchState {
  name: string;
  user: User | undefined;
}

class UserSearch extends Component<UserSearchProps> {
  state: UserSearchState = {
    name: "",
    user: undefined,
  };

  onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const foundUser = users.find((user) => {
      return user.name === this.state.name;
    });
    this.setState({ user: foundUser });
  };

  render() {
    const { name, user } = this.state;
    return (
      <div>
        <h1>User Search</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <button onClick={this.onClick}>Find User</button>
        <div>
          {user && user.name}
          {user && user.age}
        </div>
      </div>
    );
  }
}

export default UserSearch;
```

interface 1. class props // UserSearchProps 2. state // UserSearchState 3. common interface // User

## Applying Types to Refs

```js
const inputRef = (useRef < HTMLInputElement) | (null > null);

<input
  type="text"
  value={name}
  ref={inputRef}
  onChange={(e) => setName(e.target.value)}
/>;
```

`<HTMLInputElement | null>(null)`

- ref는 input element에 적용된다.
- 적용되기 전까지는 값이 없을 수 있으며
- 기본 값으로 null을 적용한다.

ref를 사용하기 위해서는 해당 값이 null인지 아닌지 먼저 확인해야 한다. 현재 값이 없으면 useEffect를 조기 종료 시킨다.

```js
useEffect(() => {
  if (!inputRef.current) {
    return;
  }
  inputRef.current.focus();
}, []);
```

wildcard // any
` const inputRef = useRef<any>();`

# 4 Typescript with Redux

## Overview

    1. 텍스트를 입력 하고
    2. 버튼을 클릭하면
    3. 결과를 출력

`npx create-react-app redux-ts --template typescript`

## Project setup

```
npm install --save-exact @types/react-redux@7.1.15 axios@0.21.1 react-redux@4.0.5 redux-thunk@2.3.0

npm start
```

## Redux store design

In a TS project, I really recommend you think about design first

Action creators

- searchRepositories(term)

Actions

- SearchRepositories
- SearchRepositoriesSuccess
- SearchRepositoriesError

Action Types

- search_repositories
- search_repositories_success
- search_repositories_faile

Reducer / Redux Store

- repositories
  - data // List of repositories from NPM
  - loading // True/false whether we are fetching data
  - error // Stringm error message if one occured during fetch

src

- components: App.tsx, RepositoriesList.tsx
- redux: index.ts // reducers, action creators, middle-wares
  - 모든 리덕스 관련 코드를 index.ts를 통해서 다른 components로 가져간다.

## Reducer setup

```js
interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

const reducer = (state: RepositoriesState, action: any) => {
  switch (action.type) {
    case "search_repositories": // 사용자가 검색 버튼을 눌렀을 때
      return {
        loading: true, // 로딩 시작
        error: null, // 에러 초기화
        data: [], // 데이터 초기화
      };
    case "search_repositories_success": // fetch가 완료 되었을 때
      return {
        loading: false, // 로딩 종료
        error: null, // 에러 초기화
        data: action.payload, // 데이터 넘겨주기
      };
    case "search_repositories_error":
      return {
        loading: false, // 로딩 종료
        error: action.payload, // 데이터 넘겨주기
        data: [], // 데이터 초기화
      };
    default:
      // 기본값, state 그대로 반환하기
      return state;
  }
};
export default reducer;
```

리듀서가 반환 하는 state의 타입을 지정하는 방법?
지금 코드는 data에 어떠한 타입도 입력이 가능하다.

## Annotating the return type

```js
const reducer = (state: RepositoriesState, action: any): RepositoriesState => { … }

// props 와 return 값 모두에 interface를 지정한다.
```

## Typing an action

```js
interface Action {
type: string;
payload?: any;
}

const reducer = (
state: RepositoriesState,
action: Action
): RepositoriesState => { … }
```

## Seperate Interfaces fro Actions

액션 타입에 따라 다른 인터페이스를 연결한다.

```js
interface SeachRepositoriesAction {
  type: "search_repositories";
}
interface SeachRepositoriesActionSuccess {
  type: "search_repositories_success";
  payload: string[];
}
interface SeachRepositoriesActionError {
  type: "search_repositories_Error";
  payload: string;
}
```

## Applying action interfaces

```js
const reducer = (
state: RepositoriesState,
action:
| SeachRepositoriesAction
| SeachRepositoriesActionSuccess
| SeachRepositoriesActionError
): RepositoriesState => { … }
```

action.type === "search_repositories" 를 만족하면, action은 반드시 payload를 문자열 배열 형태로 가진다 (인터페이스를 충족한다)

## Adding an action type enum

emum // enumeration // 열거형

```js
type Action =
| SeachRepositoriesAction
| SeachRepositoriesActionSuccess
| SeachRepositoriesActionError;

const reducer = (
state: RepositoriesState,
action: Action
): RepositoriesState => { }

enum ActionType {
SEARCH_REPOSITORIES = "search_repositories",
SEARCH_REPOSITORIES_SUCCESS = "search_repositories_success",
SEARCH_REPOSITORIES_ERROR = "search_repositories_error",
}
```

## A better way to organize code

state

- action-types
- actions
- reducers

```js
// state/action-types/index.ts
export enum ActionType {
SEARCH_REPOSITORIES = "search_repositories",
SEARCH_REPOSITORIES_SUCCESS = "search_repositories_success",
SEARCH_REPOSITORIES_ERROR = "search_repositories_error",
}

// state/actions/index.ts
import { ActionType } from "../action-types";

export interface SeachRepositoriesAction {
type: ActionType.SEARCH_REPOSITORIES;
}
export interface SeachRepositoriesActionSuccess {
type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
payload: string[];
}
export interface SeachRepositoriesActionError {
type: ActionType.SEARCH_REPOSITORIES_ERROR;
payload: string;
}

export type Action =
| SeachRepositoriesAction
| SeachRepositoriesActionSuccess
| SeachRepositoriesActionError;

// state/reducers/respositoriesReducer.ts
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface RepositoriesState {
loading: boolean;
error: string | null;
data: string[];
}

const reducer = ()=>{}
```

## Adding Action Creators

## Adding request login

react-thunk // asynchrouse request call

```js
export const searchRepositories = (term: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    try {
      const { data } = await axios.get(url, {
        params: {
          text: term,
        },
      });
      const names = data.objects.map((result: any) => result.package.name);

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES,
        payload: names,
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: err.message,
      });
    }
  };
};
```

## Applying typings to dispatch

dispatch: any

dispatch의 타입이 설정 외 있지 않았다

const Action = interface | interface | interface

import {Dispatch} from 'redux'; // 리덕스에서 제공하는 함수

dispatch: Dispatch<Action>

인터페이스를 디스패치 한 결과의 타입을 지정한다. 만약 액션에서 정의한 결과와 일치 되지 않는 경우 에러를 발생시킨다.

## Setting up exports

```js
// root reducers // src/state/reducers/index.ts
import { combineReducers } from "redux";
import repositoriesReducer from "./repositoriesReducer";

const reducers = combineReducers({
repositories: repositoriesReducer,
});

export default reducers;

// store // src/state/store.ts
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// src/state/index.ts
export _ from "./store";
export _ as actionCreators from "./action-creators";
```

## Wiring Up to React

```js
// src/components/App.tsx
import { Provider } from "react-redux";
import { store } from "../state";
import RepositoriesList from "./RepositoriesList";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Search For a Package</h1>
        <RepositoriesList />
      </div>
    </Provider>
  );
};

export default App;
```

## Initial States

```js
const initialState = {
loading: false,
error: null,
data: [],
};

const reducer = (
state: RepositoriesState = initialState,
action: Action
): RepositoriesState => { … }
```

## Reminder on Event Types

```js
import { useState } from "react";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default RepositoriesList;
```

## Calling an action creator

```js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../state";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actionCreators.searchRepositories(term));
  };
```

## Binding action creators

```js
// src/hooks/useAction.ts
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
  // { searchRepositories: disaptch(searchRepositories) }
  // 객체 형태로 반환 한다.
  // 사용: const { searchRespositories } = useActions(); searchRespositories(term);
  // = dispatch(actionCreators.searchRepositories(term));
};
```

## Selecting state

```js
import { useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useActions();
  const { data, error, loading } = useSelector(
    (state: any) => state.repositories
  );
  console.log(data);
```

state: any // Property 'repositories' does not exist on type 'DefaultRootState'.

## Awkward typings around react-redux

```js
// src/state/reducers/index.ts
// ReturnType: Constructs a type consisting of the return type of function Type.
export type RootState = ReturnType<typeof reducers>;

// src/state/index.ts
export \* from "./reducers";
```

## Creating a typed seletor

```js
// src/hooks/useTypedSelector.ts

import { useSelector, TypedUseSelectorHook } from "react-redux";
// import { useSelector as \_useSelector, TypedUseSelectorHook } from "react-redux";
// export type RootState = ReturnType<typeof reducers>;
import { RootState } from "../state";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useSelector: TypedUseSelectorHook<RootState> = \_useSelector;

// src/components/RepositoriesList.tsx
import { useTypedSelector } from "../hooks/useTypedSelector";

const { data, error, loading } = useTypedSelector(
  (state) => state.repositories
);
// (parameter) state: CombinedState<{ repositories: RepositoriesState; }>
```

## Consuming store state

```js
const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // dispatch(actionCreators.searchRepositories(term));
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>loading...</h3>}
      {!error && !loading && data.map((name) => <div key={name}>{name}</div>)}
    </div>
  );
};
```

## Quick wrapup

Bid issues with Redux/React-Redux + Typescript

- Imports between files can turn into a mess very quickly
- Communicating types over to your components can be challaging
- Type def files for Redux, React-Redux, and others are possibly over-engineered

# 6 Code Transpiling in the Browser

## Transpiling Options

바벨 트랜스파일러
작성한 코드를 브라우저에서 실행할 수 있는 코드로 변경해주는 것

ex. codepen.io / babeljs.io

옵션 1 (코드펜)
작성 된 코드를 문자열로 백앤드로 요청하고, 서버에서 트랜스파일 되어 클라이언트로 응답한다.

## Remote Transpiling

옵션 2 (바벨)
Code -> In-Browser Transpiler -> Transpiled Result

## Module Systems

Javascript modules

- 다른 파일에서 모듈을 가져와 사용 하는 것
- export / import
- AMD / common js / ES Modules
- ES Module (import) -> Transpiler -> Common js (require)

Bundler (Webpack) : Single file containing both modules linked together in some way

## Behind the Scenes with Webpack

`npm install --save-exact webpack@5.11.1 webpack-cli@4.3.0`

```json
// package.json
"scripts": {
"build": "webpack --mode=development"
},
```

webpack process
각 코드의 경로를 webpack_modules의 속성으로 설정하고.
경로를 인자로 전달하면 특정 값을 리턴하는 함수를 작성한다.
그 결과 하나의 파일에서 모든 스크립트에 접근이 가능해 진다.

// dist/main.js

```js
var webpack_modules = {
  "./src/message.js": (module) => {
    module.exports = "Hi there!"; // commonjs
  },
};

function webpack_require(moduleId) {
  return "Hi there!";
}
```

// index.js

```js
const message = webpack_require("./src/message.js");
console.log(message);
```

## Webpack with ES Modules

webpack은 commonjs와 ES module 모두 호환한다.

## One small change

Bundler

- Read the contents of the entry file (index.js) // 엔트리에 있는 모든 콘텐츠를 확인한다.
- Automatically found all the different require/import/export statements // commonjs, ES module을 기반으로 모든 모듈을 자동으로 탐색한다.
- Automatically found all the modules on our hard drives
  - -> Automatically find all the modules the user has imported from NPM
  - 하드 드라이브에서 모듈을 가져오는 것을 npm 에서 가져오는 것으로 수정한다.
- Linked these files together into a single output file with all values being correctly communicated around.
  - 연결된 모든 파일을 하나의 결과물 (dist/main)으로 만들어 제대로 구동 되도록 한다.

## Options for bundling

NpmInstallWebpackPlugin

### Options 1

- codepen
- 클라이언트(리액트앱) 에서 백엔드 서버로 코드를 전송하고,
  백엔드에서 웹팩이 코드를 번들링하여 리액트앱으로 다시 코드를 전송한다.
- 번들링 하는 과정 필요한 모듈은 플러그인 (NpmInstallWebpackPlugin)을 통해 npm registry에서 가져와 백엔드에서 설치한다.
- 문제점: 사용자가 요청한 모듈이 웹팩에 없는 경우, 계속 해서 설치하게 된다. 결국 서버의 메모리는 과부하 될 수 밖에 없다.

Options 2

- 새로운 모듈을 webpack 이 직접 npm registry에 접속해 웹서버에 설치하는 하는 것이 아니라,
- 새로운 플러그인을 만들어 webpack에서 새로운 모듈을 요청 하기 전에, npm registry에 접근해 모듈을 다운 받고, 캐쉬 한 다음 번들링을 진행한다. 요청 시 마다 모듈을 새로 설치하지 않아도 된다.

Options 3

- babeljs
- 번들링 과정을 프론트엔드에서 처리하고, 모듈을 가져올 때는 npm registry 에 필요한 모듈만 요청해서 가져 온다.

## So which approach?

Transpiling/Bundling Remotely or Locally?

- Remote
  - We can cache downloaded NPM modules to bundle code faster
  - Will work better for users with slow devices or limited internet connections
- Local
  - Removes an extra request to the API server - faster code execution!
  - We don't have to maintain an API Server!
  - Less complexity - no moving code back and forth
- one small problem
  - webpack doesn't work in the browser

## A webpack Replacement

ESBuild = Babel + Webpack

Babel: Transpiling // Wroks in the browser
Webpack: Bundling // Doesn't work
ESBuild: ESBuild can transpili + bundle out code - all in the browser!

# 7 Implementing In-Browser Bundling

## A Demo App

`npx create-react-app jbook --template typescript`

유저로 부터 코드를 입력받고, 제출을 하면, 트랜스파일한 문자열을 보여주는 앱

## Project Setup

`npm install --save-exac esbuild-wasm@0.8.27`

`npm i --save-dev @types/react`

리액트 컴포넌트의 타입이 any로 지정된 경우 에러가 발생한다.

## Basic Form Elements

## Understanding ESBuild

esBuild 는 go 로 작성되었다.

입력된 코드는 자바스크립트로 감싸지고, 감싸진 코드는 Go를 통해 트랜스파일 된다.

JS: Code we're going to interact with in out React App.
WASM: Go lang bundler compiled to work in the browser. (웹 어셈블리를 통해 다른 번들러 보다 훨씬 빠르게 컴파일 할 수 있다.)

node_modules/esbuild-wasm/esbuild.wasm 을 복사해서
public/esbuild.wasm 로 가져오고, 브라우저를 통해서 접근 가능 하도록 한다.

## Initializing ESBuild

```js
import * as esbuild from "esbuild-wasm";
import { useState, useEffect } from "react";

const App = () => {
const startService = async () => {
const service = await esbuild.startService({
worker: true,
wasmURL: "/esbuild.wasm", // 퍼블릭 폴더에 있는 웹어셈블리 코드
});
console.log(service);
// 이 객체의 메서드를 사용해서 코드를 번들하거나 트랜스파일 할 수 있다.
// build: bundling
// transform: transfiling
};

useEffect(() => {
startService(); // 초기 렌더링 된 후 서비스 객체를 생성 한다.
}, []);
```

## Using Refs for Arbitary Values

Arbitary Values - 임의 값 // 렌더링에 영향을 주지 않는 변수

```ts
const ref = useRef<any>();
const startService = async () => {
  ref.current = await esbuild.startService({
    worker: true,
    wasmURL: "/esbuild.wasm",
  });
};
useEffect(() => {
  startService();
}, []);

const onClick = () => {
  if (!ref.current) {
    return;
  }
  console.log(ref.current);
};
```

## Transpiling works!

```ts
const onClick = async () => {
  if (!ref.current) {
    return;
  }
  const result = await ref.current.transform(input, {
    loader: "jsx",
    target: "es2015",
  });
  setCode(result.code);
};
```

## Troubles with bunding in the browser

ESBuild

- 번들링: 파일 시스템을 통하여 사용자의 하드 드라이브에 있는 모듈의 경로를 탐색 한다.

Building in Browser

- 브라우저에서는 파일 시스템에 접근 할 수 없다.
- ESBuild 가 모듈을 탐색하려고 할 때 하드 드라이브에서 모듈을 검색하지 않고
- npm 레지스트리에 모듈을 검색 한 다음, 모듈의 주소를 ESBuild에 전달한다.

## Issues with NPM

`npm view react dist.tarball`

실제로 다운로드 가능한 주소를 출력한다.

https://registry.npmjs.org/react/-/react-17.0.1.tgz

main 파일 (index.js)를 찾아, 내보내는 모듈을 가져와야 한다.
react / index.js / module.exports = require('./cjs/react.development/js');

## Solution with Unpkg

CORS - 브라우저 안에서 자바스크립트 요청을 할 경우, 현재 url 정보를 담아 전달한다. npm 의 경우 자기 도메인을 제외하고 모두 응답을 거절 하지 않는다.

unpkg - public cdn
npm 레지스트리를 거치지 않고 unpkg.com 을 통해 바로 모듈을 다운 받을 수 있다.
unpkg.com/react@17.0.1/index.js

## Demo Esbuild Plugin

```ts
// upkPathPlugin
import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /._/ }, async (args: any) => {
        console.log("onResole", args);
        return { path: args.path, namespace: "a" };
      });
      build.onLoad({ filter: /._/ }, async (args: any) => {
        console.log("onLoad", args);
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `import message from './message'; console.log(message);`,
          };
        } else {
          return {
            loader: "jsx",
            contents: 'export default "hi there"',
          };
        }
      });
    },
  };
};

// index.tsx
const onClick = async () => {
  if (!ref.current) {
    return;
  }
  const result = await ref.current.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin()],
  });

  setCode(result.outputFiles[0].text);
};
```

## Deep dive on bundling

Please bundle the index.js file

- ESBuild Bundling Process
  - Figure out where the index.js file is stored // onResolve step
  - Attempt to load up the index.js file // onLoad step
  - Parse the index.file, find any import/require/exports
  - If there are any import/require/exports, figure out where the request file is // onResolve step
  - Attempt to load that file up // onLoad step

```ts
build.onResolve =
  ({ filter: /.\*/ },
  async (args: any) => {
    return { path: args.path, namespace: "a" };
  });
// return {path, namespace}

build.onLoad =
  ({ filter: /.\*/ },
  async (args: any) => {
    if (args.path === "index.js") {
      return {
        loader: "jsx",
        contents: ``,
      };
    } else {
      return {
        loader: "jsx",
        contents: "",
      };
    }
  });
// return {loader, contents}
```

## Filters and Namepsaces

regular expression: filter: /.\*/ - 실행할 파일의 이름을 필터한다

build.onLoad({filter: /.\*/, namepsace: 'b' }, // 네임스페이스가 b인 파일만 실행한다

## Adding a Tiny Test Package

# 8 Dynamic Fetching and Loading of NPM Modules

## 71 Dynamically Fetching Modules

path에 따라 index.js 를 반환 하던지, axios를 통해 unpkg.com 에 접속해서 해당 모듈의 index.js 파일을 가져온다.

```js
const { data } = axios.get("http://unpkg.com/…/index.js");
return { loader: "jsx", contents: data };
```

## 72 Generating the Unpkg URL

args.path 를 동적으로 사용하게 만들기

```js
return {
  namespace: "a",
  path: `https://unpkg.com/${args.path}`,
};
```

## 73 Issues with Multi-File Packages

medium-test-pkg (다른 모듈을 가져오는 경우)

- `const upperCase = require('./utils')`
- https://unpkg.com/./utils - 실제 실행 되는 경로
- https://unpkg.com/medium-test-pkg/utils.js - 의도한 경로
- 삽입하는 모듈안 index.js 파일 내 import/require 구문이 루트경로를 가리키는 것이 아니라 모듈내 경로를 가리키도록 코드를 변경해야 한다.

## 74 Solving Relative Paths

URL 생성자 함수를 사용해서 상대 경로를 지정할 수 있다.

```ts
const url = "https://unpkg.com/medium-test-pkg";
new Url("./utils", `${url}`); // https://unpkg.com
// href: "https://unpkg.com/utils"
// utils 모듈을 가르킨다.

new Url("./utils", "https://unpkg.com/medium-test-pkg/");
// href: "https://unpkg.com/medium-test-pkg/utils"
// 경로에 /를 붙이고, href 가 medium-test-pkg의 하위 모듈을 가르킨다.

new Url("../utils", "https://unpkg.com/medium-test-pkg/");
// href: "https://unpkg.com/utils"
// ../ 상위 폴더를 가르키기 때문에 unpkg의 utils 모듈을 가르킨다.
```

## 75 Using the URL Constructor

```ts
if (args.path.includes("./") || args.path.includes("../")) {
  return {
    namespace: "a",
    path: new URL(args.path, args.importer + "/").href,
  };
}
```

## 76 Failing Nested Requires

nested-test-pkg

패키지 경로를 입력 했을 때 자동으로 src 폴더 내부의 index.js 에 입력된다.

entry file - src/index.js

we got: ~/nested-test-pkg/helpers/utils
we need: ~/nested-test-pkg/src/helpers/utils

패키지 마다 다른 구조를 가지고 있다!

Fetching the main file of a package

- https://unpkg.com/
- package name

- https://unpkg.com/nested-test-pkg
- 리다이렉트
- https://unpkg.com/nested-test-pkg/src/index.js

Fetching any other file in that package

- https://unpkg.com/
- directory the last file was found in
- the require statement for this file

- './utils'
- 마지막으로 접근한 패키지의 경로를 사용한다.
- https://unpkg.com/ + /nexted-test-pkg/src/ + ./helpers/utils.js
- https://unpkg.com/nested-test-pkg/src/helpers/utils.js

## 77. Resolving Nested Paths

onLoad() => onResolve

- onLoad: `return { resolveDir: new URL("./", request.responseURL).pathname }`
- onResolve: `return { path: new URL( args.path, "https://unpkg.com" + args.resolveDir + "/").href}`

패키지의 메인 파일(index.js)가 아니라 패키지 내부 다른 경로('./utils/helper.js')에 있는 모듈을 가져올 수 있다.

이 경우 마지막 요청에서 받은 패키지 경로를 가져와서 해당 모듈의 경로를 전달한다.

```ts
export const unpkgPathPlugin = () => {
  return {
    name: "",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        //
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //
        const { data, request } = await axios.get(args.path);
        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
      });
    },
  };
};
```

## Defines During Bundling

error message
warning: Define "process.env.NODE_ENV" when bundling for the browser
12 │ if (process.env.NODE_ENV !== "production") {
╵ ~~~~~~~~~~~~~~~~~~~~

index.tsx/App/onClick/result/define

- 번들링 과정에서 일부 변수를 정의된 값으로 할당 하고, 번들 과정에서 불필요한 코드는 출력하지 않는다. (ex. if("production" === "production"))
- '"production"': "production" (string)
- "window": window (변수)

```js
const result = await ref.current.build({
  entryPoints: ["index.js"],
  bundle: true,
  write: false,
  plugins: [unpkgPathPlugin()],
  define: {
    "process.env.NODE_ENV": '"production"',
    global: "window",
  },
});
```

# Cashing For Big Performance Gains

## Crazy Numbers of Reqeusts

## Implementing a Cashing Layer

Cache

- onLoad 할 때 이전에 요청한 적 있으면 바로 리턴하고, 아닌 경우 unpkg 에 요청하기 해당 모듈 가져오기.
- 저장소
  - localStorage // 번들링된 코드를 가져오기에는 너무 클 수 있다.
  - indexedDB // (library) localforage

## Caching with Key-Value Pairs

onLoad 가 실행 될 때, 해당 경로 (args.path)를 키로 가지는 indexedDB 가 있는지 확인 하고, 없는 경우 fetch를 한 후 DB에 저장하고, 그 결과를 리턴한다.

localForage

```js
import localForage from "localforage";
const fileCache = localForage.createInstance({
  name: "filacashe",
});

// (async () => {
//   await fileCache.setItem("color", "red");
//   const color = await fileCache.getItem("color");
//   console.log(color);
// })();

build.onLoad({ filter: /.*/ }, async (args: any) => {
  const cachedResult = await fileCache.getItem(args.path);

  if (cachedResult) {
    return cachedResult;
  }

  const { data, request } = await axios.get(args.path);

  const result = {
    loader: "jsx",
    contents: data,
    resolveDir: new URL("./", request.responseURL).pathname,
  };

  await fileCache.setItem(args.path, result);

  return result;
});
```

## Fixing a TypeScript Error

리턴하는 값의 타입을 지정해주어야 한다.

함수 몸통에서 선언/할당 되는 cachedResult 와 result는 esbuild의 OnLoadResult 인터페이스를 따른다. 메서드는 `<esbuild.OnLoadResult>`, 변수는 `:esbuild.OnLoadResult` 형태로 타입을 지정해 준다.

```js
async (args: any) => {
  const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
  if(){
    return cashedResult
  }
  const result: esbuild.OnLoadResult = {}
  return result
}
```

## Bundling User Input

사용자가 입력한 문자열을 플러그인으로 전달한다.

index.js 파일을 시작으로 import/require 구문을 추출하여 모듈을 가져오고, jbook에서는 사용자가 입력한 코드를 기반으로 모듈을 추출한다.

app.tsx

```js
const result = await ref.current.build({
  entryPoints: ["index.js"],
  plugins: [unpkgPathPlugin(input)],
});
```

unpkgPathPlugin.ts

```js
export const unpkgPathPlugin = (inputCode: string) => {
  build.onLoad({}, async () => {
    return {
      loader: "jsx",
      contents: inputCode,
    };
  });
};
```

## Breaking Up Resolve Logic With Filters

정규표현식을 사용해서, 경로에 따라 onLoad로 전달할 객체를 리턴한다.

```js
// Handle root entry entry file of 'index.js'
  build.onResolve({ filter: /(^index\.js$)/ }, () => {
    return { path: "index.js", namespace: "a" };
  });

  // Handle relative paths in a module
  build.onResolve({ filter: /^\.+\// }, (args: any) => {
    return {
      namespace: "a",
      path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
        .href,
    };
  });

  // Handle main file of a module
  build.onResolve({ filter: /.*/ }, async (args: any) => {}
```

## Refactoring to Multiple Plugins

unpkg 에서 패키지 경로를 찾는 로직(onResolve)과 해당 경로의 모듈을 가져오는 로직(onLoad)을 분리한다.

- unpkgPathPlugin.ts
- fetch-plugin.ts

fetch-plugin.ts

```ts
import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin ",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //
      });
    },
  };
};
```

index.tsx

```ts
const result = await ref.current.build({
  plugins: [unpkgPathPlugin(), fetchPlugin(input)],
});
```

## Loading CSS Files

```ts
import "bulma/css/bulma.css";
```

현재 esbuild 의 번들링은 jsx 기준으로 작성된다.
css 파일의 경우 번들링 과정에서 에러가 발생한다. (undefined @, ".")

## Configuring the Correct Loader

esbuild.github.io
css

- loader: 'css'
- 자바스크립트와 CSS를 분리해서 번들링을 해야한다.

경로에 .css가 포함된 경우 css로 로드하고, 그 외에는 jsx로 로드한다.

fetch-plugin.ts

```ts
const loader = args.path.match(/.css$/) ? "css" : "jsx";
const result: esbuild.OnLoadResult = {
  loader: loader,
};
```

## Small Shortcoming with ESBuild

CSS 파일은 index.js에 inject 될 수 없다.

CSS 가져와서 자바스크립트로 감싼 다음, 다른 JS 파일과 번들링 한다.

## Tricking ESBuild's CSS Handling

fetch-plugin.ts

```ts
const fileType = args.path.match(/.css$/) ? "css" : "jsx";
const contents =
  fileType === "css"
    ? `
    const style = document.createElement('style');
    style.innerText = 'body{background-color: "red" }';
    documnet.head.appendChild(style);
  `
    : data;

const result: esbuild.OnLoadResult = {
  loader: "jsx",
  contents: contents,
  resolveDir: new URL("./", request.responseURL).pathname,
};
```

한계: esBuild 가 제공하는 최신 문법을 사용할 수 없다.

## Escaping CSS Snippets

CSS 코드가 안전하게 실행 될 수 있도록, ", ', 줄바꿈을 이스케이핑 해준다.

fetch-plugin.ts

```ts
const escaped = data
  .replace(/\n/g, "")
  .replace(/"/g, '\\"')
  .replace(/'/g, "\\'");

const fileType = args.path.match(/.css$/) ? "css" : "jsx";
const contents =
  fileType === "css"
    ? `
  const style = document.createElement('style');
  style.innerText = '${escaped}';
  document.head.appendChild(style);
`
    : data;
```

## Seperate Load Filters

모듈을 3가지 타입으로 나누어 다른 객체를 리턴한다.

1. `index.js`: 패키지의 메인 파일
2. `.css`: 스타일시트
3. `.js`: 나머지 자바스크립트

fetch-plugin.ts

```ts
export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin ",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {..})
      build.onLoad({ filter: /.css$/ }, async (args: any) => {...})
      build.onLoad({ filter: /.*/ }, async (args: any) => {...})
    }

```

## Extracting Common Cashing Logic

onLoad 메서드의 리턴 값이 없는 경우, 다음 미들웨어(onLoad) 실행한다.

```ts
build.onLoad({ filter: /(^index\.js$)/ }, () => {..})
build.onLoad({ filter: /.*/ }, async (args: any) => {
  const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
  if (cachedResult) {
    return cachedResult;
  }
});
build.onLoad({ filter: /.css$/ }, async (args: any) => {...})
build.onLoad({ filter: /.*/ }, async (args: any) => {...})
```

## A Better Way of Loading WASM

public 파일에 web assembly 코드를 보관하는 대신, unpkg에 호스팅된 코드를 사용할 수 있다.

```ts
const wasmURL = "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm";
const startService = async () => {
  ref.current = await esbuild.startService({
    worker: true,
    wasmURL: wasmURL,
  });
};
```
