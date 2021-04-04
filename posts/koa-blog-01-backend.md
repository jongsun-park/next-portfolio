---
title: "Koa Blog 01 - Backend"
date: "2021-03-27"
---

[리액트를 다루는 기술 (21장 ~ 23장) 저자 GITHUB](https://github.com/velopert/learning-react)

## Backend - Koa

백엔드 프로그래밍: 어떤 종류의 데이터를 몇 개씩 보여 줄지, 그리고 또 어떻게 보여 줄지 등에 관한 로직을 만드는 것

Express

- 미들웨어, 라우터, 템플릿, 파일 호스팅 등과 같은 다양한 기능이 자체적으로 내장되어 있다.

Koa

- 미들웨어 기능만 갖추고 있으며 나머지는 다른 라이브러리를 적용하여 - 사용한다.
- Express에 비해 훨씬 가볍다
- async/await 지원
- 설치 koa & eslint & prettier

```
yarn add koa
yarn add --dev eslint // --dev: 개발용 의존 모듈로 설치
yarn run eslint --init
yarn add eslint-config-prettier
```

.eslintrc.json

```json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "prettier"],
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off"
  }
}
```

서버 실행 하기 (src/index.js)

```js
const Koa = require("koa");

const app = new Koa();

app.use((ctx) => {
  ctx.body = "hello world";
});

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
```

```
// node src
// node src/index.js
```

미들웨어

- koa 애플리케이션은 미들웨어의 배열로 구성되어 있다.
- (ctx, next) => { ... }
- ctx (context): 응답(request)과 요청(response)에 대한 정보를 가지고 있다.
- next: (option) 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수이다.
- query 로 전달된 authentication 값이 1인 경우 다음 미들웨어를 실행하고, 그렇지 않은 경우 미들웨어를 처리하지 않는다

```js
app.use((ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !== "1") {
    ctx.status = 401; // Unauthorized
    return;
  }
  next();
});
```

next 함수는 Promise를 반환한다.

- next 함수가 반환하는 promise는 다음에 처리해야 할 미들웨어가 끝나야 완료된다.
- `next().then(()=>{ console.log('END')})`

koa는 aync/await 를 정식으로 지원한다.

```js
app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log("END");
});

app.use((ctx, next) => {
  console.log(2);
});
```

nodemon 설치

```
yarn add --dev nodemon
```

package.json

- start: 재시작이 필요 없을 때
- start:dev: src 디렉터리를 주시하고 있다가 해당 디렉터리 내부의 어떤 파일이 변경되면 이를 감지하여 src/index.js 파일을 재실행

```json
{
  "scripts": {
    "start": "node src",
    "start:dev": "nodemon --watch src/ src/index.js"
  }
}
```

koa-router 설치

```
yarn add koa-router
```

routes 를 설정하고, koa 서버에 연결 시키기

- `const router = require('koa-router')()`
- `router.get(path, middleware)`
- `router.routes()`: Returns router middleware which dispatches a route matching the request
- `router.allowedMethods()`: Returns separate middleware for responding to OPTIONS requests with an Allow header containing the allowed methods, as well as responding with 405 Method Not Allowed and 501 Not Implemented as appropriate.

```js
const Koa = require("Koa");
const Router = require("koa-router");

const app = Koa();
const router = Router();

// 라우터 설정
router.get("/", (ctx) => {
  ctx.body = "home";
});
router.get("/about", (ctx) => {
  ctx.body = "About";
});

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());
```

라우트 파라미터와 쿼리

파라미터

- 처리할 작업의 카테고리를 받아 오거나, 고유 ID 혹은 특정 데이터를 조회할 때
- /about/:name
- /anout/:name? (파라미터가 옵션인 경우)
- ctx.params

쿼리

- 옵션에 관련된 정보를 받아 올 때 (필터, 정렬)
- /posts/?id=10
- ctx.query (쿼리 문자열을 자동으로 객체 형태로 파싱)
- ctx.queryString

```js
router.get("/about/:name?", (ctx) => {
  const { name } = ctx.params;
  ctx.body = name ? `About ${name}` : "About";
});

router.get("/posts", (ctx) => {
  const { id } = ctx.query;
  ctx.body = id ? `POST ${id}` : `POST NOT FOUND`;
});

// http://localhost:4000/about/react
// http://localhost:4000/posts
// http://localhost:4000/posts?id=10
```

REST API

- 웹 브라우저에서 직접 데이터베이스에 접근하여 변경한 다면 보안 문제가 생긴다. 그래서 REST API를 만들어서 사용
- 클라이언트 <-> 서버 (REST API) <-> 데이터베이스

HTTP 메서드

- GET(조회): GET /posts, GET /posts/:id/comments
- POST(등록): GET /posts/:id
- DELETE(삭제): DELETE /posts/:id, DELETE /posts/:id/comments/:commentId
- PUT(수정): POST /posts/:id/comments
- PATCH(일부 수정): PATCH /posts/:id

라우트 모듈화

- 라우터를 여러 파일에 분리시켜서 작성하고, 이를 불러와 적용할 수 있다.

src/api/index.js

```js
const Router = require("koa-router");
const api = Router();
api.get("/test", (ctx) => {
  ctx.body = "test";
});
module.exports = api;
src / index.js;

const api = require("./api"); // api 라우터 가져오기

app.use("/api", api.routes()); // api 경로에 api 라우터 미들웨어 적용
app.use(router.routes()).use(router.allowedMethods()); // app 인스턴스에 라우터 적용

// http://localhost:4000/api/test
```

posts 라우트

src/api/posts

```js
const posts = require("koa-router");
const printInfo = (ctx) => {
  ctx.body = { path: ctx.path };
};
posts.get("/", printInfo);
module.exports = posts;
src / api / index.js;

const api = require("koa-router")();
const posts = require("./posts");
api.use("/posts", posts.routes());
module.exports = api;
src / index.js;

const app = require("koa")();
const api = require("./api");
app.use("/api", api.routes());
```

Postman 설치 및 실행

- GET 요청은 브라우저에서 주소를 입력하여 실행이 가능하지만,
  나머지 HTTP 요청 (POST, DELETE, PUT, PATCH) 자바스크립트로 호출해야한다.

컨트롤러 파일 작성

- 라우터의 처리 함수을 다른 파일로 분리해서 관리한다. (컨트롤러 파일)

koa-bodyparser

- POST/PUT/PATCH 같은 메서드의 Request Body에 JSON 형식으로 데이터를 넣어 주면 이를 파싱하여 서버에서 사용 할 수 있도록 한다.
- 라우터를 적용하기 전에 사용해야 한다.

```
yarn add koa-bodyparser
```

```js
const bodyParser = require("koa-bodyParser");

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
src / api / posts / posts.ctrl.js;

// POST /api/posts { title, body }
exports.write = (ctx) => {
  const id = (postId += 1);
  const post = { id, ...ctx.requiest.body };
  posts.push(post);
  ctx.body = post;
};
src / api / posts / index.js;

const posts = require("koa-router")();
const postsCtrl = require("./posts.ctrl.js");
posts.post("/", postsCtrl.write);
module.exports = posts;
```

## Database - MonggoDB

관계형 데이터베이스

- RDBMS, MySQL, OracleDB, PostgreSQL
- 고정적 스키마: 데이터의 형식(스키마)를 선언 후 변경 할 수 없다.
- 확장성: 저장해야 할 데이터가 늘어나면 서버의 기능을 업그레이드 해야한다.

MongoDB

- 문서 지향적 NoSQL
- 유동적 스키마
- 확장성: 데이터 양에 따라 분산 처리

데이터의 구조가 자주 변경된다면 NoSql 가 유리하고, 까다로운 조건으로 데이터를 필터링해야 하거나, ACID 특성을 지켜야 한다면 RDBMS가 유리하다.

ACID

- 데이터베이스의 트랜잭션이 안정하게 처리되는 것을 보장하기 위한 성질
- Atomicity (원자성)
- Consistency (일관성)
- Isolation (고립성)
- Durability (지속성)

문서(Document)

- RDBMS: 레코드
- 한 개 이상의 key-value 쌍으로 구성
- MongoDB: BSON 형태로 저장 (바이너리 형태의 JSON)
- \_id: 고유값 (머신 아이디, 프로세스 아이디, 순차 번호)

컬렉션

- RDBMS: 테이블
- 여러 문서가 들어 있는 곳
- 컬렉션 안의 데이터가 다른 스키마를 가지더라고 넣을 수 있다.

```
[
  {
    _id: ObjectId(""),
  },
  {
    _id: ObjectId(""),
    username: "",
  },
];
```

MonggoDB

- 서버: 여러 개의 데이터 베이스
- 데이터베이스: 여러 개의 컬렉션
- 컬렉션: 여러 개의 문서
- 문서

스키마 디자인

- RDBMS: 테이블을 만들어 필요에 따하 JOIN해서 사용
- NoSQL: 문서 내부에 또 다른 문서를 작성 (서브다큐먼트), (최대 16MB)

mongoose

- Node.js 환경에서 사용하는 MongoDB 기반 ODM(Object Data Modeling)
- 데이터베이스 문서들을 자바스크립트 객체처럼 사용

```
yarn add mongoose dotenv
```

dotenv

- 환경변수를 파일에 넣고 사용할 수 있게 하는 개발 도구
- 공유하기 민감한 정보나, 환경별로 달라질 수 있는 값은 환경 변수 파일로 분리해서 작성하는 것이 좋다.

.env

```
PORT=4000
MONGO_URI=mongodb://localhost:270177/blog
```

src/index.js

```js
require("dotenv").config();
const PORT = process.env.PORT;
const port = PORT || 4000;
app.listen(port, () => {
  console.log("Listening to port %d", port);
});
```

mongoose 를 사용해서 mongodb 에 접속하기

```js
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => console.log(e));
```

Nodejs 환경에서 es module 사용하기

- Nodejs: require
- ES module: import/export

1. 파일 단위로 ES 모듈 적용

- 파일 확장자를 .mjs 로 변경
- 확장자를 포함해서 경로를 명시
- `import {now} from './time.mjs`

2. 프로젝트 단위로 ES 모듈 적용

- package.json `{"type": "module"}`
- type: commonjs | module
- type을 'module'로 설정 한 경우 require 구문을 사용 할 수 없다.

3. esm 라이브러리

- esm 라이브러리를 사용하는 경우 type은 commonjs로 설정한다.
- 기존 index.js를 main.js로 이름을 바꾸고
- moain.js를 작성해서 es module로 작성된 코드를 esm 미들웨어를 사용해서 변환 한다.

src/index.js

```js
require = require("esm")(module);
module.exports = require("./main.js");
```

package.json

```json
{
  "scripts": {
    "start": "node -r src src",
    "start:dev": "nodemon --watch src/ -r esm src/index.js"
  }
}
```

ESlint: import/export 구문을 오류로 간주 하지 않도록 설정

```json
{
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  }
}
```

모듈 인텔리전스를 위한 설정 (jsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es2015"
  },
  "include": ["src/**/*"]
}
```

데이터베이스의 스키마와 모델

스키마(schema)

- 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체
- `{ title: String, active: Boolean, data: Date }`

모델(document)

- 스키마를 사용하여 만드는 인스턴스 (`mongoose.model(...)`)
- 데이터베이스에서 실제 작업을 처리할 수 있는 함수를 지니고 있다.
- `mongoose.model(스키마 이름, 스키마 객체, 컬렉션 이름?)`
  - 스키마 이름 ("POST"): 다른 스키마에서 현재 스키마를 참조해야하는 상황에서 사용
  - 컬렉션 이름:

src/models/post.js

```js
import mongoose from "mongoose";

