---
title: "리액트를 다루는 기술 - React Hooks"
date: "2021-03-14"
---

## useState

함수형 컴포넌트에서 상태 관리를 할 수 있도록 해준다.

```js
const [value, setValue] = useState( initialValue );
```
useState는 상태를 관리하지 위한 배열을 반환한다.
	- 첫 번째 요소는 현재 상태값,
	- 두 번째 요소는 상태를 설정하는 함수.
	- 관리해야 할 상태가 여러 개라면 useState를 여러 번 사용 할 수 있다.

## useEffect

리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정
componentDidMount + componentDidUpdate
	- 마운트될 때만 실행하고 싶을 때: `useEffect(()=>{}, [])`
	- 특정 값이 업데이트될 때만 실행하고 싶을 때: `useEffect(()=>{}, [def])`
	- 뒷정리(cleanup): 언마운트 되기전이나 업데이트 되전에 실행 할 함수. useEffect에서 뒷정리 함수를 반환해주어야 한다.
	- 오직 언마운트될 때만 뒷정리 함수를 호출하고 싶으면, useEffect 함수의 두 번째 파라미터에 비어 있는 배열을 넣는다.

```js
useEffect(()=>{
  // 마운트, 업데이트 될 때 실행 되는 코드
  return () => {
    // 언마운트, 업데이트 전에 실행되는 코드
  }
}, [ def ]) // 기준이 되는 상태, 변수
```

```js
// Info.js
  useEffect(() => {
    console.log("렌더링이 완료되었습니다.!");
    console.log({ name, nickname });
  }, [name, nickname]);
```

## useReducer
useState 보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용

리듀서
	- 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환하는 함수
	- const reducer = (state = initialState, action) => {
  swtch(action.type){
    default: 
      return state;
  }
}
	- action type 에 따라 새로운 상태를 반환
	- useReducer에서 사용하는 액션 개체는 덜 엄격하다.
		○ 객체 뿐만 아니라 숫자형, 문자형도 가능하다.
		○ type 속성이 없을 수도 있다.
	- import { useReducer } from 'react';
	- cosnt [state, dispatch] = useReducer( reducer, initialState );
		○ 첫 번째 파라미터: 리듀서 함수
		○ 두 번째 파라미터: 리듀서의 기본 값
		○ state: 현재 가리키고 있는 상태
		○ dispatch: 액션을 발생시키는 함수
		○ dispatch( action ) 형태로 리듀서 함수를 호출
		○ 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다. (리듀서를 함수 밖으로 분리 할 수 있다)
	- state.value
	- dispatch({type: "INCREMENT"})
	- const reducer = (state, action) => { 
  switch(action.type){
    case: "INCREMENT":
      return { value: state.value + 1 };
    // 생략
 }

```js
import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};

export default Counter;
```

```js
// Info.js

import { useReducer } from 'react';

const reducer = (state, action) => ({ …state, [action.name] : action.value });
// [e.target.name]: e.target.value;

const Info = () => {
  const [state, dispatch] = useReducer( reducer, { name: "", nickname: "" });
  const onChange = (e) => disaptch(e.taget);
  return ( <div>
    <input name="name" value={state.name} onChange={onChange}/>
    // 생략
  </div>)
}
```

## useMemo
함수형 컴포넌트 내부에서 발생하는 연산을 최소화 시킨다.
렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바귀지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식.

```js
const getAverage = list => list.reduce( (a, b) => a + b );
return <>평균값: {getAverage(list)}</>
```
	- 컴포넌트가 랜더링 될 때 마다 해당 함수가 실행 된다.

```js
const getAverage = list => list.reduce( (a, b) => a + b );
const avg = useMemo(()=>{getAverage(list)}, [list])
return <>평균값: {avg}</>
```
	- list 가 변경될 때에만 해당 함수가 실행 된다.
	- 기존의 값을 기억하고 있고, 해당 값이 변경 되는 경우만 첫번째 매개변수로 전달된 콜백 함수가 실행된다.

## useCallback
주로 렌더링 성능 최적화해야 하는 상황에서 사용
만들어 놨던 함수를 재사용할 수 있다.

`useCallback( 생성하고 싶은 함수, [ 함수를 새로 생성 기준이 되는 변수로 이루어진 배열 ] )

```js
  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  // 첫 렌더링 시에만 함수 생성 

  const onInsert = useCallback(
    (e) => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber("");
    },
    [number, list]
  );

  // number, list 가 변할 때에만 함수 생성

```

## useRef
useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킨다.

```js
const inputEl = useRef(null);

const getAverage = () => {
  // 로직
  inputEl.current.focuse(); // 해당 요소에 포커스 주기
}

return <input value={number} onChange={onChange} ref={inputEl}/> // DOM에 ref 지정
```

로컬 변수 사용하기
	- 랜더링과 관되지 않은 값을 관리할 때
	- 로컬 변수: 렌더링과 상관없이 바뀔 수 있는 값

```js
class MyComponent extends Component {
  id = 1;
  setId = n => {
    this.id = n;
  }
  const printId = () => { console.log(this.id) };
  // 생략
}
```
```js
const RefSample = () => {
  const id = useRef(1);
  const setId = n => { id.current = n; }
  const printId = () => { console.log(id.current) }
  // 생략
}
```

## 커스텀 hooks 만들기
	- 여러 컴포넌트에서 비슷한 기능을 공유하는 경우 hook 으로 작성하여 재사용할 수 있다.

```js
// useInputs.js
import { useReducer } from "react";
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}
export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```

```js
// Info.js
const Info = () => {
  const [state, onChange] = useInputs({ name: "", nickname: "" });
  const { name, nickname } = state;
  return (<></>)
}
```


