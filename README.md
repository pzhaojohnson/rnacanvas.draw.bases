# Installation

With `npm`:

```
npm install @rnacanvas/draw.bases
```

# The `Nucleobase` class

Represents a `text` element within an SVG document that is a nucleobase.

To use:

```typescript
import { Nucleobase } from '@rnacanvas/draw.bases';
```

## `static create()`

Creates a nucleobase with the specified text content.

This method will also apply default values to the created nucleobase
and assign it a UUID.

(It is necessary for all elements to have a unique ID
when saving an RNAcanvas drawing.)

```typescript
let b = Nucleobase.create('A');

b.textContent === 'A'; // true
```

## `constructor()`

Receives an `SVGTextElement` instance as input.

The created nucleobase "adopts" the input SVG text element and behaves as though it is the SVG text element.

```typescript
let textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

let b = new Nucleobase(textElement);
```

## `domNode`

A reference to the `SVGTextElement` instance that is the nucleobase.

```typescript
let textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
let b = new Nucleobase(textElement);

b.domNode === textElement; // true
```

## `appendTo()`

Appends the text element that is the nucleobase to the given container node.

```typescript
let svgDoc = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

let b = Nucleobase.create('A');
b.appendTo(svgDoc);

svgDoc.contains(b.domNode); // true
```

## `remove()`

Removes the text element that is the nucleobase from any parent container node that it is in.

This method does nothing if the text element does not have a parent container node.

```typescript
let svgDoc = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
let b = Nucleobase.create('G');

b.appendTo(svgDoc);
svgDoc.contains(b.domNode); // true

b.remove();
svgDoc.contains(b.domNode); // false
```

## `isIn()`

Returns `true` if the text element that is the nucleobase is a child
(or grandchild, great-grandchild, etc.) of the given node.

Returns `false` otherwise, including when input the text element itself.

```typescript
let svgDoc = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

let b = Nucleobase.create('U');
b.appendTo(svgDoc);

b.isIn(svgDoc); // true
b.isIn(b.domNode); // false
```

## `getAttribute()`

Get an attribute of the SVG text element that is the nucleobase.

```typescript
nucleobase.domNode.setAttribute('fill', '#a62cf1');

nucleobase.getAttribute('fill') === '#a62cf1'; // true
```

## `setAttribute()`

Set an attribute of the SVG text element that is the nucleobase.

```typescript
nucleobase.setAttribute('fill', '#b28ccf');

nucleobase.domNode.getAttribute('fill') === '#b28ccf'; // true
```

## `setAttributes()`

Set multiple attributes of the SVG text element that is the nucleobase at once
using an object of attribute values keyed by attribute name.

Invalid inputs are ignored. (This method is not supposed to throw.)

```typescript
nucleobase.setAttributes({ 'font-family': 'Comic Sans', 'fill': '#fa391c' });

nucleobase.domNode.getAttribute('font-family') === 'Comic Sans'; // true
nucleobase.domNode.getAttribute('fill') === '#fa391c'; // true
```

## `id`

The `id` attribute of the text element that is the nucleobase.

(More precisely, returns that which is returned by the `id` property of the text element.)

```typescript
nucleobase.domNode.setAttribute('id', 'text-123456');

nucleobase.id === 'text-123456'; // true
```

## `assignUUID()`

Creates and assigns a new UUID to the text element that is the nucleobase.

This method will overwrite any existing ID that the nucleobase has.

The assigned UUID might also have some letters prepended to it
(since all SVG element IDs must start with a letter),
resulting in the assigned UUID having more than 36 characters.

```typescript
nucleobase.assignUUID();
```

## `textContent`

The text content of the text element that is the nucleobase.

(More precisely, returns that which is returned by the `textContent` property of the text element.)

```typescript
nucleobase.domNode.textContent = 'R';

nucleobase.textContent === 'R'; // true
```

## `bbox`

The bounding box of the text element that is the nucleobase.

Essentially, just forwards the values returned by the underlying `getBBox` method.

```typescript
nucleobase.bbox; // a box with X and Y coordinates and width and height
```

## `centerPoint`

The center point of the bounding box of the nucleobase.

Setting this will move the nucleobase.

```typescript
// will recenter the nucleobase at coordinates (92, -112)
nucleobase.centerPoint = { x: 92, y: -112 };
```

## `getCenterPoint()`

A simple getter method for the center point of the nucleobase.

```typescript
nucleobase.getCenterPoint();
```

## `setCenterPoint()`

A simple setter method for the center point of the nucleobase.

```typescript
nucleobase.setCenterPoint({ x: 92, y: 178 });
```

## `addEventListener()`

For listening for events on the nucleobase.

### Listening for move events

Move events are defined as occurring when either the `x` or `y` attributes of the text element that is the nucleobase are changed.

Note that this definition does not include other changes that might change where the nucleobase appears on screen
(e.g., transforms).

```typescript
let listener = () => attachedElement.reposition();

nucleobase.addEventListener('move', listener);
```