const { Schema } = mongoose;

// 스키마 생성
const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜는 기본값으로 지정
  },
});

// 모델 생성
const Post = mongoose.model("Post", PostSchema);
// mongoose.model(스키마 이름, 스키마 객체, 컬렉션 이름?)
// 컬렉션 이름: (컨벤션) 구분자를 사용하지 않고 복수 형태로 사용 하는 것

export default Post;
```

데이터 저장하기

src/api/posts.ctrl.js/wite

- `cosnt post = new Post({})`: post 인스턴스 생성
- `post.save()`: 데이터베이스에 저장
- async/await: 데이터베이스에 저장 요청을 완료할 때까지 await를 사용하여 대기
- try/catch: 대기 하는 동안 발생할 에러에 대한 처리

```js
import Post from "../models/post";
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({ title, body, tags });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

데이터 조회
src/api/posts.ctrl.js/list

- `Post.find()`: 쿼리를 작성, Post 모델의 모든 문서 가져오기
- `exec()`: 서버에 쿼리를 요청

```js
const Post from "../models/post"
export const list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

특정 포스트 조회
src/api/posts.ctrl.js/read

- `Post.findById(id).exec()`
- 404: id가 존재하지 않는 경우 / Not Found
- 500: id가 잘못된 형태인 경우 (Objectd) / Internal Server Error

```js
import Post from "../models/post";
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

