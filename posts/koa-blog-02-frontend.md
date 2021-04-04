---
title: "Koa Blog 02 - Frontend"
date: "2021-04-02"
---

[리액트를 다루는 기술 (24장 ~ 27장) 저자 GITHUB](https://github.com/velopert/learning-react)

## Frontend - CRA

설정 파일

.prettierrc

```json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

jsconfig.json

```json
{
  "compilerOptions": { "target": "es6" }
}
```

라우터 적용

- 페이지를 만들고, 해당 페이지를 라우터에 연결 시킨다.
- 페이지 컴포넌트 (pages/): LoginPage, RegisterPage, WritePage, PostPage, PostListPage
- 엔트리 파일에 BrowserRouter로 감싸기

```
yarn add react-router-dom
```

pages/LoginPage.js

```js
const LoginPage = () => {
  return <div>Login</div>;
};
export default LoginPage;
```

index.js: 라우터를 사용하기 위해 `BrowserRouter` 컴포넌트로 가장 루트 컴포넌트를 감싼다.

```js
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getELementById("root")
);
```

app.js

- 페이지 컴포넌트를 'Route' 컴포넌트에 연결하고, path를 설정한다.
- `@:username`: `:username`을 파라미터로 읽고, @usernmae 형태로 경로가 설정된다. (Medium, 브런치에서 사용하는 형태)
- `path={['/@:username','/']}`: 여러 경로가 가능한 경우 배열로 지정할 수 있다.
- `exact`: 경로가 완전히 일치하는 경우만 라우트를 실행한다.
- `postId` 파라미터가 있는 경우 `PostPage` 없는 경우 `PostListPage`를 연결시킨다. (라우터는 위에서 아래로 순서대로 실행)

```js
import { Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Route component={PostListPage} path={["/@:username", "/"]} exact />;
      <Route component={PostPage} path="/@:username/:postId" />;
    </>
  );
};
```

스타일 설정

- CSS in JS: `styled-components`
- Color Variables (open color)
  - src/lib/styles/palette.js
  - 필요한 색상만 가져올 수 있고, import가 좀 더 제대로 작동하기 때문에 편안하다.

Button 컴포넌트 만들기

src/components/common/Button.js

```js
import styled from "styeld-components";
const StyledButton = styled.button``;
const Button = (props) => <StyledBytton {...props} />;
export default Button;
```

src/pages/PostListPage.js

```js
import Button from "../components/common/Button";
const PostListPage = () => (
  <div>
    <Button />
  </div>
);
export default PostListPage;
```

global css

```css
body {
  box-sizing: border-box;
  min-height: 100%;
}

:root {
  min-height: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: inherit;
}
```

리덕스 적용

- 리덕스 스토어를 생성하고 Provider 컴포넌트를 통해 프로젝트에 리덕스를 적용
- `yarn add redux react-redux redux-actions immer redux-devtools-extension`
- Ducks 패턴: 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일에 다 정의

src/modules/auth.js

- 리듀서 모듈
- action / action creator / reducer

```js
import { createAction, handleActions } from "redux-actions";
const SAMPLE_ACTION = "auth/ SAMPLE_ACTION";
export const sampleAction = createAction(SAMPLE);
const initialState = {};
const auth = handleActions(
  {
    [SAMPLE_ACTION]: (state, action) => state,
  },
  initialState
);
export default auth;
```

src/moduels/index.js

- 루트 리듀서
- 모든 리듀서를 하나로 묶어 내보냄

```js
import { combineReducers } from "redux";
import auth from "./auth";
const rootReducer = combinReducer({
  auth,
});
export default rootReducer;
```

src/index.js

- 엔트리 파일
- store 생성, rootReducer 연결, dev tools 연결

```js
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./modules";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
```

회원가입과 로그인 구현

구성

- components
  - common: Button...
  - auth: 회원 인증과 관련된 컴포넌트
  - write: 글쓰기에 관려된 컴포넌트
  - post: 포스트 읽기와 관련된 컴포넌트

src/components/auth/AuthForm

```js
const AuthForm = ({ type }) => {
  return (
    <div>
      <h3></h3>
      <form></form>
    </div>
  );
};
```

src/components/auth/AuthTemplate

```js
const AuthTemplate = ({ children }) => {
  return <div>{children}</div>;
};
```

src/pages/LoginPage.js

```js
const LoginPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="login" />
    </AuthTemplate>
  );
};
```

리덕스로 폼 상태 관리하기

modules/auth.js

```js
import { createAction, handleActions } from "redux-actions";
import product from "immer";

const CHANGE_FIELDS = "auth/CHANGE_FIELDS";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

export const changeFileds = createAction(
  CHANGE_FIELDS,
  ({ form, name, value }) => ({ form, name, value })
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

const initialState = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    username: "",
    password: "",
  },
};

