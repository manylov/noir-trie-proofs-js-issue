# noir-trie-proof js issue

i've used very simple storage proof (placed in ./noir/main dir)

i've created ts script to generate proof with js. it fails.

## steps to reproduce

use noir 0.25.0

run

```
yarn
yarn dev
```

i got error:

```
Error [RuntimeError]: unreachable
    at wasm://wasm/01fd9442:wasm-function[17622]:0x78a386
    at wasm://wasm/01fd9442:wasm-function[223]:0x31f23
    at wasm://wasm/01fd9442:wasm-function[218]:0x31dac
    at wasm://wasm/01fd9442:wasm-function[181]:0x31048
    at BarretenbergWasmMain.call (/Users/maksimmanylov/dev/noir/noir-trie-proofs-js-issue/node_modules/@aztec/bb.js/src/barretenberg_wasm/barretenberg_wasm_base/index.ts:101:34)
    at BarretenbergWasmMain.callWasmExport (/Users/maksimmanylov/dev/noir/noir-trie-proofs-js-issue/node_modules/@aztec/bb.js/src/barretenberg_wasm/barretenberg_wasm_main/index.ts:109:10)
    at callback (/Users/maksimmanylov/dev/noir/noir-trie-proofs-js-issue/node_modules/comlink/src/comlink.ts:329:36)
    at MessagePort.l (/Users/maksimmanylov/dev/noir/noir-trie-proofs-js-issue/node_modules/@aztec/bb.js/src/barretenberg_wasm/helpers/node/node_endpoint.ts:12:11)
    at [nodejs.internal.kHybridDispatch] (node:internal/event_target:814:20)
    at exports.emitMessage (node:internal/per_context/messageport:23:28)
```
