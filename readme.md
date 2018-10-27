# docz-plugin-storybook

> [Docz](https://www.docz.site) plugin that makes migrating from [Storybook](https://storybook.js.org) a breeze.

[![NPM](https://img.shields.io/npm/v/docz-plugin-storybook.svg)](https://www.npmjs.com/package/docz-plugin-storybook) [![Build Status](https://travis-ci.com/hydrateio/docz-plugin-storybook.svg?branch=master)](https://travis-ci.com/hydrateio/docz-plugin-storybook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Overview

This plugin allows you to take any existing Storybook project and effortlessly view all of your stories in Docz.

#### Why?

There's no doubt that Storybook's been a very successful project. The notion of writing "stories" at the component level is a very powerful abstraction and it has benefitted from enormous popularity within the React, Vue, and Angular communities.

Storybook does have some flaws, however; the docs generally provide a great experience for developers but often not ideal for designers and other stakeholders. Storybook sites tend to look pretty meh and you can't currently use MDX, a transformative technology that makes writing documentation *in addiition to* including component demos extremely fast and concise.

This is where [Docz](https://www.docz.site) comes in -- it's already a really popular project that allows delopers to write betteer component docs faster.

Given the popularity of these two projects, we wanted to provide a simple bridge which allows you to use **existing Storybook stories from within Docz** just by installing a simple plugin**. The best of both worlds!**

## Features

- import and render existing stories in Docz mdx
- zero config - **it just works** for 99% of existing Storybooks
- automatically populates Docz's contents with existing stories
- simple to use Docz alongside Storybook
- no need to replace Storybook or force devs to change their processes
- **the best of both worlds: Storybook :heart: Docz**

## Install

This module requires `node >= 8`.

```bash
npm install --save-dev docz docz-plugin-storybook
```

## Usage

Let's say you have a Storyboook project.

1. Add docz to your project following the normal `docz` [getting started guide]().

2. Add the plugin to your `doczrc.js`

```js
// doczrc.js
import { storybook } from 'docz-plugin-storybook'

export default {
  plugins: [
    storybook()
  ]
}
```

3. Start docz and view all your existing stories that've been magically imported -- complete with all the hot reloading and mdx goodness that Docz such a great developer experience!

#### Manual Rendering

By default, `docz-plugin-storybook` adds all of your existing stories to Docz's navigation and page content so you get full docs, but if you'd like more fine-grained control, you can manually render stories from within any Docz `mdx` file.

To set this up, you'll want to disable the default functionality when initializing the plugin by passing `{ manual: true }`:

```js
// doczrc.js
import { storybook } from 'docz-plugin-storybook'

export default {
  plugins: [
    storybook({ manual: true })
  ]
}
```

You can then render any of your stories within Docz `mdx` files by using the `Story` or `Stories` React components.

```mdx
// button.mdx
---
name: Button
---

import { Story, Stories } from 'docz-plugin-storybook/dist/react'

You can augment your stories with any markdown or other components.

## Story 'with text'

<Story kind='Button' name='with text' />

## Stories

This will render all the stories that have been defined for the `Button` component.

<Stories kind='Button' />
```

Which will display stories loaded from this example Storybook file:

```jsx
import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../components/Button'

storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button</Button>i
  ))
  .add('with some emoji', () => (
    <Button>
      <span role={'img'} aria-label={'so cool'}>
        😀 😎 👍 💯
      </span>
    </Button>
  ))
```

Note that `button-story.js` can exist anywhere in your source as long as it's loaded from Storybook's main entrypoint which defaults to `.storybook/config.js`.

Also note that these stories are loaded an found automagically by the plugin :whoa:

## How does it work?

This plugin performs its magic with a few key steps:

1. Add the storybook entrypoint as an additional webpack entry in Docz's config
2. Alias `@storybook/react` to a minimal shim that replaces Storybook's built-in UX with logic to aggregate story metadata as their `storiesOf` and `.add` are called. This shim matches `@storybook/react`'s public exports exactly, so any existing Storybook code will continue to work.
3. Docz's client-side code executes which initializes our store of all stories.
4. In the case of automatic rendering, we take all of the aggregated stories and add them to Docz's contents which have so far been populated via server-side MDX parsing.
5. In the case of manual rendering, whenever a `Story` or multiple `Stories` are rendered, these components look up the target stories in our story store and invoke their renderer which is normal React that plays well with mdx.
6. Profit!

## Status

This module is stable but some Storybook addons and webpack customizations will take extra steps to get working from within Docz.

#### Roadmap

- [x] create a minimal shim for `@storybook/react` that just aggregates story metadata
- [x] alias `@storybook/react` to our custom shim
- [x] add docz webpack entry for loading stories client-side into our custom shim
- [x] `Story` react component
- [x] `Stories` react component
- [ ] wrap `Story` in an iframe to mimic storybook environment as closely as possible
- [ ] ensure `Story` is rerendered if its story changes during hot reload
- [x] support explicit / manual story rendering within docz mdx files
- [ ] support implicit / automatic storybook rendering (plugin option to insert one virtual mdx entry for each story "kind")
- [ ] add docz webpack support for other loaders that storybook contains by default (eg, css)
- [ ] add support for custom storybook webpack configs
- [ ] add support for most popular storybook addons
- [ ] integration tests with various storybook fixtures
- [ ] example projects that showcase the storybook to docz conversion
- [ ] would like a way to add a docz anchor and link to Stories children so each Story `<h2>` is linked in the primary nav

## Related

- [storybook](https://storybook.js.org) - The old component library framework.
- [docz](https://www.docz.site) - The new hotness based on [mdx](https://mdxjs.com).

## License

MIT © [Hydrate](https://hydrate.io)
