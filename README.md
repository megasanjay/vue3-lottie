# Vue 3 + TypeScript Library Template
A simple but complete library template for Vue 3 + TypeScript

## Getting started
Getting the code by `git clone` or click `Use this template` right above.

Then use `yarn` or other package manager to install dependencies.

## CSS
This template includes `Scss` with it. Scoped style in Vue SFC is also supported. All the styles will be build into a `index.css` right in the project root.

When using your library by npm package in another project, you can import this css by
```
import '{YOUR_LIB_NAME}/index.css'
```

## Dev server
The dev server is provided by `Vite`. To start the dev server, run

```
yarn dev
```

## Writing packages
Simply creating a folder in `packages` and add it to `packages/index.ts`, and it's done.

## Build your packages
```
yarn build
```

Will build your packages in two format ( `esm` and `CommonJS` ) using *rollup* instead of *Vite* due to the issue when generating `.d.ts` file.

Once everything done, you can pack your library by `npm pack` or publish it by `npm publish`

## External dependencies
If you want to exclude your dependencies from your build result:

1. Add the package to `peerDependencies` in `package.json`
2. Add the package to `external` in `rollup.config.js`

When using this library, remember to install these `peerDependencies`.

## About `d.ts`
TypeScript declaration files will generated into `lib` folder once you build this template. That means the decalration files will be published in the npm package.

Also, `.vue.d.ts` will be generated for Vue SFC.