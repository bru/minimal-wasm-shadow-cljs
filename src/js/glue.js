import WasmAdder from '/libadd.js';

let add;

const wait = new Promise(done => {
  WasmAdder().then(Module => {
    add = Module.cwrap('add2', 'number', ['number', 'number']);
    done();
  });
});

export function add2wasm(x, y) {
  return wait.then(() => { return add(x, y); });
}