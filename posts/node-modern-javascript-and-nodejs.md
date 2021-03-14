---
title: "Academind - Modern JavaScript & NodeJS"
date: "2021-03-14"
---

# Modern JavaScript & NodeJS

## ES Modules

- Import/Export Syntax for modern JavaScript in the Browser
- `export const doSomething = () => {};`
- `import {doSomething} from 'my-file'`

enable

- 1. .js -> .mjs
- 2. package.json -> "type": "module"
  - `import express from "express"; `
  - `import {doSomething} from "./doSomething.js";` // 로컬 파일 인 경우 확장자도 함께 작성해줘어야 한다.
  - 모든 파일에서 import 구문을 사용 하거나, require("") 구문을 사용해야 한다. (한 방법으로만 사용)
- 3. global variables

  - import 구문을 사용할 경우 전역 변수 (ex. `__dirname`, filename) 을 사용 할 수 없다.
  - solutions

    ```js
    import path, { dirname } from "path";
    import { fileURLToPath } from "url";

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    export const resHandler = (req, res, next) => {
      res.sendFile(path.join(__dirname, "my-page.html"));
    };
    ```

## Promises in Core APIs

callback based
-> promise

```js
// const fs = require('fs').promises;
import fs from "fs/promises";

export const resHandler = (req, res, next) => {
  fs.readFile("index.html", "utf8")
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};
```
