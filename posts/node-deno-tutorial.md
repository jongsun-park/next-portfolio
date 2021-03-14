---
title: "Academind - An Introduction to Deno"
date: "2021-03-14"
---

# An Introduction to Deno
- 데노 / 디노
- An Alternative to Node
- JavaScript based

## What is Deno?

- Deno is a JavaScript Runtime based on Chrome's v8 JavaScript Engine
- Allows you to run JavaScript outside of the browser.
- Deno supports
  - JavaScript & TypeScript
    - 노드에서는 타입스크립트로 작성한 후 컴파일 한 후 사용 해야 한다.
    - 디노 자체에 컴파일이 내장되어 있어 코드를 바로 사용 가능 하다.
  - URL imports and modern JavaScript features (e.g. Promises)
- Deno is "secure by default" and requires explicit execution permissions

## Why Deno?

Deno

- TypeScript support, modern JS features, URL imports, script permissions
- Pretty new, small ecosystem, not used in production by majoy companies yet, smaller base of maintainers not really used in production yet

Node

- Only JavaScript, modern JS features are missing, custom module system, no script permissions
- Established, highly active ecosystem, used by thousands of (big) companies, huge base of maintainers, production-proven

## Deno Setup

[deno](https://deno.land/)

## Writing First Deno Code

```ts
// app.ts
let message: string;

message = "Hi there!";

console.log(message);
```

```
deno run app.ts
```

- 자동으로 컴파일 되어 코드가 실행된다
- 다시 한번 실행하는 경우, 기존 코드가 바뀌지 않았기 때문에 컴파일을 다시 하지 않고, 캐시된 코드가 다시 실행된다.

## The Deno Runtime (Namespace) API

Node

- Core Module

Deno

- [Runtime Api](https://doc.deno.land/builtin/stable)
- 브라우저에서 사용 할 수 있는 함수 / 변수 (ex. fetch, addEventListener, alert...)
- Deno 객체에서 가져올 수 있는 함수 / 변수 (ex. Deno.close, Deno.fsync, Deno.copy ...)

## Using the Runtime API & Deno Permissions

```js
const text = "This is a test - and it should be stored in a file!";

const encoder = new TextEncoder();
const data = encoder.encode(test);

Deno.writeFile("message.txt", data).then(() => {
  console.log("Wrote to file!");
});
```

Default Secures

- 파일을 읽거나, 쓸 때는 권한을 부여해야 한다

```
// Error: Uncaught PermissionDenied
// deno run app.ts
deno run --allow-write=message.txt app.ts
```

## Repeating the Eaxample with Node

```js
const fs = require("fs").promise;

const text = "This is a test - and it should be stored in a file!";

fs.writeFile("message.txt", text).then(() => {
  console.log("Wrote file!");
});
```

## How Deno Features Are Organized

Deno Namespace APIs (built-in utilities)

- Stable & Maintained by Core Team
- Built-into Deno, no installation or imports required
- Only a small set of low-level core functionalities

Standard Library (maintained by Deno team)

- Unstable & Maintained by Core Team
- Needs to be imported into scripts to be used
- Build up on core, low-level functionalities to provide easier-to-use functionalities

3rd Party Libraries (maintained by community)

- Stability differs & Maintained by community teams
- Needs to be imported into scripts to be used
- Builds up on core, low-level functionalities to provide easier-to-use functionalities

## Standard Libraries

```js
// app.ts
// Deno
import { serve } from "https://deno.land/std/http/server.ts";

const server = serve({ port: 3000 });

for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}
```

```
deno run --allow-run app.ts
```

1. url 로 라이브러리를 가져올 수 있다.
2. 처음으로 컴파일 할 때, url을 통해 코드를 다운로드해서 캐시에 저장한다.
3. for await: deno는 node와 마찬가지로 최상위에 비동기 형식을 지원한다. (async await)
4. `for(const req of server){}`
   - req: element
   - server: iterable objects

## Nodejs / creating server

```js
// Node
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listent(3000);
```

## Oak Framework

express (koa) 와 비슷한 라이브러리

```js
// app.ts
import { Application } from "https://deno.land/x/oak/mod/ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
```

## Module Urls

로컬 파일 가져오기: `import something from './my_file.ts';`

외부 파일 가져오기: `import { serve } from 'https://deno.land/std/http/server.ts';`

Automation: 외부 파일을 가져온 다음 캐시에 설치를 하면 자동 완성 기능이 더 편해진다.

re-fetch: `deno run --reload my_file.ts`

lock certain file: `import { serve } from 'https://deno.land/std@0.51.0/http/server.ts';`

## Deno REST Api

```ts
import { Application } from "https://deno.land/x/oak/mod.ts";

import todosRoutes from "./routes/todos.ts";

const app = new Application();

app.use(async (ctx, next) => {
  console.log("Middleware!");
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 3000 });
```

```ts
// routs/todos.ts
import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", (ctx) => {
  ctx.response.body = { todos: todos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body();
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.value.text,
  };

  todos.push(newTodo);

  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body();
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tid;
  });
  todos[todoIndex] = { id: todos[todoIndex].id, text: data.value.text };
  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", (ctx) => {
  const tid = ctx.params.todoId;
  todos = todos.filter((todo) => todo.id !== tid);
  ctx.response.body = { message: "Deleted todo" };
});

export default router;
```

## Deno, CRUD & Databses (MongoDB)
