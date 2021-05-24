---
title: "WP Theme - 07 Gutenberg Development"
date: "2021-05-24"
---

# 07 Gutenberg Development

## Getting Started with Gutenberg

### Notes

- Wordppress provides a babel preset for processing code. This saves you time from having to set things up yourself.
- The **cross environment** module will make sure any commands and settings you use will work with any platform.
- You can set the **watch** property inside the **webpack config** file to force webpack to continuosly watch your files for any changes and compile them.
- Source maps are a way to convert compressed/minified/obscured JavaScript back to its original form.

### [Babel Preset Default](https://www.npmjs.com/package/@wordpress/babel-preset-default)

### The Process

1. Prepare the environment
2. Enqueue Files
3. Register block
4. Create block settings
5. Render block

### package.json

```json
{
  "name": "recipe-blocks",
  "scripts": {
    "dev": "cross-env BABEL_ENV=default webpack --watch",
    "build": "cross-env BABEL_ENV=default NODE_ENV=production webpack -p"
  },
  "main": "index.js",
  "devDependencies": {
    "@babel/core": "^7.0.0",
    "@babel/plugin-transform-react-jsx": "^7.2.0", // allows you to change the React.creactElement function
    "babel-loader": "^8.0.4",
    "@wordpress/babel-preset-default": "^3.0.1", // presets: @wordpress/default
    "classnames": "^2.2.6",
    "cross-env": "^5.1.5", // cross all operating systems
    "webpack": "^4.26.1",
    "webpack-cli": "^3.1.2"
  },
  "version": "1.0.0",
  "license": "MIT"
}
```

### webpack.config.js

```js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
  watch: true, // same as --watch in package.json
  devtool: "cheap-eval-source-map", // how to compress js code // cheap-eval-source-map: very fast and cheap build timme
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
    ],
  },
};
```

### .babelrc

```js
{
  "presets": ["@wordpress/default"], // wp presets covers react presets
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "wp.element.createElement" // wp.element.createElement = react.createElement
      }
    ]
  ]
}
```

## Registering and Enqueueing the Block Assets

### Notes

- Use the action hook **enqueue block editor assets** to laod your JS/CSS files for the Gutenberg editor
- The **wp-i18n** file has code related to translating strings on the front end
- The **wp-element** script provides funcstions for creating elements. Mainly for JSX
- The **wp-components** script provides the various components you can use in your own blocks

### index.php

```php
// Includes
include( 'blocks/enqueue.php' );

// Hooks
add_action( 'enqueue_block_editor_assets', 'r_enqueue_block_editor_assets');
```

### blocks/enqueue.php

```php
function r_enqueue_block_editor_assets(){
  // register
  wp_register_script(
    'r_blocks_bundle',
    plugins_url('/blocks/dist/bundle.js', RECIPE_PLUGIN_URL),
    ['wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-api'], // dependencies
    filemtime( plugin_dir_path(RECIPE_PLUGIN_URL) . '/blocks/dist/bundle.js' ) // version
  );

  // enqueue
  wp_enqueue_script( 'r_blocks_bundle' );
}
```

wp-i18n: transcript out script

wp-element: convert JSX to JS

wp-blocks: register block to gutenberg

wp-compoments: access reusable compoennts

wp-editor: tools / functions for editor

wp-api: interact wordpress rest api

filemtime( string $filename ): returns the time when the data blocks of a file were being written

plugin_dir_path ( string $file ): get the filesystem directory path

### blocks/app/index.js

```js
console.log("hello");
// 쿠텐버그 에디터가 활성화 되면 콘솔에 메시지 출력
```

## Regitering Blocks

### notes

- You don't have to store the contents of an imported file. You can import a file for the sake of executing the imported file's code.
- All code is stored under the global variable **wp**. The **blocks** object contains all the components registered under WordPress.
- The **registerBlockType** function has 2 parameters. The first is the name of the block. The name should be formatted as **namespace/name**. The second parameter is the settings.
- The Gutenberg code provided in WordPress is different from the code on Github. The Github version is the uncompiled with version. It has not been processed by babel or webpack.

