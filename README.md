<h1>QnA</h1>
<h3>Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll</h3>

  1)getElementById() selects a single element using its unique ID and returns one element object.

  2)getElementsByClassName() selects elements by class name and returns a live HTMLCollection of matching elements.

  3)querySelector() uses a CSS selector and returns the first matching element.

  4)querySelectorAll() uses a CSS selector and returns a static NodeList of all matching elements.

<h3>How do you create and insert a new element into the DOM?</h3>

I create a new element using document.createElement(), add content using textContent or innerHTML, and insert it into the DOM using appendChild() or append().

<h3>What is Event Bubbling? How does it work?</h3>

Event Bubbling is a process where an event starts from the target element and then propagates upward through its parent elements up to the document.

<h3>What is Event Delegation? Why is it useful?</h3>

Event Delegation is a technique where a parent element handles events for its child elements using a single event listener. It improves performance, reduces memory usage, and works for dynamically added elements.

<h3>Difference between preventDefault() and stopPropagation()</h3>

preventDefault() stops the browser’s default behavior for an event.

stopPropagation() stops the event from propagating (bubbling) to parent elements.
