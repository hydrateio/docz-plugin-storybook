# docz-plugin-storybook

> [Docz](https://www.docz.site) plugin that makes migrating from [Storybook](https://storybook.js.org) a breeze.

[![NPM](https://img.shields.io/npm/v/docz-plugin-storybook.svg)](https://www.npmjs.com/package/docz-plugin-storybook) [![Build Status](https://travis-ci.com/hydrateio/docz-plugin-storybook.svg?branch=master)](https://travis-ci.com/hydrateio/docz-plugin-storybook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Status

This module is an active WIP. [Hic Draconis](https://en.wikipedia.org/wiki/Here_be_dragons)

Steps:

- [x] create a minimal shim for `@storybook/react` focused on aggregating story metadata
- [x] alias `@storybook/react` to our custom shim
- [x] add docz webpack entry for loading stories client-side into our custom shim
- [x] support manual story rendering via docz mdx files
- [x] `Story` react component
- [ ] `Stories` react component
- [ ] add plugin option to automatically insert one virtual mdx entry for each story "kind"
- [ ] add docz webpack support for other loaders that storybook contains by default
- [ ] add support for custom storybook webpack configs
- [ ] add support for most popular storybook addons
- [ ] integration tests with various storybook fixtures
- [ ] example projects that showcase storybook to docz conversions

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
