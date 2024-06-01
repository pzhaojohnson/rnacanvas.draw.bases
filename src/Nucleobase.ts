import * as SVG from '@svgdotjs/svg.js';

import { assignUUID } from '@rnacanvas/draw.svg';

import { bringToFront, sendToBack } from '@rnacanvas/draw.svg';

import { mean } from '@rnacanvas/math';

/**
 * A two-dimensional point.
 */
export type Point = {
  x: number;
  y: number;
};

type Box = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

/**
 * Move events are defined as occurring when either the `x` or `y` attributes
 * of the text element that is a nucleobase are changed.
 *
 * Note that by this definition things like transforms and changes to CSS styles
 * are not considered move events.
 */
type MoveEventName = 'move';

/**
 * The name of an event on a nucleobase.
 */
type EventName = (
  MoveEventName
);

interface EventListener {
  (): void;
}

type EventListeners = {
  'move': EventListener[];
};

/**
 * A nucleobase in a two-dimensional nucleic acid structure drawing.
 */
export class Nucleobase {
  /**
   * Default attributes to create new nucleobases with.
   */
  static defaultAttributes = {
    'font-family': 'Arial',
    'font-size': '9',
    'font-weight': '700',
  };

  /**
   * Should match the keys of the default attributes object.
   */
  static readonly defaultAttributeNames = [
    'font-family',
    'font-size',
    'font-weight',
  ] as const;

  /**
   * Creates a nucleobase with the given text content
   * (and with default attributes).
   */
  static create(textContent: string): Nucleobase {
    let textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.textContent = textContent;

    let b = new Nucleobase(textElement);

    // all nucleobases must have a unique ID to be recreatable
    // (when reopening a saved drawing, for instance)
    b.assignUUID();

    b.setAttributes(Nucleobase.defaultAttributes);

    return b;
  }

  private eventListeners: EventListeners = {
    'move': [],
  };

  /**
   * Note that this constructor will not modify the input text element in any way
   * (e.g., won't set attributes to default values).
   *
   * @param textElement The text element that is the nucleobase.
   */
  constructor(private textElement: SVGTextElement) {
    let movementObserver = new MutationObserver(() => this.callEventListeners('move'));
    movementObserver.observe(textElement, { attributes: true, attributeFilter: ['x', 'y'] });
  }

  /**
   * The actual DOM node of the text element that is the nucleobase.
   */
  get domNode() {
    return this.textElement;
  }

  /**
   * Appends the text element that is the nucleobase to the given container node.
   */
  appendTo(container: Node): void {
    container.appendChild(this.domNode);
  }

  /**
   * Removes the text element that is the nucleobase from its parent container node.
   *
   * Has no effect if the nucleobase (text element) was not a child of a parent container node to begin with.
   */
  remove(): void {
    this.domNode.remove();
  }

  /**
   * Returns true if the given node is a parent (or grandparent, great-grandparent, etc.)
   * of the text element that is the nucleobase.
   *
   * Returns false otherwise, including for the nucleobase (text element) itself.
   */
  isIn(container: Node): boolean {
    return container.contains(this.domNode) && container !== this.domNode;
  }

  /**
   * Returns true if the text element that is the nucleobase is a child of any sort of parent container node.
   *
   * Returns false otherwise.
   */
  hasParent(): boolean {
    return this.domNode.parentNode ? true : false;
  }

  /**
   * Makes the text element that is the nucleobase the last child of its immediate parent node.
   *
   * Has no effect if the text element that is the nucleobase has no parent node.
   *
   * Note that if the immediate parent node is not the root SVG document
   * (e.g., the nucleobase is in a group), then the nucleobase is only made the last child
   * of its immediate parent node (and not of the root SVG document).
   */
  bringToFront(): void {
    bringToFront(this.domNode);
  }