const auth = handleActions(
  {
    [CHANGE_FIELDS]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
  },
  initialState
);

export default auth;
```

container components

- src/comtainers
- `useDispatch` 와 `useSelector` 함수를 사용하여 컴포넌트와 리덕스를 연결
- `const dispatch = useDispatch()`
- `const state = useSelector( state => state )`

src/container/LoginForm

- state를 가져와 presentational component에 props로 전달한다.

```js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initialForm } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({ form: auth.login }));
  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ form: "login", key: name, value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // todo
  };
  useEffect(() => {
    dispatch(initialForm("login"));
  }, [dispatch]);
  return <AuthForm form={form} onChange={onChange} onSubmit={onSubmit} />;
};
```

src/pages/LoginPage

```js
const LoginPage = () => (
  <AuthTemplate>
    <LoginForm />
  </AuthTemplate>
);
```

src/components/auth/AuthForm

```js
const AuthForm = ({ type, form, onChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          autoComplete="username"
          name="username"
          placeholder="username"
          value={form.username}
          onChange={onChange}
        />
        <input
          autoComplete="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={onChange}
        />
      </form>
    </div>
  );
};
```

API 연동하기

- axios
- redux-saga
- createRequestSaga

src/lib/api/client

- axios 인스턴스 생성하기
- API 클라이언트에 공통된 성절을 쉽게 넣을 수 있다.
  - baseURL: `client.defaults.baseURL=''`
  - headers: `client.defaults.headers.common['Authorization']=''`
  - intercepter: `axios.intercepter.response.use()`

```js
import axios from "axios";
const client = axios.create();
export default client;
```

프록시 설정

- CORS (Cross Origin Request)
  - 네크워크 요청을 할 때 주소가 다른 경우에 발생
  - 해당 문제를 수정하기 위해서는 서버 쪽 코드를 수정해주어야 한다.
- 웹팩 프록시
  - 개발 서버로 요청하는 API들을 프록시로 정해둔 서버로 그대로 전달해 주고 그 응답을 웹 애플리케이션에서 사용할 수 있도록 해준다.
  - 브라우저 <-> 개발 서버 <-(프록시)-> 백엔드서버
  - `client.get('/api/posts')` -> `http://localhost:4000/api/posts`

package.json

```json
{
  "proxy": "http://localhost:4000/"
}
```

api 함수 작성

src/lib/api/auth.js

```js
import client from "./client";
// login
export const login = ({ username, password }) =>
  client.post("/api/auth/login", { username, password });
```

더 쉬운 API 요청 상태 관리

- modules/loading: 비동기 API 요청 상태를 redux에 저장
- lib/createRequestSaga

module/loading.js

```js
import { createAction, handleActions } from "redux-actions";

const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType
);
export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, { payload: requestType }) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, { payload: requestType }) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;
```

modules/index.js

- 루트 리듀서에 loading 리듀서 등록

```js
const rootReducer = combineReducers({ auth, loading });
```

lib/createRequestSaga.js

- 비동기 API를 요청하고 결과에 따라 loading state 변경

```js
import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

// 각 요청 마다 3개의 액션 타입 선언
export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
```

modules/auth.js

- `createRequestActionTypes(type)`: 요청과 관련된 액션 타입들을 선언
- `createRequestSaga(type, request)`: 각 API를 위한 사가를 생성하고, 액션 생성 함수와 리듀서도 구현

```js
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestTypes(
  "auth/REGISTER"
);
export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password,
}));

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
}

const initialState = {
  register: {},
  login: {},
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default auth;
```

modules/index.js

- rootSaga

```js
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";

export function* rootSaga() {
  yield all([authSaga()]);
}
```

src/index.js

- 스토어에 redux-saga 미들웨어 적용

```js
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sacaMiddleware(rootSaga);
```

user reducer

- set temp user
- check: check user -> loading start -> response -> loadng finish

modules/user.js

```js
const TEMP_SET_USER = "user/TEMP_SET_USER";
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  "user/CHECK"
);

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
}

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({ ...state, user }),
    [CHECK_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
  },
  initialState
);
```

moduels/index.js

- 루트 리듀서에 user 리듀서와 사가 포함

```js
export default combineReducer({
  auth,
  loading,
  user,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}
```

container/auth/RegisterForm.js

- 회원가입 성공 후
- check를 호출해서 현재 사용자가 로그인 상태가 되었는지 확인
- withRouter로 컴포넌트를 감싸고, 로그인을 한 상태면 history 객체를 사용하여 홈 화면으로 이동

```js
import { useRouter } from "react-router-dom";

const RegisterFrom = ({ history }) => {
  const { user } = useSelector(({ auth, user }) => ({
    auth: auth,
    authError: auth.authError,
    user: user,
  }));

  const dispatch = useDispatch();

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      return;
    }

    if (auth) {
      dispatch(check());
    }
  }, [auth, check, dispatch]);

  // user 값이 설정 되었다면 홈으로 이동
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [history, user]);

  return <div>{/**/}</div>;
};

export default widthRouter(RegisterFrom);
```

