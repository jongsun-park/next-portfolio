---
title: "리액트를 다루는 기술 - Understand Redux"
date: "2021-03-14"
---

React / Redux / State management

## 16장 리덕스 라이브러리 이해하기

### 용어

액션

- 상태가 변할 때 발생하는 객체

액션 생성 함수

- 액션 객체를 만들어 주는 함수

리듀서

- 변화를 일으키는 함수

스토어

- 하나의 어플리케이션에는 하나의 스토어만 가진다
- 스토어 안에는 전역 상태와 리듀서, 내장 모듈을 가지고 있다.

디스패치

- 액션을 발생 시키는 것
- `dispatch(action)`
- 디스패치 되면 스토어에서 리듀서 함수를 실행시켜서 새로운 함수를 만든다.

구독

- 리스너를 전달하면, 리스너가 액션이 디스패치 될어 상태가 업데이트 될 때 마다 호출한다.

```js
// action creator
function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}

// subscribe
const listener = () => {
  console.log("상태가 업데이트됨");
};
const unsubscribe = store.subscribe(listener);
```

### 바닐라 자바스크립트 + 리덕스

```js
// action
// 액션 이름은 변수에 넣어 저장하여 실수 방지
const TOOGLE_SWITCH = "TOOCLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// action creator
// 액션 객체 생성 함수, 액션 이름과 상태 변화에 필요한 추가 정보 전달
const toggleSwitch = () => ({ type: TOOGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// initial state
const initialState = {
  toggle: false,
  counter: 0,
};

// reduecer
// 초기 상태 값과 액션을 인자로 받아
// 액션이름에 따라 상태 변경
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOOGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.differece,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}
```

스토어 만들기

```js
import { createStore } from "redux";

const store = createStore(reducer);
```

랜더링

```js
const state = store.getState();

const render = () => {
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  counter.innderText = state.counter;
};

render();
```

구독

```js
// 상태가 변경 될 때 마다 렌더 함수 실행
// react-redux 라이브러리가 subscribe 함수 역할을 한다.
store.subscribe(render);
```

액션 발생시키기

```js
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
```

1. 이벤트 발생
2. 디스패치
3. 액션 생성 함수
4. 리듀서
5. 상태 업데이트
6. 구독, 리랜더링

리덕스의 세가지 규칙

1. 단일 스토어
2. 읽기 전용: 상태를 업데이트 할 때는 기존 객체는 건드리지 않고 새로운 객체를 생성해 주어야 한다. 리듀서는 성능을 위해 깊은 비교가 아니라 얕은 비교를 한다. 실제 값을 비교하는 것이 아니라 참조값을 비교하여 판단 한다.
3. 순수 함수

순수 함수 조건

- 리듀서는 이전 상태와 액션 객체를 파라미터로 받는다.
- 파라미터 외의 값에 의존해서는 안된다.
- 이전 상태는 절대로 건들이지 않고, 새로운 상태 객체를 반들어 반환한다.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환해야 한다.

## 17장 리덕스를 사용한 상태 관리

리액트에서 리덕스를 사용해야 하는 이유

1. 상태 관리 로직을 분리 할 수 있다.
2. 여러 컴포넌트와 동일한 상태를 공유 할 수 있다.
3. 실제 업데이트되는 컴포넌트만 리랜더링 되어 성능을 최적화 될 수 있다.

바닐라 + 리덕스

- store.dispatch(): 액션을 전달
- store.subscribe(): 상태에 따라 리랜더링

리액트 + 리덕스

- Provider: 컴포넌트
- connect: 유틸 함수

리덕스 코드 작성 방법

- 종류 별로 분리:
  - actions > counter.js, todos.js
  - constants > ActionTypes.js
  - reducers > counter.js, todos.js
- 기능 별로 분리: (ducks)
  - modules > counter.js, todos.js
  - 모듈: 액션 타입, 액션 생성 함수, 리듀서를 작성한 코드

