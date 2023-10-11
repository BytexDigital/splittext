# Split Text

## Introduction

A React Package For Splitting Text Into Characters, Words And Lines. Inspired by GSAP's SplitText plugin.

## Installation

Installing Split Text with npm:

```bash
npm install @splittext/react
```

Installing Split Text with yarn:

```bash
yarn add @splittext/react
```

Installing Split Text with pnpm:

```bash
pnpm add @splittext/react
```

## Basic Usage

A basic example of using SplitText in your application:

```tsx
import { SplitText } from '@splittext/react';

function Component() {
  return <SplitText>Lorem ipsum dolor sit amet</SplitText>;
}
```

By default Split Text will split the text by word.

## Props

The following props can be passed to the Split Text component:

| Prop           | Type                                                                                | Description                                                                                                             | Default |
| :------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------ |
| mode           | 'char' &#124; 'word' &#124; 'line' &#124; Array<'char' &#124; 'word' &#124; 'line'> | Define the mode to split text: either a single mode as a string ('char', 'word', or 'line') or an array combining them. | 'word'  |
| resizeDebounce | number                                                                              | The debounce time (ms) for the resize event.                                                                            | 500ms   |
| options        | object                                                                              | Options for each mode.                                                                                                  | -       |
| onComplete     | function                                                                            | A callback function that is called when the split text has completed.                                                   | -       |
| onResize       | function                                                                            | A callback function that is called when the parent element is resized.                                                  | -       |
| as             | string                                                                              | The element to render the split text as.                                                                                | 'div'   |

### Options

The options prop allows you to provide configuration for each split mode (char, word, line). This is an object with keys corresponding to the split modes and values being configuration objects.

```tsx
{
  "line": SplitModeOption,
  "word": SplitModeOption,
  "char": SplitModeOption
}
```

Where `SplitModeOption` is an object with the following properties:

| Property     | Type                | Description                                                        | Default |
| :----------- | :------------------ | :----------------------------------------------------------------- | :------ |
| tag          | 'div' &#124; 'span' | The HTML tag to use for the split element                          | 'div'   |
| className    | string              | Class name to be applied to the split element                      | -       |
| style        | CSSProperties       | Inline CSS styles to be applied to the element                     | -       |
| wrapper      | boolean             | A flag indicating whether to wrap each element.                    | false   |
| wrapperProps | object              | Properties for the wrapper element, applicable if wrapper is true. | -       |

#### wrapperProps Properties

If wrapper is set to `true` OR `className` or `style` within `wrapperProps` is used, a wrapper element will be included when rendered. The wrapper will be rendered as a `div` with the following inline css styles:

- `overflow: 'hidden'`
- `verticalAlign: 'top'`
- `display: 'inline-block'`

You can specify additional properties for the wrapper element using the wrapperProps object.

| Property  | Type          | Description                                     | Default |
| :-------- | :------------ | :---------------------------------------------- | :------ |
| className | string        | Class name to be applied to the wrapper.        | -       |
| style     | CSSProperties | Inline CSS styles to be applied to the wrapper. | -       |

Here is an example of how you can wrap each individual character with a wrapper element and respective classes and inline styles:

```tsx
<SplitText
  mode={'char'}
  options={{ char: { wrapper: true, wrapperProps: { className: 'test', style: { color: 'red' } } } }}
>
  Lorem ipsum dolor sit amet
</SplitText>
```

TODO before v1 release

- playwright tests
- readme documentation
- framer motion compatibility (separate package using core react as a dependency) ???