로그인 구현

containers/auth/LoginForm.js

```js
const dispatch = useDispatch();

const { form, auth, authError, user } = useSelector(({ user, auth }) => ({
  form: auth.form,
  auth: auth.auth,
  authError: auth.authError,
  usr: user.user,
}));

const onSubmit = (e) => {
  e.preventDefault();
  const { username, password } = form;
  dispatch(login({ username, password }));
};

useEffect(() => {
  if (authError) {
    return;
  }
  if (auth) {
    console.log("로그인 성공");
    dispatch(check());
  }
}, [auth, authError, dispatch]);

useEffect(() => {
  if (user) {
    history.push("/");
  }
}, [user, history]);
```

회원 인증 에러 처리하기

components/auth/AuthForm.js

```js
const AuthForm = ({ error }) => {
  return <div>{error && <ErrorMessage>{error}</ErrorMessage>}</div>;
};
```

containers/auth/LoginForm.js

```js
const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const { auth, authError } = useSelector(({ auth }) => ({
    auth: auth.auth,
    authError: auth.authError,
  }));
  useEffect(() => {
    if (authError) {
      setError("Login Failed");
    }
  }, []);

  return <AuthForm error={error} />;
};
```

containers/auth/RegisterForm.js

- case 1: username, password, passswordConfirm 중 하나라고 비었을 때
- case 2: password와 passwordConfirm 값이 일치하지 않을 때
- case 3: username이 중복 될 때

```js
const onSubmit = (e) => {
  // case 1
  const { username, password, passwordConfirm } = form;
  if ([username, password, passwordConfirm].include("")) {
    setError("빈칸을 모두 입력 하세요");
    return;
  }
  // case 2
  if (password !== passwordConfirm) {
    setError("비밀번호가 일치 하지 않습니다.");
    dispatch(changeFiled({ form: "register", key: "password", value: "" }));
    dispatch(
      changeFiled({ form: "register", key: "passwordComfirm", value: "" })
    );
    return;
  }
};

// case 3
useEffect(() => {
  if (authError.response.status === 409) {
    setError("이미 존재하는 계정명입니다.");
    return;
  }
}, [authError]);
```

헤더 컴포넌트 생성 및 로그인 유지

components/common/Responsive.js

```js
const ResponsiveBlock = styled.div`
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Responsive = ({ children, ...rest }) => (
  <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
);
```

components/common/Header.js

```js
const HeaderBlock = styled.div``;
const Wrapper = styled(Responsive)``;
const Header = () => (
  <HeaderBlock>
    <Wrapper>
      <div>logo</div>
      <Button>login</Button>
    </Wrapper>
  </HeaderBlock>
);
```

pages/PostListPage.js

```js
const PostListPage = () => {
  return (
    <>
      <Header />
      <div>Hello</div>
    </>
  );
};
```

버튼 컴포넌트를 링크 처럼 사용 하기

- 1. `history.push(to)`: withRouter
- 2. `Link`
- `styled(Link)`: styled() 함수로 감싸서 만든 컴포넌트의 경의 임의의 props가 필터링 되지 않는다.

```js
const Button = ({ to, history, ...rest }) => {
  const onClick = (e) => {
    if (to) {
      history.push(to);
    }
    if (rest.onClick) {
      rest.onClick(e);
    }
  };
  return <StyledButton {...rest} onClick={onClick} />;
};

export default withRouter(Button);
```

```js
import { Link } from "react-router-dom";
import styled, { css } from "react-router-dom";

const buttonStyles = css``;

const StyledButton = styled.button`
  ${buttonStyles}
`;

const StyledLink = styled(Link)`
  ${buttonStyles}
`;

const Button = (props) =>
  props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
```

로그인 상태 보여주고 유지 하기

containers/common/HeaderContainer.js

```js
const HeaderContainer = () => {
  const user = useSelector(({ user }) => ({ user: user.user }));
  return <Header user={user} />;
};
```

components/common/Header.js

```js
const Header = ({ user }) => {
  return (
    <div>
      {user ? (
        <div>
          {user.username} <br /> <button>logout</button>
        </div>
      ) : (
        <button>login</button>
      )}
    </div>
  );
};
```

pages/PostListPage.js

```js
const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <div>Hello</div>
    </>
  );
};
```

로그인 상태 유지하기

- 브라우저에 내장되어 있는 localStorage 사용
- 로그인 / 회원 가입을 했을 때 `user` 정보를 `localStorage` 에 저장
- `useEffect`, `componentDidMount`: 한 번 랜더링된 이후에 실행 (깜빡임 현상이 일어 날 수 있다.)
- `index.js`: 사용자 정보를 불러오도록 처리하고 컴포넌트를 랜더링

containers/auth/LoginForm.js

```js
useEffect(() => {
  if (user) {
    history.push("/");
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.log("localStorage is not working");
    }
  }
}, [history, user]);
```

src/index.js

```js
import { tempSetUser, check } from "./modules/user";

