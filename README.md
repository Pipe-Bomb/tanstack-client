<h1>
    <img src="https://raw.githubusercontent.com/Pipe-Bomb/.github/refs/heads/master/assets/logos/Pipe%20Bomb%20no%20background%20w%20outline.png" width="40" />
    TanStack Query Pipe BombAPI Client
</h1>

This library is largely automatically generated from Pipe Bomb's [OpenAPI schema](https://github.com/Pipe-Bomb/openapi-spec) using [Orval](https://orval.dev).

## Getting Started

Import the library into your project:

```bash
npm i github:pipe-bomb/tanstack-client
```

Imports are then available under the package name `pipe-bomb-tanstack-client`. Before use, however, you should set the URL of your Pipe Bomb server. An easy way to do this is to create a proxy file:

**api.ts**

```ts
import { setBaseUrl } from "pipe-bomb-tanstack-client";

setBaseUrl("https://api.pipebomb.net");

// re-export the whole library. Using the client from this file guarantees that "setBaseUrl" is called first.
export * from "pipe-bomb-tanstack-client";
```