데이터 삭제
src/api/posts.ctrl.js/remove

- `remove()`: 특정 조건을 만족하는 데이터를 모두 제거
- `findByIdAndRemove()`: id를 찾아서 제거
- `findOneAndRemove()`: 특정 조건을 만족하는 데이터 하나를 찾아서 제거

```js
import Post from "../models/post";
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id);
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

데이터 수정

- `findByIdAndUpdate(id, 업데이트내용, 업데이트 옵션)`
- `{new: true}`: 업데이트된 데이터를 반환
- `{new: false}`: 업데이트되기 전의 데이터를 반환

```js
import Post from "../models/post.js";
export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

ObjectId 검증

- 잘못된 형식의 id 를 입력한 경우, 서버 내부에서 처지하지 못해 500 오류를 발생시킨다.
- 잘못된 id를 전달했다면 클라이언트에서 요청을 잘못 보낸거니 400 Bad Request 오류를 띄워주도록 한다.

src/api/posts/posts.ctrl.js

```js
import mongoose from "mongoose";
const { ObjectId } = mongoose.Type;

export const isObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  next();
};
```

src/api/posts/index.js

```js
import Router from "koa-router";
import * as postsCtrl from "./post.ctrl";

const posts = Router(); // /api/post
// post.get("/:id", ppostsCtrl.isObjectId, ostsCtrl.read);

const post = Router(); // /api/post/:id
post.get("/", postsCtrl.read);
post.delete("/", postsCtrl.remove);
post.patch("/", postsCtrl.update);

posts.use("/:id", postsCtrl.isObjectId, post.routes());
```