function loadUser() {
  try {
    const user = localStorage.getItem("user");
    if (!user) {
      return; // 로그인 상태가 아니라면 아무것도 안함
    }
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log("localStorage is not working");
  }
}

sagaMiddleware.run(rootSaga);
loadUser(); // check 액션을 사가에서 처리하기 위해, sagaMiddleware 이후에 함수를 실행 한다.
```

로그인 검증 실패 시 정보 초기화

- checkFailureSaga
- CHECK_FAILURE 액션에 발생할 때 해당 함수가 호출되도록 설정한다.
- 이 함수에서는 localStorage 안에 있는 user 값을 초기화해준다.
- 함수 내부에 yield를 사용하지 않으므로 function\*를 사용하여 제너레이터 함수 형태로 만들어 주지 않아도 된다.

src/modules/user

```js
function checkFailureSaga() {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log("localStorage is not working");
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
}
```

로그아웃 기능 구현

lib/api/auth.js

```js
export const logout = () => client.post("/api/auth/logout");
```

modules/auth.js (reducer)

```js
const LOGOUT = "auth/LOGOUT";

export const logout = createAction(LOGOUT);

function* logoutSaga() {
  try {
    yield call(authAPI.logout); // logout API 호출
    localStorage.removeItem("user"); // localStoarge에서 user를 제거
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

export default handleActions(
  {
    [LOGOUT]: (state) => ({ ...state, user: null }),
  },
  initialState
);
```

containers/common/HeaderContainer.js

```js
import { logout } from "../modules/logout";

const dispatch = useDispatch();
const onLogout = () => dispatch(logout());
return <Header onLogout={onLogout} />;
```

components/common/Header.js

```js
<Button onClick={onLogout}>logout</Button>
```

글쓰기 기능 구현하기

에디터 UI 구현하기

`yarn add quill`

components/write/Editor.js

```js
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";

const EditBlock = styled(Responsive)``;
const TitleInput = styled.input``;
const QuillWrapper = styled.div``;

const Editor = () => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(qullElement.current, {
      theme: "bubble",
      placeholder: "",
      toobar: [],
    });
  }, []);
  return (
    <EditBlock>
      <TitleInput placeholder="제목을 입력하세요" />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditBlock>
  );
};
export default Editor;
```

pages/writePage.js

```js
const WritePage = () => (
  <Responsive>
    <Editor />
  </Responsive>
);
```

에디터 하단 컴포넌트 UI 구현하기

TagBox: 태그를 추가하거나 삭제

components/write/TagBox.js

- `React.memo(({tag})=><Tag>{tag}</Tag>)`
  - 불필요한 리렌더링을 방지 하기 위해 memo로 컴포넌트는 작성한다.
  - props 가 바뀐 경우에만 리렌더링을 한다.

```js
const TagBoxBlock = styled.div``;
const TagForm = styled.form``;
const Tag = styled.div``;
const TagListBlock = styled.div``;

const TagItem = React.memo(({ tag }) => <Tag>#{tag}</Tag>);
const TagList = React.memo(({ tags }) => (
  <TagListBlock>
    {tags.map((tag) => (
      <TagItem key={tag} tag={tag} />
    ))}
  </TagListBlock>
));

const TagBlock = () => {
  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm>
        <input placeholder="태그를 입력하세요" />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={[]} />
    </TagBoxBlock>
  );
};
```

pages/WritePage.js

```js
const WritePage = () => {
  return (
    <Responsive>
      <Editor />
    </Responsive>
  );
};
```

태그 추가, 삭제 하기

```js
const [input, setInput] = useState("");
const [localTags, setLocalTags] = useState([]);

const insertTag = useCallback(
  (tag) => {
    if (!tag) return;
    if (localTags.include(tag)) return;
    setLocalTags([...localTags, tag]);
  },
  [localTags]
);

const onRemove = useCallback((tag) => {
    setLocalTags(localTags.filter((t) => t !== tag));
  }),
  [localTags];

const onChange = useCallback((e) => {
  setInput(e.target.value);
}, []);

const onSubmit = useCallback((e) => {
    e.preventDefault();
    insertTag(input.trim());
    setInput("");
  }),
  [input, insertTag];
