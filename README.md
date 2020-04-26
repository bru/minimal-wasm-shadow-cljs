# Shadow-cljs WASM example

Minimal project to demonstrate the usage of a WASM module in Shadow-cljs.

## Environment setup

`npm install`


## Development build

- cljs: `npx shadow-cljs watch app`

the default website is at http://localhost:8844

## WASM build

The C source file is at `src/c/add2.c`; it contains just one function:

```c
int add2(int a, int b) {
  return a + b;
}
```

To compile it to wasm, assuming you have the `emsdk` environment setup correctly, use the following command line:

`EMCC_ONLY_FORCED_STDLIBS=1 emcc -O3 -Os -s EXTRA_EXPORTED_RUNTIME_METHODS="['cwrap']" -s INVOKE_RUN=0 -s EXPORT_ALL=1 -s MODULARIZE=1 -s FILESYSTEM=0 -s WASM=1 -s LINKABLE=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0 -o libadd.js add2.c`

Then `libadd.wasm` goes into `resources/public/sasets/app/js` while `libadd.js` goes into `resources/wasm`