Request Body 검증

- 문서를 추가하거나, 수정하는 경우 `request.body` 를 통해서 `title, content, tags` 값을 모두 전달받아야 한다.
- 클라이언트가 값을 누락하는 경우 빈 값으로 데이터를 수정 하는 것이 아니라 에러를 발생 시켜야 한다.
- 각 값을 if 문으로 비교하는 방법도 있지만, `joi` 라이브러리를 사용할 수 있다.

```js
yarn add joi
```

- `const schema = Joi.object().keys({})`: 객체가 다음 필드를 가지고 있음을 검증
  - `title: Joi.string().required()`: title은 문자열로 구성되어 있는 필수 값
  - `Joi.array().items(Joi.string()).required()`: 문자열로 구성된 배열이며, 필수값
- `const result = schema.validate(ctx.request.body)`: 검증을 하고나서 실패인 경우 에러 처리

src/api/posts/posts.ctrl.js

```js
import Joi from "joi";

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.straing().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  //
};
```

페이지네이션 구현

- 한 페이지에 보이는 포스트 수 제한 하기: 10 - 20
- 리스트에서 각 포스트가 보여지는 내용 크기 제한 하기: 처음 200

가짜 데이터 만들기

createFakeData.js

```js
import Post from "./models/post";
export default function createFakeData() {
  const posts = [...new Array(40).keys()].map((i) => ({
    title: `Post ${i}`,
    body: "lorem ipsum",
    tags: ["Fake", "Data"],
  }));
  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}
```