```

WriteActionButton

```js
const WriteActionButton = ({ onPublich, onCancel }) => {
  return (
    <div>
      <button onClick={onPublish}>포스트 등록</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};
```

리덕스로 글쓰기 상태 관리하기

modules/write.js

```js
import { createAction, handleActions } from "redux-actions";

const INITAILIZE = "write/INITAILIZE";
const CHANHE_FIELD = "write/CHANHE_FIELD";

export const initialize = createAction(INITAILIZE);
export const CHANHE_FIELD = createAction(CHANHE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
const initialState = { title: "", body: "", tags: [] };
const write = handleActions(
  {
    [INITAILIZE]: (state) => initialState,
    [CHANHE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
  },
  iniitalState
);

export default write;
```

moduels/index.js

```js
import write from "./write";

const rootReducer = combineReducers({ auth, loadinhg, user, write });
```

containers/write/EditorContainer.js

- quill 에디터에서는 onChange / value 로 값을 수정 할 수 없다. (quill의 text-change 이벤트로 등록)
- `const onChangeField = useCallback(payload => dispatch(changeField(payload)), [dispatch])`: useCallback 을 사용해야지만, useEffect에서 onChangeField를 사용했을 때 한번만 실행된다.
- 언마운트시 에디터 초기화 시키기: `useEffect( () => { return () => disaptch(initialize) }, [])`

```js
const EditorContainer = () => {
  const dispatch = useDispatch();

  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  const onChangeField = useCallback(
    (payload) => disaptch(changeField(payload)),
    [dispatch]
  );

  useEffect(() => {
    return () => dispatch(initialize());
  }, [disaptch]);

  return <Editor title={title} body={body} onChangeField={onChangeField} />;
};
```

pages/WritePage.js

```js
const WritePage = () => <EditorContainer>
```

components/write/Editor.js

```js
const Editor = ({ title, body, onChangeField }) => {
  const quillElement = useRef(null); // Quill을 적용할 DivElement
  const quillInstance = useRef(null); // Quill 인스턴스

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {});

    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "body", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const onChangeTitle = (e) => {
    onChangeField({ key: "title", value: e.target.value });
  };

  return (
    <div>
      <TitleInput onChange={onChangeTitle} value={title} />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </div>
  );
};
```

TagBoxContainer

containers/write/TagBoxContainer

```js
import { useSelector, useDispatch } from "react-redux";
import { changeField } from "../../modules/write";

const TagBoxContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.write.tags);

  const onChangeField = (nextTags) => {
    dispatch(
      changeField({
        key: "tags",
        value: nextTags,
      })
    );
  };

  return <TagBox tags={tags} onChangeField={onChangeField} />;
};
```

components/write/TagBox

- TagBox 컴포넌트 내부에서 상태가 바뀌면 리덕스 스토어에도 반영되고, 리덕스 스토어에 있는 값이 바뀌면 TagBox 컴포넌트 내부의 상태도 바뀜

```js
const TagBox = ({ tags, onChangeTags }) => {
  const [localTags, setLocalTags] = useState([]);

  const insertTags = useCallback(
    (tag) => {
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags]
  );

  const onRemove = useCallback(
    (tag) => {
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags]
  );

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return <div></div>;
};
```

글쓰기 API 연동하기

lib/api/posts.js

```js
import client from "./client";
export const writePost = ({ title, body, tags }) =>
  client.post("/api/post", {
    title,
    body,
    tags,
  });
```

modules/write.js

- action / actionCreator / saga

```js
const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestSageTypes("write/WRITE_POST");

export const writePost = createAction(WRITE_POST, ({ title, post, tags }) => ({
  title,
  post,
  tags,
}));

const writePostSaga = createRequestSaga(WRITE_POST, postsApi.writePost);
export function* writeSaga() {
  yield takelatest(WRITE_POST, writePostSaga);
}

const initialState = {
  title: "",
  body: "",
  tags: [],
  post: null,
  postError: null,
};

const write = handleActions(
  {
    [WRITE_POST]: (state) => ({ ...state, post: null, postError: null }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({ ...state, post }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState
);
```

modules/index.js

```js
export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga()]);
}
```

container/write/WriteActionButtonsContainer.js

- router 가 아닌 컴포넌트에서 history 객체를 사용할 때는 withRouter을 사용한다.

```js
const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.portError,
  }));

  const onCancel = () => {
    history.goback();
  };

  const onPublish = () => {
    dispatch(writePost({ title, body, tags }));
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.go(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return <WriteActionButtons onCancel={onCancel} onPublish={onPublish} />;
};

export default withRouter(WriteActionButtonsContainer);
```

pages/WritePage.js

```js
const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};
```

## 26 포스트 조회 기능 구현하기

### 26.1 포스트 읽기 페이지 구현하기

PostViewer UI

- 보여줄 요소: 포스트 제목, 작성자 계정명, 작성된 시간, 태그, 제목, 내용

components/post/postViewer.js

```js
const PostViewer = () => (
  <PostViewerBlock>
    <PostHead>
      <h1>제목</h1>
      <SubInfo>
        <span>
          <b>tester</b>
        </span>
        <span>{new Date().toLocaleDateString()}</span>
      </SubInfo>
      <Tags>
        <div className="tag">#태그1</div>
        <div className="tag">#태그2</div>
        <div className="tag">#태그3</div>
      </Tags>
    </PostHead>
    <PostContent
      dangerouslySetInnerHTML={{ __html: "<p>HTML <b>내용</b>입니다.</p>" }}
    />
  </PostViewerBlock>
);
```

pages/PostPage.js

```js
export const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostViewer />
    </>
  );
};
```

API 연동하기

lib/api/posts

```js
export const readPost = (id) => client.get(`/api/posts/${id}`);
```

modules/post.js

```js
const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createReqeustActionTypes("post/READ_POST");
const UNLOAD_POST = "post/UNLOAD_POST";

