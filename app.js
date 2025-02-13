const { Stack } = require('./Stack');

const stack = new Stack(3);

console.log('stack.limit', stack.limit)
stack.ping();
stack.printLimit();