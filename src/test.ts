import * as funcs from './functions';

let testFunc = (color: string) => console.log(`${color} - ${funcs.IsValidColor(color as string)}`);

testFunc("#FFF"); // expected true
testFunc("#FFFFFF"); // expected true
testFunc("rgb(255, 255, 255)"); // expected true
testFunc("rgba(255, 255, 255, 0.5)"); // expected true
testFunc("#FF");  // expected false
testFunc("#FFFFF");  // expected false
testFunc("mhm zelo testno"); // expected false