main.js

```js
import mongoose from 'mongoose'
import createFakeData from "./createFakeData'

mongoose
  .connect(MONGO_URI, {})
  .then(()=>{
      console.log('');
      createFakeData();
    })
  .catch(e => {console.err(e)})

```

포스트 역순으로 불러오기

- 최근에 작성한 문서를 먼저 불러오기
- `sort({_id: -1})`

```js
const posts = await Post.find().sort({ _id: -1 }).exec();
```

보이는 개수 제한:

```js
const posts = await Post.find().sort({ _id: -1 }).limit(10).exec();
```

페이지 기능 구현

- localhost:5000/api/posts?page=2
- 11번째 부터 20번째 포스트를 보여준다.
- `parseInt(ctx.query.page || '1', 10)`: query는 문자열로 반환 되기 때문에, 10진수 정수로 바꿔줘야한다.

```js
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || "1", 10);

  if (page < 1) {
    ctx.state = 400;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({ _id: -1 }) // sort order
      .limit(10) // 10 items per page
      .skip((page - 1) * 10) // skip
      .exec(); // send query
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

마지막 페이지 번호를 커스텀 헤더로 전달 할 수 있다.

```js
try {
  const postCount = await Post.countDocuments().exec();
  ctx.set("Last-Page", Math.ceil(postCount / 10));
} catch (e) {}
```

내용 길이 제한

- body의 길이가 200자 일 때 문자열을 자르는 기능
- find()로 조회한 데이터는 mongoose의 문서 인스턴스의 형태이므로 바로 수정할 수 없다.
- JSON 형태로 변환한 뒤 필요한 변형을 한다.
- `lean()`: 데이터를 처음부터 JSON 형태로 조회할 수 있다.

```js
const posts = Post.find().exec();
ctx.body = posts
  .map((post) => post.toJSON())
  .map((post) => ({
    ...post,
    body: post.body.length < 200 ? post.body : post.body.`${slice(0, 200)}...`,
  }));
```

```js
const posts = Post.find().lean().exec();
```

<hr/>

## JWT - Authentication

JWT

- JSON Web Token
- 데이터가 JSON으로 이루어져 있는 토큰
- 두 객체가 서로 안전하게 정보를 주고받을 수 있도록 웹표준으로 정의된 기술

세션 기반 인증 시스템

- 서버가 사용자가 로그인 중임을 기억
- 서버에서 세션을 생성 하고 사용자에게 전달 세션 id를 전달
- 사용자는 요청시 세션 id를 전달하고, 서버에서 해당 id가 유효한지 확인

토큰 기반 인증 시스템

- 토큰: 로그인 이후 서버가 만들어 주는 문자열
- 사용자의 로그인 정보 + 서버에서 발급되었음을 증명하는 서명
- 무결성 보장: 정보가 변경되거나 위조되지 않음
- 토큰을 서버에서 저장할 필요 없이, 사용자로 부터 받은 토큰이 유효한지 검사만 하면 된다.

User 스키마/모델 만들기

- 사용자의 비밀번호는 데이터베이스에 문자열 그대로 저장하지 않고,
- `bcrypt` 라이브러리를 사용해서 해쉬화된 문자열을 데이터베이스에 저장한다. (단방향 해싱 함수)

```js
yarn add bcrypt
```

src/models/user.js

```js
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

const User = mongoose.model("User", UserSchema);

export default User;
```

모델 / 인스턴스 메서드

- 문서 인스턴스에서 사용할 수 있는 함수
- `user.setPassword`: 비밀번호를 파라미터로 받아서 계정의 hashedPassword 값을 설정
- `user.checkPassword`: 파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지 검증

```js
import bcrypt from "bcrypt";

