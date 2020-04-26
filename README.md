# Shadow-cljs WASM example

Minimal project to demonstrate the usage of a WASM module in Shadow-cljs.

## Environment setup

`npm install`


## Development build

- js: `npx babel src/js --out-dir resources/gen --source-maps inline --watch`
- cljs: `npx shadow-cljs watch app`

the default website is at http://localhost:8844

### WARNING: recent shadow-cljs 

Please note that recent versions of `shadow-cljs` (> 2.8.101) break this setup, reporting the following error during compilation:
```
The required JS dependency "fs" is not available, it was required by "libadd.js".

Dependency Trace:
	core.cljs
	glue.js
	libadd.js

Searched for npm packages in:
	/Users/bru/Code/bear/research/wasm-shadow/node_modules

See: https://shadow-cljs.github.io/docs/UsersGuide.html#npm-install
```


## WASM build

The C source file is at `src/c/add2.c`; it contains just one function:


```c
int add2(int a, int b) {
  return a + b;
}
```

**Note**: for simplicity, the wasm file (and its loader js code) are already committed in the repository.

To compile the C code to wasm (for example if you want to test the setup with a more complex C program) you will first of all need a working [emsdk environment](https://emscripten.org/docs/getting_started/Tutorial.html); Once you do, use the following command line to compile your C file(s):

`EMCC_ONLY_FORCED_STDLIBS=1 emcc -O3 -Os -s EXTRA_EXPORTED_RUNTIME_METHODS="['cwrap']" -s INVOKE_RUN=0 -s EXPORT_ALL=1 -s MODULARIZE=1 -s FILESYSTEM=0 -s WASM=1 -s LINKABLE=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0 -o libadd.js add2.c`

This will generate two files: `libadd.js` and `libadd.wasm`.
`libadd.wasm` goes into `resources/public/sasets/app/js` while `libadd.js` goes into `resources/wasm`.