```js
// counter module

// 액션 타입 정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성 함수 & 내보내기
export const increase = (num) => ({ type: INCREASE });
export const decrease = (num) => ({ type: DECREASE });

// 초기 상태 + 리듀서
const initialState = { number: 0 };

const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
};

export defualt counter;
```

```js
// todos module

// action constant
const CHANGE_INPUT = "todos/CHANGE_INPUT";
const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

// action creator
// action type + 상태를 변화하는데 필요한 데이터를 전달
const changeInput = (input) => ({ type: CHANGE_INPUT, input });
const insert = (text) => ({
  type: INSERT,
  todo: { id: id++, text, done: false },
});
const toggle = () => ({ type: TOGGLE, id });
const romove = () => ({ type: REMOVE, id });

// initial state + reducer
const initialState = {
  input: "",
  todos: [
    { id: 1, text: "리덕스 기초 배우기", done: true },
    { id: 2, text: "리액트와 리덕스 사용하기", done: false },
  ],
};

function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
}
```

스토어에는 하나의 리듀서만 사용해야 한다.
counter 리듀서와 todos 리듀서를 하나로 합쳐 준다.

```js
// modules/index.js
import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
```

스토어 만들기, 루트 리듀서를 인자로 넘겨 준다.
react-redux 에서 제공하는 Provider 컴포넌트에 스토어를 넘겨준후,
App 을 감싼다.

```js
// src/index.js
import ReactDom from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";

const store = createStore(rootReducer);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

Redux Devtools

```js
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());
```

connect

- container 컴포넌트에 props 로 state와 action creater 전달 하기

```js
// CounterContainer
import Counter from "./components";
import { increase, decrease } from "../modules/counter";

const CounterContainer = ({ number, increase, decrease }) => (
  <Counter number={number} onIncrease={increase} onDecrease={decrease} />
);

// 반환하는 객체의 내부 값(state, action creator)를 컴포넌트의 props로 전달
// mapStateToProps -> state
// mapDispatchToProps -> dispatch
const mapStateToProps = (state) => ({
  number: state.counter.number,
  //   store / module / properties
});
const mapDispatchToProps = (dispatch) => ({
  increase: () => dispatch(increase()),
  decrease: () => dispatch(decrease()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
```

connect 함수에 익명 함수 형태로 선언

```js
export default connect(
  (state) => ({ number: state.counter.number }),
  (dispatch) => ({
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease()),
  })
)(CounterContainer);
```

액션 생성 함수의 갯수가 많다면 redux에서 제공하는 bindActionCreators 함수를 사용 할 수 있다.

```js
import { bindActionCreators } from "redux";
export default connect(
  (state) => ({ number: state.counter.number }),
  (dispatch) => bindActionCreators({ increase, decrease }, dispatch)
)(CounterContainer);
```

두 번째 함수를 객체로 넣어주면 connect 함수 내부에서 내부적으로 bindActionCreators 작업을 해준다.

```js
export default connect((state) => ({ number: state.counter.number }), {
  increase,
  decrease,
})(CounterContainer);
```

TodosContainer 컴포넌트

```js
import { connect } from "react-redux";
import { changeInput, insert, toggle, remove } from "../modules/todos";
import Todos from "../components/Todos";

const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
}) => (
  <Todos
    input={input}
    todos={todos}
    onChangeInput={changeInput}
    onInsert={insert}
    onToggle={toggle}
    onRemove={remove}
  />
);

export default connect(
  ({ todos }) => ({ input: todos.input, todos: todos.todos }),
  { changeInput, insert, toggle, remove }
)(TodosContainer);
```

redux-actions

- 리덕스 더 편하게 사용하기
- `creatAction(action constant)`: 액션 생성 함수
- `handleActions({[action]:({state, action})=>({state}}), initialState)`: 각 액션에 대한 업데이트 함수, 초기 상태

```js
// modules/counter

import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initalState = { number: 0 };

const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
);

