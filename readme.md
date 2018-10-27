# docz-plugin-storybook

> [Docz](https://www.docz.site) plugin that makes migrating from [Storybook](https://storybook.js.org) a breeze.

[![NPM](https://img.shields.io/npm/v/docz-plugin-storybook.svg)](https://www.npmjs.com/package/docz-plugin-storybook) [![Build Status](https://travis-ci.com/hydrateio/docz-plugin-storybook.svg?branch=master)](https://travis-ci.com/hydrateio/docz-plugin-storybook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Status

This module is an active WIP. [Hic Draconis](https://en.wikipedia.org/wiki/Here_be_dragons)

Steps:

- [x] create a minimal shim for `@storybook/react` focused on aggregating story metadata
- [x] alias `@storybook/react` to our custom shim
- [x] add docz webpack entry for loading stories client-side into our custom shim
- [x] `Story` react component
- [x] `Stories` react component
- [ ] wrap `Story` in an iframe to mimic storybook environment as closely as possible
- [ ] ensure `Story` is rerendered if story changes during hot reload
- [x] support explicit story rendering via docz mdx files
- [ ] support implicit / automatic storybook rendering (plugin option to insert one virtual mdx entry for each story "kind")
- [ ] add docz webpack support for other loaders that storybook contains by default (eg, css)
- [ ] add support for custom storybook webpack configs
- [ ] add support for most popular storybook addons
- [ ] integration tests with various storybook fixtures
- [ ] example projects that showcase the storybook to docz conversion

- [ ] would like a way to add a docz anchor and link to Stories children so each Story `<h2>` is linked in the primary nav

## Install

This module requires `node >= 8`.

```bash
npm install --save-dev docz-plugin-storybook
```

## Usage

Add the plugin to your `doczrc.js`:

```js
// doczrc.js
import { storybook } from 'docz-plugin-storybook'

export default {
  plugins: [
    storybook()
  ]
}
```

That's it 🙌🏻

## Related

- [storybook](https://storybook.js.org) - The old component library framework.
- [docz](https://www.docz.site) - The new hotness based on [mdx](https://mdxjs.com).

## License

MIT © [Hydrate](https://hydrate.io)