UserSchema.methods.setPassword = async function (password) {
  const hash = await brypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await brypt.compare(password, this.hashedPassword);
  return result;
};
```

모델 / 스태틱 메서드

- 모델에서 바로 사용할 수 있는 함수
- `User.findByUserName`

```js
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};
```

API 라우터 구조

src/api/auth/auth.ctrl.js

```js
export const register = async (ctx) => {
  //
};
```

src/api/auth/index.js

```js
import Router from "koa-router";
const auth = Router();
auth.post("/register", authCtrl.register);
//
export default auth;
```

src/api/index.js

```js
import Router from "koa-router";
import auth from "./auth";
const api = Router();
api.use("/auth", auth.routes());
export default api;
```

src/api/auth/auth.ctrl.js/register

1. request body 검증
2. 중복 아이디 확인
3. 비밀번호 암호화하기
4. 데이터베이스에 username, hashedPassword 저장하고, 모델 객체에서는 hashedPassword 제거하기

```js
import Joi from "joi";
import User from "../../models/user.js";

export const register = async (ctx) => {
  // schema validation
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(10).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Forbidden Request
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    // check exist username
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password);
    await user.save();

    // 응답할 데이터에서 hashedPassword 필드 제거
    // const data = user.toJSON();
    // delete data.hashedPassword;
    // ctx.body = data;

    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

`user.serialize()`

- 해쉬된 비밀번호가 응답에 전달되지 않도록 hasehdPassword 제거

src/models/user.js

```js
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete this.hashedPassword;
  return data;
};
```

src/api/auth.ctrl.js/login

```js
export const login = async (ctx) => {
  const { username, passwrod } = ctx.request.body;
  if (!username || !password) {
    /**/
  }
  try {
    const exist = await User.findByUsername(username);
    if (!exist) {
      /**/
    }
    const user = new User({ username });
    const valid = await user.checkPassword(password);
    if (!valid) {
      /**/
    }
    ctx.body = user.serialize();
  } catch (e) {
    ctx.status = 400;
    return;
  }
};
```

토큰 생성하기

src/models/user.js

- user 모델의 인스턴스 메서드로 작성한다.
- `jwt.sign(토큰 안에 넣고 싶은 데이터, JWT 암호, 유효기간)`

```js
import jwt from "jsonwebtoken";
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this.id, username: this.username },
    process.env.JWT_SECRET,
    { expirein: "7d" }
  );
  return token;
};
```

브라우저에 토큰 저장하기

1. localStorage, sessionStorage

   XSS 공격에 취약 (Cross Site Scripting)

   - 악성 스크립트에 의해 토큰을 탈취 당할 수 있다.

2. 쿠키

   XSS 공격에 안전

   - httpOnly 속성을 활성화 하면 자바스크립트를 통해 쿠키를 조회할 수 없다. (XSS 공격으로 부터 안전)

   CSRF 공격에 취약 (Cross Site Request Forgery)

   - 사용자가 서버에 요청을 할 때 무조건 토큰이 전달되는 점을 이용해서 사용자가 모르게 API 요청을 할 수 있다.
   - CSRF 토큰 사용 및 Referer 검증 방식으로 막을 수 있다.

로그인, 등록을 할 때 토큰을 생성해서 응답 헤더의 쿠키에 담는다.

src/api/suth/auth.ctrl.js/register & login

```js
ctx.body = user.serialize();

const token = user.generateToken();
ctx.cookies.set("access_token", token, {
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
  httpOnly: true,
});
```

토큰 검증 하기

미들웨어로 작성하여, 서버가 실행 될 때 토큰 유무와 유효한지에 검증한다.

src/lib/jwtMiddleware.js

```js
import jwt from "jsonwebtoken";
const jwtMiddleware = (ctx, next) => {
  const token = ctx.cookies.get("access_token");
  // 토큰이 없는 경우
  if (!token) {
    return next();
  }
  try {
    // 토큰을 해석하고 다른 미들웨어에서 사용하기 위해 context의 state에 담아 전달
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };

    return next();
  } catch (e) {
    // 해석에 실패한 경우
    return next();
  }
};
export default jwtMiddleware;
```