export const readPost = createAction(READ_POST, ({ id }) => ({ id }));
export const unloadPost = createAction(UNLOAD_POST);

const readPostSaga = createRequestSaga(READ_POST, postsApi.readPost);
export function* postSaga() {
  yield takeLatest(readPostSaga);
}

const initialState = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({ ...state, post }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({ ...state, error }),
    [UNLOAD_POST]: () => initailState,
  },
  initialState
);

export default post;
```

modules/index.js

```js
const rootReducer = combineReducers({ post });

export function* rootSaga() {
  yield all([postSaga()]);
}
```

containers/post/PostViewerContainer.js

```js
const PostViewerContainer = () => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading["post/READ_POST"],
  }));

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [disaptch, postId]);

  return <PostViewer post={post} loading={loading} error={error} />;
};
export default withRouter(PostViewerContainer);
```

pages/PostPage.js

```js
export const PostPage = () => (
  <>
    <PostViewerContainer />
  </>
);
```

components/post/PostViewer

```js
const PostViewer = ({ post, loading, error }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewBlock>존재하지 않는 포스트입니다. </PostViewBlock>;
    }
    return <PostViewBlock>오류 발생</PostViewBlock>;
  }

  if (loading || !post) {
    return null;
  }

  const { title, body, tags, publishedDate, user } = post;

  return (
    <div>
      <h2>{title}</h2>
      <p>{user.username}</p>
      <p>{new Date(publishedDate).toLocaleDateString()}</p>
      <div>
        {tags.map((tag) => (
          <div key={tag}>{tag}</div>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};
```

### 26.2 포스트 목록 페이지 구현하기

PostList UI

- 여러 곳에서 재사용 할 수 있는 컴포넌트 불리: `<SubInfo/>`, `<Tags/>`
- 사용자 이름이나 태그를 눌렀을 때 관련된 포스트 리스트 출력
  - username: `/@${username}`
  - tag: `/?tag=${tag}`

components/posts/PostList.js

```js
const PostItem = () => (
  <div>
    <SubInfo username="username" published={new Date()} />
    <Tags tags={["tag1", "tag2", "tag3"]} />
    <p>포스트 내용의 일부분..</p>
  </div>
);

const PostList = () => {
  return (
    <PostListBlock>
      <h2>제목</h2>
      <div>
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    </PostListBlock>
  );
};
```

components/common/SubInfo

```js
const SubInfo = ({ username, publishedDate, hasMarginTop }) => (
  <SubInfoBlock hasMarginTop={SubInfo}>
    <Link to={`/@${username}`}>{username}</Link>
    {new Date(publishedDate).toLocaleDateString()}
  </SubInfoBlock>
);
```

components/common/Tags

```js
const Tags = ({ tags }) => (
  <TagBlock>
    {tags.map((tag) => (
      <Link className="tag" to={`/?tag=${tag}`} key={tag}>
        {tag}
      </Link>
    ))}
  </TagBlock>
);
```

포스트 목록 조회 API 연동하기

qs 라이브러리

- 쿼리 값을 더 편리하게 생성하고 JSON으로 변환할 수 있다.

```
yarn add qs
```

lib/api/posts.js

```js
export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({ page, username, tag });
  return client.get(`/api/posts${queryString}`);
};
```

modules/posts.js

```js
const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes("posts/LIST_POSTS");

export const listPosts = createAction(
  LIST_POSTS,
  ({ tag, username, page }) => ({ tag, username, page })
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsApi.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POST, listPostsSaga);
}

const initialState = {
  posts: null,
  error: null,
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts }) => ({ ...state, posts }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({ ...state, error }),
  },
  initialState
);

export default posts;
```

modules/index.js

```js
const rootReducer = combineReducers({
  posts,
});
export function* rootSaga() {
  yield all([postsSaga()]);
}
```

containers/posts/PostListContainer.js

```js
const PostListContainer = ({ location }) => {
  const disaptch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading["posts/LIST_POSTS"],
      user: user.user,
    })
  );

  useEffect(() => {
    const { tag, page, username } = qs.parse(location.search, {
      ignoreQueryPreFix: true,
    });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};
```

pages/PostListPage.js

```js
const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostListContainer />
    </>
  );
};
```

components/posts/PostList.js

```js
const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publisehdDate={new Date(publishedDate)}
      />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            새글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};
