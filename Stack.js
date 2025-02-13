const { Display } = require('./Display');
const { Injector } = require('./Injector');

const stackFactories = [
  Injector.factory(Display),
];

const InjactedStack = Injector.inject(Stack, stackFactories);

function Stack(limit = 1) {

  this.limit = limit;  

  this.ping = () => {
    console.log('ping');
  }

  this.printLimit = () => {
    this.display.print(`limit ${this.limit}`);
  }
}

module.exports.Stack = InjactedStack;
