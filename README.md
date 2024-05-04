# Nucleobase

The `Nucleobase` class represents a `text` element within an SVG document
(with special functionality related to drawing nucleobases).

## constructor

Receives an `SVGTextElement` instance as input.

The resulting nucleobase adopts the input SVG text element and acts as though it is the SVG text element.

```typescript
let textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text);

let b = new Nucleobase(textElement);
```
