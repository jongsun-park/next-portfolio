---
title: "JavaScript - window.requestAnimation"
date: "2021-03-14"
---

The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint

브라우저에게 콜백 함수를 인자로 전달하여, 리페인트 되기 전에 해당 애니메이션을 실행할 수 있도록 요청한다. 

https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

```js
const element = document.getElementById('some-element-you-want-to-animate');
let start;

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  // `Math.min()` is used here to make sure that the element stops at exactly 200px.
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  if (elapsed < 2000) { // Stop the animation after 2 seconds
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
//특정 요소를 0.1px/ms 속도로 오른쪽으로 2초간 이동 시킨다.
```