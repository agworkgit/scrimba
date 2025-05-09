## 1. What does the `.map()` array method do? </br>

`.map()` returns a new array with elements transformed by the callback function, and it's especially useful in React for rendering lists of components dynamically.

## 2. What do we usually use `.map()` for in React? </br>

`.map()` helps in rendering JSX elements from data.

## 3. Critical thinking: why is using `.map()` better than just creating the components manually by typing them out? </br>

-   `.map()` helps with dynamic data that might change over time making your code more adaptable which keeps it clean and effiecient.
-   We often don't have the data ahead of time when we're building
    the app, so we simply can't manually type them out.
-   It makes our code more "self-sustaining" - not requiring additional
    changes to the code whenever the data changes.
