const { Injector } = require('./Injector');

Injector.injectable(Display);
function Display() {

  this.print = (message) => {
    console.log(`display: ${message}`);
  }
}

module.exports.Display = Display;
