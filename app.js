import { Stack } from './Stack.js';

const stack = new Stack(3);

console.log('stack.limit', stack.limit) // stack.limit 3

// Stack method
stack.ping(); // ping

// Stack object uses Display service injected into the Stack constructor
stack.printLimit(); // display: limit 3

// Original Stack constructor didn't loose
console.log(Stack.prototype.constructor.name); // Stack