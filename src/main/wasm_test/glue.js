const WasmAdder = require('./libadd.js');

let add, malloc, free;

const wait = new Promise(done => {
  WasmAdder().then(Module => {
    malloc = Module._malloc;
    free = Module._free;
    add = Module.cwrap('add2', 'number', ['number', 'number']);
    done();
  });
});

exports.add2wasm = function add2wasm(x, y) {
  return wait.then(() => { return add(x, y); });
}