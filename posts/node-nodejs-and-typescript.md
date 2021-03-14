---
title: "Academind - NodeJS and TypeScript"
date: "2021-03-14"
---

# NodeJS & TypeScript

## TypesScript: Why & why?

TypeScript is a Superset to JavaScript (SuperSet: 부분집합)

```js
function add(num1, num2) {
  return num1 + num2;
}
console.log(add("2", "3"));

add(1, 5); // 6 number
add("1", "5"); // 15 string
```

타입스크립트는 브라우저에서 실행 되지 않는다.
런타임에서 자바스크립트로 컴파일 되며, 개발을 쉽게 하기 위해 작성 된다.

기능

- Types: 원하지 않는 입력 값을 제어하기 위해 사용
- Next-gen JavaScript Featrues (compiled down for older Browsers)
- Non-JavaScript Features like Interfaces or Generics
- Meta-Programming Features like Decorators
- Rich Configuration Options
- Modern Tooling that helps even in non-TypeScript Projects

## Setup

```
// powercell + admin
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

```js
npm install -g typescript
npx tsc app.ts
```

app.ts 가 app.js 로 컴파일된다. (같은 경로에 생성),
compile 된 app.js 파일을 index.html에 연결하여 사용한다.

## Assigning Types

Core Types

1. number: 1, 5.3, -10 / All numbers, intergers, floats and negative numbers
2. string: 'Hi', "Hi", \`Hi\` / All text values
3. boolean: true, false / no "truthy" or "falsy" values
4. object: `{age: 30}` / type of object
5. array: `[1, 2, 3]` / type can be flexible or strict

```ts
function add(a: number, b: number) {
  return a + b;
}

console.log(add(1, 5));
console.log(add("1", "5"));
// error
// Argument of type 'string' is not assignable to parameter of type 'number'.
```

## Type Inference & Type Casting

```html
<input type="number" name="num1" id="num1" />
<input type="number" name="num2" id="num2" />
<button>Add</button>
```

```ts
const num1Element = document.getElementById("num1") as HTMLInputElement;
const num2Element = document.getElementById("num2") as HTMLInputElement;
const buttonElement = document.querySelector("button");

function add(num1: number, num2: number) {
  return num1 + num2;
}

buttonElement.addEventListener("click", () => {
  const num1 = num1Element.value;
  const num2 = num2Element.value;
  const result = add(+num1, +num2);
  console.log(result);
});
```

`as HTMLInputElement`

- value 속성을 가져올 수 있도록 HTMLElement를 HTMLInputElement로 명시
- inference: 추론

`add(+num1, +num2)`

- 인자로 전달 받은 문자열을 숫자형으로 형변환
- TypeCasting: 형변환

## Configuring TypeScript

`npx tsc --init`

- tsconfig.json 파일 생성하기
- options
  ```js
    { "strict": true, "noImplicitAny": true, "strictNullChecks": true, }
  ```
- null 인 변수에 이벤트 리스너를 연결 할 수 없다
  ```js
  const buttonElement = document.querySelector('button')!;
  // 암죽적인 null 값을 에러로 간주 한다.
  // ! : | null, 해당 값은 null 이 될 수 있음을 명시
  ```
- 암묵적 any type
  ```js
  num1: any; // 명시적으로 모든 타입 허용
  num1: number; // 구체적인 타입 명시
  num1; // error, 암묵적인 모든 타입 허용
  ```

`npx tsc`: 해당 폴더에 있는 설정 파일을 기반으로 모든 파일 변환

`npx tsc app.ts`: 해당 경로의 파일을 app.js로 컴파일

## Union Types

하나 이상의 타입을 가질 수 있는 경우

- `num1: number | string` // num1은 숫자나 문자가 될 수 있다.
- `if(typeof num1 === 'number' && typeof num2 === 'number' ){...}`
  - num1 이 숫자이고, num2 가 숫자인 경우 ... 블록 실행

```ts
function add(num1: number | string, num2: number | string) {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2; // 모두 숫자인 경우
  } else if (typeof num1 === "string" && typeof num2 === "string") {
    return num1 + " " + num2; // 모두 문자열인 경우
  }
  return +num1 + +num2; // 숫자 이거나 문자열인 경우, 숫자로 취급해서 연산
}
```

## Object & Array Types

- 객체와 배열의 타입을 정의 할 수 있다
- object: {value: number, timestamp: Date} // 객체의 형태를 정의
- array: number[] | string[]; // 하나의 타입으로만 구성된 배열

```ts
const numResults: number[] = [];
const textResults: string[] = [];

function printResult(resultObj: { val: number; timestamp: Date }) {
  console.log(resultObj.val);
}