export default counter;
```

payload

- 액션 생성 함수에서 전달 되는 인자를 payload에 담겨서 리듀서에 전달된다.
- 값을 가공해야하는 경우 `createAction(액션변수, (payload)=>{payload})`에 두번째 인자로 함수를 넣어 준다.
- 전달된 payload 는 `handleActions({},state)` 에 전달된 콜백 함수의 action 의 payload 값으로 사용 가능 하다.
- ```js
  handActions(
    { [액션변수]: (state, action) => ({ ...state, key: action.payload }) },
    초기상태
  );
  ```

```js
// modules/todos

import { createAction, handleActions } from "redux-actions";

// constants
const CHANGE_INPUT = "todos/CAHNGE_INPUT";
const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

// action creators
export const changeInput = creacteAction(CHANGE_INPUT, (input) => input);

let id = 3;
export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));

export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);

// reducer

const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({ ...state, input: action.payload }),
    [INSERT]: (state, action) => ({
      ...state,
      todos: state.todos.concat(action.payload),
    }),
    [TOGGLE]: (state, action) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      ),
    }),
    [REMOVE]: (state, action) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.payload),
    }),
  },
  initialState
);

export default todos;
```

immer

- 객체의 구조가 복잡해지거나 객체로 이루어진 배열을 다룰 경우,
- immer 을 사용하면 훨씬 편리하게 상태를 관리할 수 있다.

```js
import produce from "immer";

const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, (draft) => {
        draft.input = input;
      }),
    // ({ ...state, input: action.payload }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, (draft) => {
        draft.todos.push(todo);
      }),
    // ({
    //   ...state,
    //   todos: state.todos.concat(action.payload),
    // }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    // ({
    //   ...state,
    //   todos: state.todos.map((todo) =>
    //     todo.id === action.payload ? { ...todo, done: !todo.done } : todo
    //   ),
    // }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id === id);
        draft.todos.splice(index, 1);
      }),
    // ({
    //   ...state,
    //   todos: state.todos.filter((todo) => todo.id !== action.payload),
    // }),
  },
  initialState
);

export default todos;
```

Hooks (from react-redux)

- useSelector: connect 함수를 사용하지 않고도 리덕스의 상태 조회
- useDispatch: 컴포넌트 내부에서 스토어 내장 함수 사용

```js
// containers/CounterContainer
import { useSelector, useDispatch } from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease } from "../modules/counter";

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  return (
    <Counter
      number={number}
      onIncrease={() => disaptch(increase())}
      onDecrease={() => disaptch(decrease())}
    />
  );
};
```

최적화

- 리랜더링 될 때 마다 onIncrease 함수와 onDecrease 함수가 새롭게 만들어 지고 있다.
- useCallback 함수를 사용해서 성능을 최적화 할 수 있다.

```js
const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
```

useStore

- 리덕스 스토어에 직접 접근해야 하는 경우

```js
const store = useStore();
store.dispatch({ type: "SAMPLE_ACTION" });
store.getState();
```

TodosContainer

```js
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todos from "../components/todo";
import { changeInput, insert, toggle, remove } from "../modules/todos";

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));
  const dispatch = useDispatch();

  const onChangeInput = useCallback(
    (input) => {
      dispatch(changeInput(input));
    },
    [dispatch]
  );
  const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback(
    (id) => {
      dispatch(toggle(id));
    },
    [dispatch]
  );
  const onRemove = useCallback(
    (id) => {
      dispatch(remove(id));
    },
    [dispatch]
  );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onRemove={onRemove}
      onRemove={onRemove}
    />
  );
};

export default TodosContainer;
```

connect 함수와 useSelector / useDispatch 의 주요 차이점

- connect: 컨테이너 컴포넌트의 부모 컴포넌트가 리랜더링 될 때 props 가 바뀌지 않으면 해당 컴포넌트가 랜더링 되지 않는다. (성능 최적화)
- useSelector: 위의 최적화가 자동으로 되지 않기 때문에 React.memo를 사용해주어야 한다.

```js
export default React.memo(TodosContainer);
```

## 18장 리덕스 미들웨어를 통한 비동기 작업 관리

## 19장