### [Block Editor Handbook](https://developer.wordpress.org/block-editor/)

### [Gutenberg Github Repo](https://github.com/WordPress/gutenberg)

[wp storybook](https://wordpress.github.io/gutenberg/?path=/story/docs-introduction--page)

### blocks/app/index.js

```js
// console.log(wp);

wp.blocks.registerBlockType("udemy/recipe", {
  // settings
});
```

### blocks/app/recipe-wp/index.js

```js
// Main File

import "./recipe-block";
```

## Block Settings

### Notes

- Desctucture objects to make your code readable. A common practice for Gutenberg blocks.
- SVG stands for **scalable vertoc images**. Thet're images made up of code. You can use custom icons for your blocks by using SVG. Make sure your SVG images are JSX ready by converting theme beforehand.
- You're allowed to submit up to 3 keywords. If you must have more than 3, then you can put multiple words in a single keyword.
- The **supports** property will disable/enable any Gutenberg block features. Giving you more control over the functionality of your block.

### [WAPUUS](https://wapu.us/)

### [block-supports](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/)

### recipe/blocks/index.js

```js
// console.log(wp);
import block_icons from "../icons/index";

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType("udemy/recipe", {
  title: __("Recipe", "recipe"),
  description: __("Provides a short summary of a recipe.", "recipe"),
  // common, formatting, layout, widgets, embed
  category: "common",
  icon: block_icons.wapuu, // dashicons, <svg></svg>
  keywords: [
    __("Food", "recipe"),
    __("Ingredients", "recipe"),
    __("Meal Type", "recipe"),
  ],
  supports: {
    html: false,
  },
  save: () => {
    return <p>Hello World</p>;
  },
});
```

## Using the edit and save properties

### Notes

- The **edit** function should be used to render a UI in the editor. The **save** function should be used to render the final result of the block for the front end.
- React applications are structured with components. Children components are reponsible for telling the parent component if the data was updated. After an update has occurred, all children will be updated with the last changes.
- The **props** object will contain the data related to your block. It's filled with properties and methods that care constantly updated whenever the user interacts with the editor.
- To add dynamic values in JSX, you need to use a pair of curly brackets with the value you'd like to inject.

### recipe-block/index.js

```js
registerBlockType("udemy/recipe", {
  // editor
  edit: (props) => {
    // console.log(props);
    return (
      <div className={props.className}>
        {/* <div class="wp-block-udemy-recipe"> */}
        <ul class="list-unstyled">
          <li>
            <strong>{__("Ingredients", "recipe")}: </strong> INGREDIENTS_PH
          </li>
          <li>
            <strong>{__("Cooking Time", "recipe")}: </strong> COOKING_TIME_PH
          </li>
          <li>
            <strong>{__("Utensils", "recipe")}: </strong> UTENSILS_PH
          </li>
          <li>
            <strong>{__("Cooking Experience", "recipe")}: </strong> LEVEL_PH
          </li>
          <li>
            <strong>{__("Meal Type", "recipe")}: </strong> TYPE_PH
          </li>
        </ul>
      </div>
    );
  },
  // frontend
  save: (props) => {
    return <p>Hello World!</p>;
    // <p class="wp-block-udemy-recipe">Hello World!</p>
  },
});
```

edit: () => {}

- editor 랜더링
- 사용자가 직접 wrapper에 클래스를 지정해주어야 한다. (className={props.className})

save: () => {}

- frontend 랜더링
- 자동으로 class 지정

## Inspector Controls

### Notes

- Inspector controls are the input fields on the sidebar of the Gutenberg editor
- You can **return** an array to have multiple root elements. If an **InspectorControls** component is in the array Gutenberg will display the content on the sidebar
- WordPress provides dozens of generic components that you can take advantage of. They come with formatting and accessiblity to your blocks.
- The **TextControl** component will create an input field. The **SelectControl** component will create a dropdown field.

### Understanding Components

[Component Reference](https://developer.wordpress.org/block-editor/reference-guides/components/)

Components are generic. There are plans to make the entire WordPress admin dashboard a React applications. The developers behind Gutenberg have prepared for this by making certain components generic.

### recipe-block/index.js

```js
const { PanelBody, PanelRow, TextControl, SelectControl } = wp.components;
```

```js
const edit = () => {
  <InspectorControls>
    <PanelBody title={__("Basics", "recipe")}>
      <PanelRow>
        <p>{__("Configure the contents of your block here.", "recipe")}</p>
      </PanelRow>
      <TextControl
        label={__("Ingredients", "recipe")}
        help={__("Ex: tomatoes, lettuce, olive oil, etc.", "recipe")}
        value="test"
        onChange={(new_val) => console.log(new_val)} // user input
      />
      <SelectControl
        label={__("Cooking Experience", "recipe")}
        help={__("How skilled shoud the reader be?", "recipe")}
        value="Beginner"
        options={[
          { value: "Beginner", label: "Beginner" },
          { value: "Intermediate", label: "Intermediate" },
          { value: "Expert", label: "Expert" },
        ]}
        onChange={(new_val) => {
          console.log(new_val);
        }}
      />
    </PanelBody>
  </InspectorControls>;
};
```

## Sidebar: ES6 Rest and Spread Operators

- The **rest** operator allows you to have a parameter that takes an unlimited amount of values and store them in an array.
- The **spread** operator will take the values from an array/object and spread them to wherever you place it. Useful for merging objects/arrays
- The **arguments** object may looks like an array, but it's not a true array. You can't access the same methods and properties that come with arrays.
- Gutenberg uses that the **rest** and **spread** operators to allow for dynamic attributes in their components.

```js
function add() {
  const result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }

  console.log(result);
}
add(); // 0
add(1); // 1
add(1, 2, 3); // 6
```

Rest Operator

- 함수 안
- 여러 값을 하나의 배열로 취급

```js
function add(message, ...numbers) {
  // var result = arguments.reduce((total, num) => total + num);
  const result = numbers.reduce((total, num) => total + num);
  console.log(message, result);
}
add("hello", 1); // hello 1
add(1, 2, 3); //1 5
```

Spread Operators

- 함수 밖
- 하나의 배열의 값을 나열

```js
const arr1 = [2, 3];
const arr2 = [1, ...arr1, 4, 5];

console.log(arr1, arr2); // [ 2, 3 ] [ 1, 2, 3, 4, 5]
```

WP TextControl

- 지정 되지 않은 속성 (attribute)를 자식 요소로 전달 할 수 있다.

```js
function TextControl = ( {label, value, help, className, instanceId, onChange, type = 'text', ...props}) => {
  return <BaseControl><input {...props}/></BaseControl>
}
```

## Attributes

### Notes

- Attributes are custom value for your block. They must be set and managed by you, the developer.
- After setting your attributes, they can be accessed via **props.attributes** object.
- To update an attribute, you need to sue the **props.setAttributes** function. Pass in an object with all the attributes you'd like to update.
- The attributes don't get saved saving the post because the **save** function is not being saved properly. This is why you see **Hello** constantly. This will be taken care of the next lecture.

### [Block Editor Handbook / Attributes](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/)

### recipe-block/index.js

```js
registerBlockType("udemy/recipe", {
  attributes: {
    ingredients: { source: "text" },
    cooking_time: { source: "text" },
    utensils: { source: "text" },
    cooking_experience: { source: "text", default: "Beginner" },
    meal_type: { source: "text", default: "Breakfast" },
  },
  // editor
  edit: (props) => {
    // console.log(props);
    const updateIngredients = (new_val) => {
      props.setAttributes({ ingredients: new_val });
    };

    return [
      <InspectorControls>
        <PanelBody title={__("Basics", "recipe")}>
          <PanelRow>
            <p>{__("Configure the contents of your block here.", "recipe")}</p>
          </PanelRow>
          <TextControl
            label={__("Ingredients", "recipe")}
            help={__("Ex: tomatoes, lettuce, olive oil, etc.", "recipe")}
            value={props.attributes.ingredients}
            onChange={updateIngredients} // user input
          />

          <SelectControl
            label={__("Cooking Experience", "recipe")}
            help={__("How skilled shoud the reader be?", "recipe")}
            options={[
              { value: "Beginner", label: "Beginner" },
              { value: "Intermediate", label: "Intermediate" },
              { value: "Expert", label: "Expert" },
            ]}
            value={props.attributes.cooking_experience}
            onChange={(new_val) =>
              props.setAttributes({ cooking_experience: new_val })
            } // user input
          />
        </PanelBody>
      </InspectorControls>,
    ];
  },
  // frontend
  save: (props) => {
    return <p>Hello World!</p>;
    // <p class="wp-block-udemy-recipe">Hello World!</p>
  },
});
```

## Rendering the Block

### Notes

- Gutenberg constantly calls the **edit** function whenever the block or anything else is updated. The **save** function is called when the post is published or updated
- WordPress will save your content with your blocks surrounding in comments. The comments will help break your content back into blocks in the editor.
- The **selector** property will tell Gutenberg where it can find the value for an attribute. The **source** will tell it what to take from that element based on the selector.
- The **type** will tell Gutenberg what type of data it should expect to store in the database. This is optional.

### Edit flow

HTML -> Change to blocks -> Grab attributes -> edit () <- -> Gutenberg

### attributes

```js
{
  attributes: {
    ingredients: {
      type: "string", // data type, optional, only working for metadata
      source: "text", // instruct gutenberg what is extract from html in database
      selector: ".ingredients-ph", // where is data found in html, ph (placeholder)
    },
    cooking_time: {
      type: "string",
      source: "text",
      selector: ".cooking-time-ph",
    },
    utensils: { type: "string", source: "text", selector: ".utensils-ph" },
    cooking_experience: {
      type: "string",
      source: "text",
      default: "Beginner",
      selector: ".cooking-experience-ph",
    },
    meal_type: {
      type: "string",
      source: "text",
      default: "Breakfast",
      selector: ".meal-type-ph",
    },
}
```

### edit

```js
edit: props => (
  [
  <InspectorControls>
    <PanelBody title={__("Basics", "recipe")}>
      <PanelRow>
        <p>{__("Configure the contents of your block here.", "recipe")}</p>
      </PanelRow>
      <TextControl
        label={__("Ingredients", "recipe")}
        help={__("Ex: tomatoes, lettuce, olive oil, etc.", "recipe")}
        value={props.attributes.ingredients}
        onChange={(new_val) => {
          props.setAttributes({ ingredients: new_val });
        }} // user input
      />
    </PanelBody>
  </InspectorControls>,
  <div className={props.className}>
    {/* <div class="wp-block-udemy-recipe"> */}
    <ul class="list-unstyled">
      <li>
        <strong>{__("Ingredients", "recipe")}: </strong>
        <span className="ingredients-ph">
          {props.attributes.ingredients}
        </span>
      </li>
    <ul>
  </div>
])
```

### save

```js
save: (props) => {
    return (
      <div> {/* class 는 자동으로 설정 된다.*/}
        <ul class="list-unstyled">
          <li>
            <strong>{__("Ingredients", "recipe")}: </strong>
            <span className="ingredients-ph">
              {props.attributes.ingredients}
            </span>
          </li>
        </ul>
      </div>
```

## Styling Blocks

`npm i raw-loader node-sass sass-loader@10.0.5 css-loader mini-css-stract-plugin -save-dev`

### Notes

- SASS/SCSS is preprocessort with features like variable, conditional statements, etc. It can make your CSS easier to manage.
- SASS can't be loaded on the browser. You need to able to compile it into CSS after you're finished. There are plenty of modules for Webpack and Node.js to accomplish this.
- You can use multiple loaders by passing in an array to the **use** property.
- Use the **enqueue block assets** hook to load scripts and stylesheet for the editor anf front end. It's ideal to use it for laoding stylings for your blocks.

### SASS/SCSS

- CSS preprocessor
- Adds features such as variables, conditional statements, looping, minification, vendor prefixing, etc
- Written like CSS with a few additional systax rules
- SCSS is the latest version while SASS is the older version

### Modules

raw-loader: A loader for webpack that allows importing files as a String (`import './styles.css';`)

node-sass: SASS moduels in JavaScript

sass-loader@10.0.5: Compiles Sass to CSS

mini-css-stract-plugin: CSS straction plugin

css-loader

### webpack-config.js

```js
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Extract CSS for Gutenberg Editor
const editor_css_plugin = new MiniCssExtractPlugin({
  filename: "blocks-[name].css",
});

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
  watch: true,
  devtool: "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [editor_css_plugin],
};
```

### editor.scss

```scss
.wp-block-udemy-recipe {
  ul.list-unstyled {
    padding-left: 0;
    list-style: none;
  }
  li {
    margin: 0;
    padding: 0;
  }
}
```

### index.php

```php
include( 'blocks/enqueue.php' );
add_action( 'enqueue_block_editor_assets', 'r_enqueue_block_editor_assets'); // admin
add_action( 'enqueue_block_assets', 'r_enqueue_block_assets'); // admin + frontend
```

### enqueue.php

```php
function r_enqueue_block_assets(){
  wp_register_style( 'r_blocks', plugins_url('/blocks/dist/blocks-main.css', RECIPE_PLUGIN_URL));
  wp_enqueue_style('r_blocks');
}
```

## Alignment Toolbar

### Notes

- WordPress provides components for adding a toolbar to your block. This is done with the **BlockControls** component.
- The **AlignmentToolbar** us a component that will add an alignment toolbar to wherever you call it.
- If you don't set a **selector** or **source**, then WordPress will store your attribute in the comments.
- It's recommended that you store attributes in the comments for small or simple values. Store attribute values in the HTML when the data is complex.

### recipe-block/index.js

```js
const { InspectorControls, BlockControls, AlignmentToolbar } = wp.blockEditor;

registerBlockType("udemy/recipe", {
  attributes: {
    text_alignment: {
      type: "string",
    },
  },
  edit: (props) => {
    return [
      <InspectorControls>{/**/}</InspectorControls>,
      <div className={props.className}>
        <BlockControls>
          <AlignmentToolbar
            value={props.attributes.text_alignment}
            onChange={(new_val) => {
              props.setAttributes({ text_alignment: new_val });
            }}
          />
        </BlockControls>
        <ul
          class="list-unstyled"
          // style={{ textAlignment: props.attributes.text_alignment }}
          style={{ textAlign: props.attributes.text_alignment }}
        ></ul>
      </div>,
    ];
  },
  save: () => {},
});
```

## Block alignment

### Notes

- The **BlockAlignmentToolbar** component will create the UI for aligning your block in the editor.
- The **getEditWrapperProps** function will run every time the block is updated. We use it to update the property that's wrapped around our block in the editor.
- Boostrap come with classes for aligning your content, We sue it to help us align the component in the template.

### [Gutenberg repository Block Alignment COntrol](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/block-alignment-control)

### recipe-block/index.js

```js
const {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  BlockAlignmentToolbar,
} = wp.editor;

registerBlockType("udemy/recipe", {
  attributes: {
    block_alignment: {
      type: "string",
      default: "wide",
    },
  },
  getEditWrapperProps: ({ block_alignment }) => {
    if (
      "left" === block_alignment ||
      "right" === block_alignment ||
      "full" === block_alignment
    ) {
      return { "data-align": block_alignment };
    }
  },
  edit: (props) => {
    return (
      <div className={props.className}>
        <BlockControls>
          <BlockAlignmentToolbar
            value={props.attributes.block_alignment}
            onChange={(new_val) => {
              props.setAttributes({ block_alignment: new_val });
            }}
          />
        </BlockControls>
        <ul
          className="list-unstyled"
          style={{ textAlign: props.attributes.text_alignment }}
        >
          {/**/}
        </ul>
      </div>
    );
  },
  save: (props) => {
    return (
      <div className={`align${props.attributes.block_alignment}`}>
        <ul className="list-unstyled">{/**/}</ul>
      </div>
    );
  },
});
```
