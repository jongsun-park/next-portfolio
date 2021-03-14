---
title: "CSS contain properties"
date: "2021-03-14"
---

contain: 특정 요소와 콘텐츠가 문서 트리의 다른 부위와 독립되어있음을 나타낼 때 사용

```css
/* 키워드 값 */
contain: none;      /* 격리없이 평범하게 렌더링함 */
contain: strict;    /* style을 제외한 모든 격리 규칙을 적용함 */
contain: content;   /* size와 style을 제외한 모든 격리 규칙 */
contain: size;      /* 요소의 크기를 계산할 때 자손의 크기는 고려하지 않아도 됨을 나타냄 */
contain: layout;    /* 요소 외부의 어느 것도 내부 레이아웃 영향을 주지 않음 */
contain: style;     /* 요소 자신과 자손 외에도 영향을 주는 속성이라도 그 영향 범위가 자신을 벗어나지 않음 */
contain: paint;     /* 요소가 화면 밖에 위치할 경우 당연히 그 안의 자손도 화면 안에 들어오지 않을 것이므로 브라우저는 그 안 요소 고려하지 않음 */ 

/* 다중 값 */
contain: size paint;
contain: size layout paint;

/* 전역 값 */
contain: inherit;
contain: initial;
contain: unset;
```

contain: layout style size;
	- layout: 요소 외부의 어느 것도 내부 레이아웃 영향을 주지 않음
	- style: 요소 자신과 자손 외에도 영향을 주는 속성이라고 그 영향 범위가 자신을 벗어나지 않음
	- size: 요소의 크기를 계산 할 때 자손의 크기는 고려하지 않아도 됨
	

출처
[frontdev](https://frontdev.tistory.com/entry/CSS-Contain-%EC%86%8D%EC%84%B1%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC)
[mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)