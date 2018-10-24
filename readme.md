# docz-plugin-storybook

> [Docz](https://www.docz.site) plugin that makes migrating from [Storybook](https://storybook.js.org) a breeze.

[![NPM](https://img.shields.io/npm/v/docz-plugin-storybook.svg)](https://www.npmjs.com/package/docz-plugin-storybook) [![Build Status](https://travis-ci.com/hydrateio/docz-plugin-storybook.svg?branch=master)](https://travis-ci.com/hydrateio/docz-plugin-storybook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Status

This module is an active WIP. [Hic Draconis](https://en.wikipedia.org/wiki/Here_be_dragons)

Steps:

- [x] alias `@storybook/react` to custom shim
- [ ] add one virtual mdx file for each source storybook file
- [ ] test with basic storybook fixtures
- [ ] example [project](https://github.com/hydrateio/storybook-to-docz) that showcases the storybook to docz conversion

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
