# docz-plugin-storybook

> [Docz](https://www.docz.site) plugin that makes migrating from [Storybook](https://storybook.js.org) a breeze.

[![NPM](https://img.shields.io/npm/v/docz-plugin-storybook.svg)](https://www.npmjs.com/package/docz-plugin-storybook) [![Build Status](https://travis-ci.com/hydrateio/docz-plugin-storybook.svg?branch=master)](https://travis-ci.com/hydrateio/docz-plugin-storybook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Overview

This plugin allows you to take any existing Storybook project and effortlessly view all of your stories in Docz.

#### Why?

Storybook's pretty great. Writing "stories" at the component level is a very powerful abstraction, and it has benefitted from enormous popularity within the React community.

Storybook does, however, have some flaws. The docs generally provide a great developer experience but are not ideal for design systems targeting designers or other business stakeholders. Storybook sites also tend to look pretty boring and you can't currently use MDX, a transformative technology that makes writing documentation *in addition to* component demos extremely fast and concise.

This is where [Docz](https://www.docz.site) comes in -- it's already a really popular project that allows developers to write better component docs faster.

Given the popularity of these two projects, we wanted to provide a simple bridge which allows you to **use existing Storybook stories from within Docz** just by installing a plugin.

## Features

- import and render existing stories in Docz
- zero config - **it just works** for 99% of Storybooks
- automatically populate Docz with all of your stories
- simple to use Docz alongside Storybook
- no need to replace Storybook or force devs to change their habits
- **the best of both worlds - Docz :heart: Storybook**

## Install

This module requires `node >= 6`.

```bash
npm install --save-dev docz docz-plugin-storybook
```

## Usage

Let's start with an existing project that uses Storybook.

1. Add docz to your project following the normal `docz` [getting started guide](https://www.docz.site/introduction/getting-started). You should now have blank docz docs alongside your existing storybook docs.

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

3. ~~Start docz and view all your existing stories that've been automatically imported -- complete with all the hot reloading and mdx goodness that makes Docz so great!~~ Once [#7](https://github.com/hydrateio/docz-plugin-storybook/issues/7) is resolved, all of your stories will automatically be populated within Docz. Until then, you'll need to manually render your stories within mdx files as the next section explains.

#### Manual Rendering

<!--
By default, `docz-plugin-storybook` adds all of your existing stories to Docz's navigation and page content so you get full docs, but if you'd like more fine-grained control, you can manually render stories from within any Docz `mdx` file.

To set this up, you'll want to disable the default functionality when initializing the plugin by passing `{ manual: true }`.

```js
// doczrc.js
import { storybook } from 'docz-plugin-storybook'

export default {
  plugins: [
    storybook({ manual: true })
  ]
}
```

-->

You can render any of your stories within Docz `mdx` files by using the `Story` or `Stories` React components.

```mdx
// button.mdx
---
name: Button
---

import { Story, Stories } from 'docz-plugin-storybook/dist/react'

## Render one Button story

<Story kind='Button' name='with text' />

## Render all Button stories

<Stories kind='Button' />
```

This would display all of the stories loaded from this example Storybook file:

```jsx
// button-story.js
import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../components/Button'

storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button>
      <span role={'img'} aria-label={'so cool'}>
        😀 😎 👍 💯
      </span>
    </Button>
  ))
```

The source files containing your stories can exist anywhere as long as they're loaded from Storybook's main entrypoint which defaults to `.storybook/config.js`.

Also note that these stories are loaded and exposed automagically by the plugin! 🤯

## FAQ

See [#11](https://github.com/hydrateio/docz-plugin-storybook/issues/11) for a detailed FAQ, including answers to why Docz and Storybook solve two different problems, how this plugin works, and how to customize your stories further.

## Status

See [#12](https://github.com/hydrateio/docz-plugin-storybook/issues/12) for a detailed breakdown of the current roadmap. In short, this module is stable and works well with manual Story rendering from within Docz, but automated docz population, story isolation, and custom webpack configs are an active WIP.

## Related

- [storybook](https://storybook.js.org) - The old component library framework.
- [docz](https://www.docz.site) - The new hotness based on [mdx](https://mdxjs.com).

## License

MIT © [Hydrate](https://hydrate.io)
