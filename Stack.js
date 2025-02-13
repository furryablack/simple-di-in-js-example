import { Display } from './Display.js';
import { Injector } from './Injector.js';

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

export { InjactedStack as Stack };
