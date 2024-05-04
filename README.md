# Nucleobase

The `Nucleobase` class represents a `text` element within an SVG document
(with special functionality related to drawing nucleobases).

## constructor()

Receives an `SVGTextElement` instance as input.

The created nucleobase adopts the input SVG text element and acts as though it is the SVG text element.

```typescript
let textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

let b = new Nucleobase(textElement);
```

## domNode

A reference to the `SVGTextElement` instance that is the nucleobase.

```typescript
let textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
let b = new Nucleobase(textElement);

b.domNode === textElement // true
```