  /**
   * Makes the text element that is the nucleobase the first child of its immediate parent node.
   *
   * Has no effect if the text element that is the nucleobase has no parent node.
   *
   * Note that if the immediate parent node is not the root SVG document
   * (e.g., the nucleobase is in a group), then the nucleobase is only made the first child
   * of its immediate parent node (and not of the root SVG document).
   */
  sendToBack(): void {
    sendToBack(this.domNode);
  }

  /**
   * Get an attribute of the text element that is the nucleobase.
   */
  getAttribute(name: string) {
    return this.domNode.getAttribute(name);
  }

  /**
   * Set an attribute of the text element that is the nucleobase.
   */
  setAttribute(name: string, value: string): void {
    this.domNode.setAttribute(name, value);
  }

  /**
   * Set attributes of the text element that is the nucleobase
   * using an object of attribute values keyed by attribute name.
   *
   * This method simply ignores invalid inputs.
   */
  setAttributes(attributes: { [name: string]: unknown } | unknown): void {
    try {
      (new SVG.Text(this.domNode)).attr(attributes as any);
    } catch {}
  }

  /**
   * The ID of the text element that is the nucleobase.
   */
  get id() {
    // don't use the `id` method provided by the SVG.js library for SVG elements
    // (since it will auto-initialize the IDs of SVG elements)
    return this.domNode.id;
  }

  /**
   * Assigns a UUID to the nucleobase.
   *
   * (Overwrites any preexisting ID that the nucleobase had.)
   */
  assignUUID(): void {
    assignUUID(this.domNode);
  }

  /**
   * The text content of the text element that is the nucleobase.
   */
  get textContent() {
    return this.domNode.textContent;
  }

  set textContent(textContent) {
    this.domNode.textContent = textContent;
  }

  /**
   * Returns the bounding box of the text element that is the nucleobase.
   */
  get bbox(): Box {
    return this.domNode.getBBox();
  }

  /**
   * The center point of the nucleobase (in the coordinate system of its parent SVG document).
   */
  get centerPoint(): Point {
    let { cx, cy } = (new SVG.Text(this.domNode)).bbox();

    return { x: cx, y: cy };
  }

  set centerPoint(p) {
    (new SVG.Text(this.domNode)).center(p.x, p.y);
  }

  getCenterPoint() {
    return this.centerPoint;
  }

  setCenterPoint(p: Point): void {
    this.centerPoint = p;
  }

  /**
   * Caches the center point of the nucleobase,
   * calls the provided callback function,
   * and then restores the center point of the nucleobase to the cached center point.
   *
   * Is useful when making edits to a nucleobase (e.g., changing font attributes and text content)
   * and one wants to maintain the center point of the nucleobase.
   */
  maintainingCenterPoint(callbackFn: () => void): void {
    // cache the center point
    let centerPoint = this.centerPoint;

    callbackFn();

    // restore the center point
    this.centerPoint = centerPoint;
  }

  /**
   * Returns the bounding client rect of the text element that is the nucleobase
   * (i.e., will return a box with the same values as that returned by the `getBoundingClientRect` method).
   */
  get boundingClientRect(): Box {
    return this.domNode.getBoundingClientRect();
  }

  /**
   * The center point of the nucleobase in the client coordinate system
   * (i.e., the same coordinate system used by methods such as `getBoundingClientRect`).
   */
  get centerClientPoint(): Point {
    let boundingClientRect = this.domNode.getBoundingClientRect();

    return {
      x: mean([boundingClientRect.left, boundingClientRect.right]),
      y: mean([boundingClientRect.top, boundingClientRect.bottom]),
    };
  }

  getCenterClientPoint() {
    return this.centerClientPoint;
  }

  /**
   * Adds a listener for the specified event on the nucleobase.
   */
  addEventListener(eventName: EventName, listener: EventListener): void {
    this.eventListeners[eventName].push(listener);
  }

  /**
   * Calls all event listeners for the specified event.
   */
  private callEventListeners(eventName: EventName): void {
    this.eventListeners[eventName].forEach(listener => listener());
  }
}
