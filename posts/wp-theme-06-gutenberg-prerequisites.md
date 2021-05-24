---
title: "WP Theme - 06 Gutenberg Prerequisites"
date: "2021-05-24"
---

# 06 Gutenberg Prerequisites

## Gutenberg

### Notes

- Gutenberg is a morder editor for creating content. It not only changes the editing experience, but the developer experience as well.
- You can create blocks using ES5/Plain JavaScript, but that makes it hard to manage and read your code.
- Using webpack, react and other libraries will make working with Gutenberg easier. Knowledge of these would be beneficial.

### The problem

- A lot of APIs are no longer encouraged.
- Higher learning curve.
  - Built with React
  - Requires good knowledge of JavaScript

### 2 Approaches to Gutenberg Development

ES5

- Easiest approach
- Lots of nested code
- Hard to manage

React/Webpack/Babel

- Higher learning curve
- Simplifies your code
- Easier to manage and organize your code

## The Command Lune / Terminal

Windows PowerShell

```
pwd // print working driectory
ls // list
cd music // change directory
cd ..
cd ../..
cd xampp/htdocs
mkdir learn-js // make a directory
cls // clear
```

## Getting started with NodeJS

- Node.js is a program that allows you to run JavaScript code on your computer and/or server
- Node.js can be many things such as creating a web server, working with files, custom commands and so much more.
- After installing node.js, you'll have a new command called **node** which will run any JavaScript file insdie the console.
- We'll be using Node.js to halp with organizing, minifying and concatenating all the files we'll need for our single page app.

## Modules and CommonJS

- Every file is considered a module as far as Node.js is concerned. The main module that starts everything is called the entry point.
- To load a module, you need to use the **require()** function and pass in the path to the module.
- Only the data inside the **module.exports** property is provided to modules that load a module. Nothing else.
- Children modules can also load in their own modules. There is no linit to how deep modules can be loaded. This creates a module tree structure.

## Built-in and 3rd Party Modules

- The create a **package.json** file you can run the **npm init** command or create ethe file manually.
- The **package.json** file contains settings related to your project and the modules you use.
- You can use flags to manipulate how commands work. The name and format of flags vary from developer to developer.
- You'll usually save modules as production or development dependencies depending on the flag you use.

## Introduction to Webpack and Dependencies

- Webpack is a module bundler. It will process your HTML, CSS, JavaScript and other file types
- When you install webpeck, you're provided a command called webpack which will bundle your modules together
- Dependencies are modules that are required to make your app work. They are meant for the product part of your site.
- Developer dependencies are modules that are required for the development phase of your app.

## Webpack Configuration

- Webpack requires that you create a **webpack.config.js** file with all your settings. You define where the entry point and output files.
- The **\_\_dirname** constant will contain the epath ot the file it's currently being used in.
- The webpack CLI is a seperate module that must be installed.

### webpack.config.js

```js
const path = require("path");

const config = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
};

module.exports = config;
```

### package.json

```json
{
  "scripts": {
    "start": "webpack --config webpack.config.js"
  },
  "devDependencies": {
    "webpack": "^5.36.2",
    "webpack-cli": "^4.6.0"
  }
}
```

### index.js

```js
console.log("hello");
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="./dist/bundle.js"></script>
    <title>Document</title>
  </head>
  <body></body>
</html>
```

## Webpack Loaders & Babel

### Notes

- Babel is a JavaScript compiler that converts your code into JavaScript that node and browsers can understand
- Webpack loaders are a way to load 3rd party modules that hook into the webpack process.
- Webpack and babel are completely independent from each other so you use either one without the other.
- Babel is very modular. It's split into various modules. You'll usually find yourself installing a minimum of 3 modules when using Babel.

### Babel is seperated into 3 modules

- **Babel Core** - This is the heart of Babel. This module has the core functionality in order to make anything babel related work. This module wil take care of reading your code and then transforming it into code that the browser can understand.
- **Babel Loader** - This module make it easy to connect webpack and babel together. Thses 2 modules are completelu independent from each other. The babel loader module connects the 2 for you.
- The 3rd module depends on what feature you'd like to support. The modules stated above are required. We'll be using the **babel-preset-env** module.

### Install Babel

`npm i --save-dev @babel/core babel-loader @babel/preset-env`

### webpack.config.js

```js
const config = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        use: "babel-loader", // load babel loader
        test: /\.js$/, // only js
      },
    ],
  },
};
```

### .babelrc

```
{
  "presets": ["@babel/env"] // how to convert code
}
```

## ES6 Constants and Let

- ES6 comes with 2 new keywords for defining variables which are **const** and **let**
- Constants are variables that can never be changed once they are set. Attempting to change a constant will result in an error.
- **Let** variables are variable that can be manipulated in the scope they're defined.
- Babel and webpack will convert the **const** and **let** keywords to **var** so that your code is backwards compatible.

## ES6 Arrow Functions

- Arrow functions are similar to regular JavaScript functions except written differently.
- Arrow functions can have no parenthesis wrapped around the parameters if there is only 1 parameter available.
- Arrow functions are popular because they are shorter to write and easier to read.
- It's important to note that arraow functions do not have a scope. It will instead use the scope of it's parent.

## ES7 Modules & Desctructing

- ES modules is the official way of creating modules in JavaScript
- You can export muliple values and optionally export a default value. All exported valued besides the default value require a name
- Desctructing allows you extract properties from objects. Not impressive by itself. It's used with other features of JavaScript.
- ES6 modules and desctructing are used together a lot in examples and actual production applications.

## Getting Started with React

### Notes

- React is a javascript library for creating complex User interfaces or single page applications. Can also be used for creating mobile & desktop apps.
- Components are reusable HTML elements. They're written like a function, but are used like an HTML element.
- JSX is a different form of JavaScript. It is NOT HTML. Babel will convert any JSX into JavaScript functions that will take create of creating elements.
- Some attributes will not work such as the **class** attribute.

### webpack.config.js

```js
var path = require("path");

var config = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
      },
    ],
  },
};

module.exports = config;
```

### package.json

```json
{
  "devDependencies": {
    "@babel/core": "^7.3.4",
    "babel-loader": "^8.0.5",
    "@babel/preset-env": "^7.3.4",
    "webpack": "^4.29.5",
    "webpack-cli": "^3.2.3"
  },
  "dependencies": {
    "@babel/preset-react": "^7.0.0",
    "react": "^16.8.3",
    "react-dom": "^16.8.3"
  }
}
```

### .babelrc

```json
{
  "presets": ["@babel/env", "@babel/react"] // "@babel/preset-env", "@babel/preset-react"
}
```

### index.js

```jsx
import React from "react";
import ReactDOM from "react-dom";

const Person = () => {
  return (
    <div className="person">
      <h1>John</h1>
      <p>Age: 20</p>
    </div>
  );
};

// const Person = () => {
//   return React.createElement(
//     "<div>",
//     { className: "person" },
//     React.createElement("<h1>", null, "John")
//   );
// };

ReactDOM.render(<Person />, document.querySelector("#people"));
```

## Reusing Components and Properties

### Notes

- You must have a root element for your JSX components. Otherwise you'll be given an error.
- Properties are the attributes and data passed down onto a component. It's how you create custom values
- To access the properties, you need to accept in the **props** object and then access the values by their attribute name.

### index.js

```js

```