buttonElement.addEventListener("click", () => {
  //
  numResults.push(result as number);
  textResults.push(stringResult as string);
  printResult({ val: result as number, timestamp: new Date() });
});
```

## Type Aliases & Interfaces

중복 되는 타입은 타입 별칭을 만들어서 한번에 관리 할 수 있다.

- `type`: 단순한 구조, 원시 타입을 저장 할 수 있다. (number | string)
- `interface`: 객체, 클래스 형식의 타입을 저장 할 수 있다.

```ts
type NumOrString = number | string;

interface ResultObj {
  val: number;
  timestamp: Date;
}

function printResult(resultObj: ResultObj) {
  console.log(resultObj.val);
}

function add(num1: NumOrString, num2: NumOrString) {
  //
}
```

## Generics

- Generics Types: 리턴 하고자 하는 값의 자료형을 명시 해준다

- 어떤 클래스나 함수에서 사용할 타입을 그 함수나 클래스를 사용할 때 결정하는 프로그래밍 기법
- JS: 모든 타입에 열려 있기 때문에 코드를 실행 하기 전에는 함수와 클래스가 모든 타입에 대응한다.

- 정적 프로그래밍 언어 - 다양한 타입에 사용 할 수 있도록
- 타입 스크립트 - 특정 타입에서 사용 할 수 있도록
- 함수/클래스를 선언 할 때 수용할 타입을 지정하도록 만드는 것

- `number[]`
- `Arrary<number>`
- `Promise<string>`

```js
// tsconfig { "target": "es6" }
const myPromise =
  new Promise() <
  string >
  ((resolve, reject) => {
    setTimeout(() => {
      resolve("It worked!");
    }, 1000);
  });

myPromise.then((result) => {
  console.log(result.split("w"));
});
```

## Node & TypeScript Setup

```npm
tsc --int
npm init
npm install --save express body-parser
```

## Getting Strated

--save-dev

@types/node

- 노드스크립트 안에서 타입스크립트를 사용할 수 있도록 해주는 라이브러리
- 노드가 어떻게 타입 스크립트를 자바스크립트를 번역 해주는 역할

@types/express

- 타입스크립트 안에서 express 라이브러리와 관련된 자동 완성 및 보조 기능을 해주는 역할

```json
// tsconfig.json
{
  "target": "es6",
  "module": "commonjs",
  "moduleResolution": "node"
}
```

```ts
// app.ts
import express from "express";

const app = express();

app.listen(3000);
```

```js
// app.js (npx tsc)
"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.listen(3000);
```

## TypeScript Express.js Code

## Type Casting

부모 객체 (body, params) 의 하부 속성은 타입 검증을 할 수 없다.
부모 객체의 타입을 상단에 선언 하고, 타입 형변환을 사용해서 하부 타입을 지정 할 수 있다.

```ts
type RequestedBody = { text: string };
type RequestedParams = { todoId: string };

const body = req.body as RequestedBody;
const params = req.params as RequestedParams;
```

## Structure

```json
// tsconfig
{
  "rootDir": "./src", // 개발자가 작성한 코드가 저장된 곳
  "outDir": "./disg" // 컴파일된 js 파일이 저장되는 곳
}
```

```
/dist
//models
//router
//controllers
//app.js

/src
//models
//router
//controllers
//app.ts

/package.json
/tsconfig.json
```

## finial files

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6", // 최신 문법 적용
    "module": "commonjs",
    "moduleResolution": "node", // import 구문 + types/node
    "outDir": "./dist", // 컴파일 된 코드의 위치 app.js
    "rootDir": "./src", // 컴파일 될 코드의 위치 app.ts
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

src/app.ts

```ts
import bodyParser from "body-parser";
import express from "express";
import todosRoutes from "./routes/todo";

const app = express();
app.use(bodyParser.json());

app.use("/", todosRoutes);

app.listen(3000);
```

src/models/todo.ts

```ts
export interface Todo {
  id: string;
  text: string;
}
```

src/routes/todo.ts

```ts
import { Router } from "express";
import { Todo } from "../models/todo";

const router = Router();

// let todos: Array<Todo> = [];
let todos: Todo<> = [];
type RequestedBody = { text: string };
type RequestedParams = { todoId: string };

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestedBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(200).json({ mesasge: "Added Todo", todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const body = req.body as RequestedBody;
  const params = req.params as RequestedParams;
  const tid = params.todoId;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = {
      id: todos[todoIndex].id,
      text: body.text,
    };
    res.status(200).json({ message: "Updated todo", todos: todos });
  }
  res.status(404).json({ message: "Could not find todo for this id." });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestedParams;
  todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
  res.status(200).json({ message: "Deleted todo", todos: todos });
});

export default router;
```

package.json / script

```
"start": "node dist/app.js"
```

## Module Resource

[more complex Node TypeScript project/ project setup](https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter)
