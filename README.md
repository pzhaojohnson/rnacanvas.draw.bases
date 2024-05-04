# Nucleobase

The `Nucleobase` class represents a `text` element within an SVG document
(with special functionality related to drawing nucleobases).

## static create()

Creates a nucleobase with the specified text content.

```typescript
let b = Nucleobase.create('A');

b.textContent === 'A'; // true
```

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

b.domNode === textElement; // true
```

## getAttribute()

Get an attribute of the SVG text element that is the nucleobase.

```typescript
let b = Nucleobase.create('G');
b.domNode.setAttribute('fill', '#a62cf1');

b.getAttribute('fill') === '#a62cf1'; // true
```
