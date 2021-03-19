---
title: "Framer motion - React Animation Library"
date: "2021-03-19"
---

# Framer motion

Framer motion은 리액트 프로젝트에서 간단하게 DOM에 애니메이션을 적용할 수 있는 라이브러리 이다.

```js
import { motion } from "framer-motion";

return (
  <motion.div
    variants={{}} // variable for motion object
    initial={{}} // from state
    animate={{}} // to state
    transition={{}} // how to animate
    exit={{}} // before remove from rendering
    whileHover={{}} // hover state
  ></motion.div>
);
```

[framer motion api](https://www.framer.com/api/motion/)

[framer motion tutorials](https://www.youtube.com/watch?v=2V1WK-3HQNk)

## Container && Page Transition

요소가 렌더링을 시작 할 때 약간의 지연 후 1.5초간 천천히 페이드인 된다.

페이지가 바뀌거나 해당 요소가 사라질 때는 화면 왼쪽으로 이동한다.

```js
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 },
  },
  eixt: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

return (
  <motion.div
    variants={containerVariants}
    initial="hideen" // containerVariants 에서 정의된 hidden 값을 참조한다.
    animatate="visible"
    exit="exit"
  >
    {/**/}
  </motion.div>
);
```

페이지 전환 효과를 주기 위해서는, 기준이 되는 상위 컴포넌트를 지정해주어야 한다.

라우터를 사용하는 경우 `<AnimatePresense>` 컴포턴트로 감싸고, 순차적으로 애니메이션이 일어날 수 있도록 `exitBeforeEnter` 속성을 지정한다.

해당 페이지의 위치는 `useLoadtion()`으로 지정할 수 있다.

페이지가 사라 질 때의 애니메이션은 `<motion.div exit={{}}/>` 컨테이너 컴포넌트의 exit 속성에서 결정한다.

```js
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const location = useLocation();

return (
  <AnimatePresence>
    <Switch location={location} key={location.key}>
      <Route path="">{/* page component */}</Route>
    </Switch>
  </AnimatePresence>
);
```

## Button && Keyframes && Hover effect && Inheritance

```js
const buttonVariants = {
  hover: {
    scale: 1.1, // [1.1, 1, 1.1, 1] : 배열로 키프레임을 지정할 수 있다.
    textShadow: "0px 0px 8px rgba(255,255,255)",
    boxShadow: "0px 0px 8px rgba(255,255,255)",
    transition: {
      // yoyo: 10, // 5 times
      yoyo: Infinity,
      duration: 0.3,
    },
  },
};

return (
  <motion.button variants={buttonVariants} whileHover="hover">
    {/**/}
  </motion.button>
);
```

```js
const nextVariants = {
  hidden: { x: "-100vw" },
  visible: { x: 0 },
  transition: { type: "spring", stiffness: 120 }, // spring: bounce effect, defualt
};

return (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    visible="visible"
    exit="exit"
  >
    <motion.li
      variants={nextVariants}
      // initial ="hidden" // 부모와 동일한 키를 상속한다. 적용되는 값은 연결된 variants 에서 가져온다.
      // animate="visible"
    ></motion.li>
  </motion.div>
);
```

## SVG 애니메이션

```js
const svgVariants = {
  hidden: { rotate: -180 },
  visible: { rotate: 0, transition: { duration: 1 } },
};

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

return (
  <motion.svg variants={svgVariants} initial="hidden" animate="visible">
    <motion.path variants={pathVariants} fill="none" d="" />
    <motion.path variants={pathVariants} fill="none" d="" />
  </motion.svg>
);
```

## Childen && StaggerChildren

```js
const containerVariants = {
  hidden: { opacity: 0, x: "100vw" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4, // quick - slow
      damping: 8, // bounce rate high - low
      when: "beforeChildren", // 부모 애니메이션을 끝내고 자식 애니메이션을 실행한다.
      staggerChildren: 0.4, // 자식 요소 사이 시간 간격을 조절한다. 0.4초 간격으로 자식 요소 실행
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const childrenVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

return (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <h2>{/**/}</h2>
    <motion.p variants={childVariants}>{/**/}</motion.p>
    <motion.div variants={childVariants}>{/**/}</motion.div>
  </motion.div>
);
```

## Modal

```js
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "-100vh",
    opaicity: 0,
  },
  visible: {
    y: "200px",
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const Modal = ({ showModal }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <modal.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <modal.div className="model" variants={modal}>
            {/**/}
          </modal.div>
        </modal.div>
      )}
    </AnimatePresence>
  );
};
```

## Loader && useCycle

useCycle: 지정한 애니매이션 사이에서 전환 할 수 있다.

`Cycle Loader`을 누르면 animationOne 에서 Two, Two 에서 One 으로 바뀐다.

```js
import { motion, useCycle } from "framer-motion";
const loaderVariants = {
  animationOne: {},
  animationTwo: {},
};

const Loader = () => {
  const [animateion, cycleAnimation] = useCycle("animationOne", "animationTwo");
  // animation: current animation state
  // cycleAnimation(): change current animation state
  // useCycle( [animation list] )
  // animation list - defined on variant object

  return (
    <>
      <motion.div variants={loaderVariants} animation={animation}></motion.div>
      <div onClick={() => cycleAnimation()}>Cycle Loader</div>
    </>
  );
};
```

## Dragabble

```js
return (
  <motion.div
    drag
    dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }} // 드래그 허용 범위
    dragElastic={2} // 드래그 강도 조절
  />
);
```
