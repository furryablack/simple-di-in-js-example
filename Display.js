import { Injector } from './Injector.js';

Injector.injectable(Display);
export function Display() {

  this.print = (message) => {
    console.log(`display: ${message}`);
  }
}
