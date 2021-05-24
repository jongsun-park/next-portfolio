---
title: "WP Theme - 08 Gutenberg Components"
date: "2021-05-24"
---

# 08 Gutenberg Components

## 87 High Level Overview of Gutenberg

- Gutenberg Splits itself up into multiple packages. You can find those packages in the **packages** directory in the Github repository.
- WordPress is planning on making the whole admin dashborad a single page app. It's placed generic components in the **components** package.
- The **data** package is where Gutenberg manages the state. The **state** is a term used to describe the data in your application.
- Gutenberg wraps the React functions for creating elements on the DOM. This is so that it can provide backwards compatibility if React was to ever change.

[WordPress/gutenberg](https://github.com/WordPress/gutenberg/tree/trunk/packages)

- components: generic components for SPA
- data: state
- date: time formatting
- editor:
  - post state -> serialization ->
  - saved post -> parsing / block attributes ->
  - post state -> block ->
  - visual editor -> editing -> post state
- element: creating element (build on the top of React)
  - `React.createElement`
  - `wp.element.createElement`

## Gutenberg Blocks with ES5

- The **Gutenberg Examples** repository is the official repo for how to build blocks for Gutenberg.
- You will find examples for building blocks with ES5 and ESNext. It's not necessary to use Webpack, Babel or SASS.
- It's recommended tat you use self-invoked functiosn to contain your block's code. It's also useful for shortening the names of functions and properties.
- The **wp.element.createElement** function will create an element. It's what JSX gets converted into.

### [Gutenberg Examples](https://github.com/WordPress/gutenberg-examples)

## Rich Text Block

### Notes

- Rich Text are componenets that allow the user to edit text with formatting.
- The **RichText** components can be found in the **wp.editor** object.
- Setting the **source** to **children** will instruct Gutenberg to extract the content from the children elements selected with the **selector** property.
- The **tagName** property will be the element that gets wrapped around content. The **multiple** property will be the element that break up your content. By default it's a break tag.

### [RichText](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/rich-text)

### app/index.js

```js
// Main File
import "./recipe-block";
import "./richtext-block";
```

### app/richtext-block

```js
// 1. Import necessary components
// 2. Define the attributes
// 3. Load the component in the edit()
// 4. Render the block

import block_icons from "../icons/index";

const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const { __ } = wp.i18n;

registerBlockType("udemy/rich-text", {
  title: __("Rich Text Example", "recipe"),
  description: __("Rich text example", "recipe"),
  category: "common",
  icon: block_icons.wapuu,
  attributes: {
    message: {
      type: "array",
      source: "children",
      selector: ".message-ctr",
    },
  },
  edit: (props) => {
    return (
      <div className={props.className}>
        <h3>Rich Text Example Block</h3>
        <RichText
          tagName="div"
          multiline="p"
          placeholder={__("Add your content here.", "recipe")}
          onChange={(new_val) => {
            props.setAttributes({ message: new_val });
          }}
          value={props.attributes.message}
        />
      </div>
    );
  },
  save: (props) => {
    return (
      <div>
        <h3>Rich Text Example Block</h3>
        <div className="message-ctr">{props.attributes.message}</div>
      </div>
    );
  },
});
```

## Custom Toolbar

### Notes

- The **toolbar** component will correctly position and seperate your custom buttons from the other buttons in the toolbar.
- The **tooltip** component will display a tooltip whenever the user hovers over the content placed insdie of the component. This is optional to add, but helpful.
- The **button** component will create a button that is stylized for the Gutenberg editor.
- The **classnames** function will allow you to merge multiple classes together. It's helpful for when you need to dynamically add classes. Something that can't be easily done in react.

### app/index.js

```js
import "./night-mode-block";
```

### app/night-mode-block

```js
import classnames from "classnames";
import block_icons from "../icons/index";
import btn_icon from "./icon";
import "./editor.scss";

const { Toolbar, Button, Tooltip } = wp.components;

registerBlockType("udemy/night-mode", {
  title: __("Night Mode", "recipe"),
  description: __("Content with night mode.", "recipe"),
  category: "common",
  icon: block_icons.wapuu,
  attributes: {
    night_mode: {
      type: "boolean",
      default: false,
    },
  },
  edit: (props) => {
    return (
      <div className={props.className}>
        <BlockControls>
          <Toolbar>
            <Tooltip text={__("Night Mode", "recipe")}>
              <Button
                className={classnames(
                  "components-icon-button",
                  "components-toolbar__control",
                  {
                    "is-active": props.attributes.night_mode, // defualt: false
                  }
                )}
                onClick={() => {
                  props.setAttributes({
                    night_mode: !props.attributes.night_mode,
                  });
                }}
              >
                {btn_icon}
              </Button>
            </Tooltip>
          </Toolbar>
        </BlockControls>
        <div
          className={classnames("content-example", {
            night: props.attributes.night_mode,
          })}
        >
          This is an example of a block with night mode.
        </div>
      </div>
    );
  },
  save: (props) => {
    return (
      <div>
        <div
          className={classnames("content-example", {
            night: props.attributes.night_mode,
          })}
        >
          This is an example of a block with night mode
        </div>
      </div>
    );
  },
});
```

## From Toggle

### Notes

- You are allowed to have multiple input fields/buttons that control the same setting. Gutenberg will be able to sync evething together for you.
- The **FormToggle** component will create a toggle form field that toggles a single value. Similar to a checkbox.
- JSX does not support for the **for** attribute. Instead you need to use the **htmlFor** attribute.

### night-mode-block/index.js

```js
const { BlockControls, InspectorControls } = wp.editor;
const { Toolbar, Button, Tooltip, PanelBody, PanelRow, FormToggle } =
  wp.components;
```

```js
registerBlockType("udemy/night-mode", {
  edit: (props) => {
    const toggle_night_mode = () => {
      props.setAttributes({
        night_mode: !props.attributes.night_mode,
      });
    };
    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Night Mode", "recipe")}>
            <PanelRow>
              <label htmlFor="udemy-recipe-night-mode-toggle">
                {__("Night Mode", "recipe")}
              </label>
              <FormToggle
                id="udemy-recipe-night-mode-toggle"
                checked={props.attributes.night_mode}
                onChange={toggle_night_mode}
              ></FormToggle>
            </PanelRow>
          </PanelBody>
        </InspectorControls>
        <div>{/**/}</div>
      </>
    );
  },
});
```

## Inspector Control Fields

### Notes

- The **TextareaControl** component will render a textarea input form field
- The **CheckboxControl** component will render a checkbox input form field. The **checked** property must be either **true** or **false**.
- The **RadioControl** component will render a radio control input form field. The **options** property must be an arrary of all the option in object form.
- The **RangeControl** component will render a slider that the user can drag back and forth to change a value. A value can also be set manually. You're allowed to pass in your own custom icons. It's recommended you store the icons in a seperate file to keep things clean and organized.

### Destructuring

```js
const {
  PanelBody,
  TextareaControl,
  CheckboxControl,
  RadioControl,
  RangeControl,
} = wp.components;
```

### Attributes

```
attributes: {
  textarea_input: {
      type: 'text',
  },
  checkbox_input: {
      type: 'boolean',
      default: true,
  },
  radio_input: {
      type: 'string',
      default: 'foo',
  },
  range_input: {
      type: 'number',
      default: '5',
  }
},
```

### TextareaControl

```js
<TextareaControl
  label={__("Text Area Control", "recipe")}
  help={__("Help Text", "recipe")}
  value={props.attributes.textarea_input}
  onChange={(new_val) => {
    props.setAttributes({ textarea_input: new_val });
  }}
/>
```

### CheckboxControl

```js
<CheckboxControl
  heading={__("Checkbox Control", "recipe")}
  label={__("Click me!", "recipe")}
  help={__("Help Text", "recipe")}
  checked={props.attributes.checkbox_input}
  onChange={(new_val) => {
    props.setAttributes({ checkbox_input: new_val });
  }}
/>
```

### RadioControl

```js
<RadioControl
  label={__("Radio Control", "recipe")}
  selected={props.attributes.radio_input}
  options={[
    { label: "Foo", value: "foo" },
    { label: "Bar", value: "bar" },
  ]}
  onChange={(new_val) => {
    props.setAttributes({ radio_input: new_val });
  }}
/>
```

### RangeControl

```js
<RangeControl
  beforeIcon="arrow-left-alt2"
  afterIcon="arrow-right-alt2"
  label={__("Range Control", "recipe")}
  min={1}
  max={10}
  value={props.attributes.range_input}
  onChange={(new_val) => {
    props.setAttributes({ range_input: new_val });
  }}
/>
```

## Media Uploads

### Notes

- The **MediaUploadCheck** component will check if the user is logged in. If they are, then **MediaUpload** component will render.
- The **render** property will run a function that you can use to display a UI to the user. Perfect for displaying a button to open the media library.
- The **onSelect** event will run when an media item is uploaded. You'll be passed in an object holding information about the item selected.
- The **allowTypes** property is an array of file types that the user can select.

### app/media-upload-block/index.js

```js
import block_icons from "../icons/index";
import "./editor.scss";

const { registerBlockType } = wp.blocks;
const { Button, Dashicon } = wp.components;
const { __ } = wp.i18n;
const { MediaUpload, MediaUploadCheck } = wp.editor;

// MediaUploadCheck: check user has loggined & permissions

registerBlockType("udemy/media-upload", {
  title: __("Image Media Upload", "recipe"),
  description: __("Image Media Upload", "recipe"),
  category: "common",
  icon: block_icons.wapuu,
  attributes: {
    image_ID: {
      type: "number",
    },
    image_URL: {
      type: "string",
      source: "attribute",
      attribute: "src",
      selector: "img",
    },
    image_ALT: {
      type: "string",
      source: "attribute",
      attribute: "alt",
      selector: "img",
    },
  },
  edit: (props) => {
    const select_img = (img) => {
      console.log("img", img);
      props.setAttributes({
        image_ID: img.id,
        image_URL: img.url,
        image_ALT: img.alt,
      });
    };
    const remove_img = () => {
      props.setAttributes({
        image_ID: null,
        image_URL: null,
        image_ALT: null,
      });
    };
    return (
      <div className={props.className}>
        {props.attributes.image_ID ? (
          <div className="image-ctr">
            <img
              src={props.attributes.image_URL}
              alr={props.attributes.image_ALT}
            />
            {props.isSelected ? (
              <Button class="btn-remove" onClick={remove_img}>
                <Dashicon icon="no" size="20" />
              </Button>
            ) : null}
          </div>
        ) : (
          <MediaUploadCheck>
            <MediaUpload
              allowedType={["img"]}
              value={props.attributes.image_ID}
              onSelect={select_img}
              render={(
                { open } // open: provide by components
              ) => (
                <Button className={"button button-large"} onClick={open}>
                  {__("Upload Image", "recipe")}
                </Button>
              )}
            ></MediaUpload>
          </MediaUploadCheck>
        )}
      </div>
    );
  },
  save: (props) => {
    return (
      <div>
        <img
          src={props.attributes.image_URL}
          alt={props.attributes.image_ALT}
        />
      </div>
    );
  },
});
```