```

HTML 필터링 하기

- 백엔드: 200자 제한하는 과정을 통해, html이 일부만 전달 될 수 있다.
- sanitize-html 라이브러리를 사용하여, html을 제거하고 특정 html만 제한 할 수 있다.
- 글쓰기 API를 사용해서 입력된 스크립트를 제한 할 수 있다.

```
yarn add sanitize-html
```

backend/src/posts/posts.ctrl.js

```js
import sanitizeHtml from "sanitize-html";
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

const sanitizeOption = {
  allowedTags: [
    "h1",
    "h2",
    "b",
    "i",
    "u",
    "s",
    "p",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src"],
    li: ["class"],
  },
  allowedSchemes: ["data", "http"],
};

export const list = async (ctx) => {
  ctx.body = posts.map((post) => ({
    ...post,
    body: removeHtmlAndShorten(post.body),
  }));
};

export const write = async (ctx) => {
  const post = new Post({
    title,
    body: sanitizeOption(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });
};

export const update = async (ctx) => {
  const nextData = { ...ctx.request.body };
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 4004;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

페이지네이션 구현하기

- 백엔드: list API를 만들 때 마지막 페이지 정보를 header를 통해 전달
- 클라이언트: 요청을 관리하는 `createRequestSaga` 에서 payload로 `response.data`, meta를 통해 `response` 객체 자체를 받아올수 있다.

lib/createRequestSaga.js

```js
try{
  const response = yield call(request, action.payload);
  yield put({
    type: SUCCESS,
    payload: response.data,
    meta: responsse
  })
}catch(e){
  yield put({
    type: FAILURE,
    payload: e,
    error: true
  })
}
```

modules/posts

- lastPage: `Math.ceil( 문서 갯수 / 10 )`

```js
const initialState = { posts: null, error: null, lastPage: 1 };

const posts = handleActions(
  {
    [LIST_POST_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts,
      lastPage: parseInt(response.header["last-page"], 10), // 문자열을 숫자로 변환
    }),
  },
  initialState
);
```

components/posts/Pagination.js

```js
const PaginationBlock = styled.div``;

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, username, tag }) => {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefiend
            : buildLink({ username, tag, page: page + 1 })
        }
      >
        다음
      </Button>
    </PaginationBlock>
  );
};
```

containers/posts/PaginationContainer

```js
const PaginationContainer = ({ location, match }) => {
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading["posts/LIST_POSTS"],
  }));

  if (!posts || loading) return null;
  const { username } = match.params;

  const { tag, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(lastPage, 10)}
      lastPage={lastPage}
    />
  );
};

export default widthRouter(PaginationContainer);
```

pages/PostListPage.ks

```js
const PostListPage = () => {
  retrun(
    <>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
    </>
  );
};
```

## 27. 수정.삭제 기능 구현 및 마무리

### 포스트 수정

PostActionButtons

- 포스트 작성자에게만 보이는 수정 / 삭제 버튼
- props를 JSX 형태로 받아 와서 렌더링할 수 있다.
- props로 전달할 경우, 중간 컴포넌트에서 전달되는 이벤트 핸들러를 중복해서 작성하지 않아도 된다.

PostActionButtons (components/post/PostActionButtons.jsx)

```js
const PostActionButtons = () => (
  <div>
    <button>수정</button>
    <button>삭제</button>
  </div>
);
```

PostViewContainer (containers/post/PoserViewContainer.jsx)

```js
import PostView from "../containers/post/PostActionButtons";
import PostActionButtons from "../containers/post/PostActionButtons";
const PostViewContainer = () => (
  <PostView actionButtons={<PostActionButtons />} />
);
```

PostViewer (components/post/PostViewer.jsx)

```js
const PostViewer = ({ actionButtons }) => (
  <div>
    <div>PostHeader</div>
    {actionButtons}
  </div>
);
```

module/write.js

- `SET_ORIGINAL_POST`: 현재 보고 있는 포스트 정보를 write 모듈에서 관리하는 상태

```js
const SET_ORIGINAL_POST = "write/SET_ORIGINAL_POST";

export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);

const initialState = {
  title: "",
  body: "",
  tags: [],
  post: null,
  postError: null,
};

const write = handleActions(
  {
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      originalPostId: post._id,
    }),
  },
  initialState
);
```

containers/post/PostViewerContainer

```js
const PostViewerContainer = ({ match, history }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading["post/READ_POST"],
      user: user.user,
    })
  );

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push("/write");
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      actionButtons={ownPost && <PostActionButtons onEdit={onEdit} />}
    />
  );
};
export default withRouter(PostViewerContainer);
```

components/post/PostActionButtons.js

```js
const PostActionButtons = ({ onEdit }) => {
  return <ActionButton onClick={onEdit}>수정</ActionButton>;
};
```

components/write/Editor.js

- 내용의 초깃값 설정

```js
const Editor = ({ title, body, changeField }) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  // useEffect(() => {
  //   quillInstance.current.root.innerHTML = body;
  // }, []); /* eslint-disalbe-line */
};
```

lib/api/posts.js

- originalPostId 값이 주어졌다면 포스트 작성 API 대신 수정 API 사용

```js
export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, { title, body, tags });
```

modules/write.js

- UPDATE_POST
- updatePostSaga

```js
const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes("write/UPDATE_POST");

export const updatePost = createAction(
  UPDATE_POST,
  ({ id, title, body, tags }) => ({ id, title, body, tags })
);

const updatePostSaga = createRequestSaga(UPDATE_POST, postsApi.updatePost);

export function* writeSaga() {
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const write = handleActions(
  {
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({ ...state, post }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState
);
```

container/write/WriteActionButtonsContainer.js

```js
const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    })
  );
  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ title, body, tags, id: originalPostId }));
      return;
    }
    disapatch(writePost({ title, body, tags }));
  };

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!originalPostId}
    />
  );
};
```

components/write/WriteActionButtons.js

```js
const WriteActionButtons = ({ onCancel, onPublish, isEdit }) => {
  retrun(
    <>
      <button onClick={onPublish}>{isEdit ? "수정" : "등록"}</button>
      <button onClick={onCancel}>취소</button>
    </>
  );
};
```

### 27.2 포스트 삭제

- 삭제 하기 전에 모달을 통해 한번 더 확인

componens/common/AskModal.js

```js
const AskModal = ({
  visible,
  title,
  description,
  confrimText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;
  return (
    <Fullscreen>
      <AskModalBlock>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={onConfirm}>{confrimText}</button>
        </div>
      </AskModalBlock>
    </Fullscreen>
  );
};
```

components/post/AskRemoveModal.js

```js
const AskRemoveModal = ({ visible, onConfirm, onCancel }) => (
  <AskModal
    visible={visible}
    title="포스트 삭제"
    description="포스트를 정말 삭제하시겠습니까?"
    confrimText="삭제"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);
```

components/post/PostActionButtons.js

```js
const PostActionButtons = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    // open modal
    setModal(true);
  };
  const onCancel = () => {
    // close modal
    setModal(false);
  };
  const onConfirm = () => {
    // close  modal & remove post
    setModal(false);
    onRemove();
  };
  return (
    <>
      <div>
        <button onClick={onEdit}>수정</button>
        <button onClick={onRemoveClick}>삭제</button>
      </div>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};
```

lib/api/posts.js

```js
export const removePost = (id) => client.delete(`/api/posts/${id}`);
```

containers/post/PostViewerContainer.js

```js
const PostViewerContainer = ({ match, history }) => {
  const onRemove = async (id) => {
    try {
      await removePost(id);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return <PostViewer actionButtons={<PostActionButtons onEdit={onEdit} />} />;
};
```

### react-helmet-async / meta 태그 설정하기

```
yarn add react-helmet-async
```

1. HelmetProvider로 APP 컴포넌트를 감싼다.
2. Page 컴포넌트에서 해당 페이지의 meta 데이터를 설정한다.
3. 가장 내부에 있는 Helmet이 우선권을 가진다.

src/index.js

```js
import { HelmetProvider } from "react-helmet-async";

ReactDOM.render(
  <Provider store={stroe}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  dovument.getElementById("root")
);
```

app.js

```js
import { Helmet } from "react-helmet-async";

const App = () => (
  <>
    <Helmet>
      <title>REACTERS</title>
    </Helmet>
    <Route component={PostListPage} path={["/@:username", "/"]} exact />
  </>
);
```

pages/WritePage.js

```js
import { Helmet } from "react-helmet-async";

const WritePage = () => (
  <>
    <Helmet>
      <title>글 작성하기 - REACTERS</title>
    </Helmet>
    <Editor />
  </>
);
```

components/post/PostViewer.js

```js
import { Helmet } from "react-helmet-async";

const PostViewer = ({ post, error, loading, actionButtons }) => (
  <>
    <Helmet>
      <title>{title} - REACTERS</title>
    </Helmet>
    <Post />
  </>
);
```

### 프로젝트 빌드

프로젝트 빌드하기

```
yarn build
```

koa-static으로 정직 파일 제공하기

```
yarn add koa-static
```

backend/src/main.js

```js
import serve from "koa-static";
import path from "path";
import send from "koa-send";

const buildDirectory = path.resolve(__dirname, "../../client/build");
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  if (ctx.status === 404 && ctx.path.indexOf("/api") !== 0) {
    await send(ctx, "index.html", { root: buildDirectory });
  }
});
```
