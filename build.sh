#!/usr/bin/env sh

## place the wasm file in the assets folder
mkdir -p public/assets/app/js/
cp resources/wasm/libadd.wasm public/assets/app/js/

## babelify the glue js to please GCC
npx babel src/js --out-dir resources/gen --source-maps inline

## launch shadow-cljs
npx shadow-cljs watch app