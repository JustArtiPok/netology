import getBuffer from './js/getBuffer';
import ArrayBufferConverter from './js/ArrayBufferConverter';

const converter = new ArrayBufferConverter();
converter.load(getBuffer());
console.log(converter.toString());