src/main.js

- jwtMiddleware을 적용하는 작업은 app에 router 미들웨어를 적용하기 전에 이루어져야 한다.

```js
import jwtMiddleware from "./lib/jwtMiddleware";

app.use(bodyParser);
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowMethods());
```

src/api/auth/auth.ctrl.js/check

```js
export const check = async (ctx) => {
  const { user } = ctx.user;
  if (!user) {
    ctx.status = 401; // unauthorized
    return;
  }
  ctx.body = user;
};
```

토큰 재발행 하기

- 토큰의 남은 기간이 3.5일 이하 라면 토큰을 재발행

src/lib/jwtMiddleware.js

```js
const token = ctx.cookies.get("access_token");
if (!token) return next();
try {
  const now = Math.ceil(Date.now() / 1000);
  if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
    const user = await User.findById(decoded._id);
    const token = user.generateToken();
    ctx.cookies.set("access_token", token, {
      expireIn: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  }
  return next();
} catch (e) {
  return next();
}
```

로그아웃

- 쿠키 삭제

src/api/auth/user.ctrl.js

```js
export const logout = async (ctx) => {
  ctx.cookies.set("access_token");
  ctx.status = 204; // No Content
};
```

posts API에 회원 인증 시스템 도입하기

- 포스트는 로그인 해야만 작성할 수 있고,
- 삭제와 수정은 작성자만 할 수 있도록 구현

Post 스키마 수정하기

- Post 스키마 안에 사용자의 id와 username을 전부 넣어 준다.

src/models/post.js

```js
const PostSchema = new Schema({
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});
```

로그인했을 때만 API를 사용할 수 있게 하기

src/lib/checkLoggedIn.js

```js
const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  next();
};
export default checkLoggedIn;
```

src/api/posts/index.js

```js
import checkLoggedIn from "../../lib/checkLoggedIn";

posts.post("/", checkLoggedIn, postsCtrl.write);

post.delete("/", checkLoggedIn, postsCtrl.remove);
post.patch("/", checkLoggedIn, postsCtrl.update);
```

포스트 작성 시 사용자 정보 넣기

src/api/posts/posts.ctrl.js/write

```js
const post = new Post({
  title,
  body,
  tags,
  user: ctx.state.user,
});
```

포스트 수정 및 삭제 시 권한 확인하기

- id 로 포스트를 찾는 작업을 먼저 미들웨어로 만들어 준다.

src/api/posts/posts.ctrl.js/getPostById

```js
export const getPostById = async (ctx, next) => {
  const id = ctx.params;
  // id 형태가 잘못된 경우
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    // post 가 존재하지 않는 경우
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

src/api/posts/index.js

```js
posts.use("/", postsCtrl.getPostById, post.routes());
```

src/api/posts/posts.ctrl.js/read

- id 로 포스트를 직접 조회하는 대신, state에 담긴 post를 body에 넘긴다.

```js
export const read = (ctx) => {
  ctx.body = ctx.state.post;
};
```

`checkOwnPost` 사용자가 작성한 포스트인지 확인하는 미들웨어

src/api/posts/posts.ctrl.js/checkOwnPost

```js
export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (user._id.toString() !== post.user._id.toString()) {
    ctx.status = 403; // Conflict
    return;
  }
  return next();
};
```

src/api/posts/index.js

```js
posts.delete("/", checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
posts.patch("/", checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
```

username/tags로 포스트 필터링 하기

src/api/posts/posts.ctrl.js/list

```js
// GET /api/posts?username=&tag=&page=
const { username, tag } = ctx.query;

// username, tag 가 유효하면 객체안에 넣고, 그렇지 않으면 넣지 않음
const query = {
  ...(username ? { "user.username": username } : {}),
  ...(tag ? { tags: tag } : {}),
};

try {
  const posts = await Post.find(query).exec();
  const postCount = await Post.countDocuments(query).exec();
}
```
