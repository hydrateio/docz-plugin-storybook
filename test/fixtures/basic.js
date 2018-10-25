import React from 'react'
import { storiesOf } from '../../src/storybook-react-client-shim'
import Button from './Button'

storiesOf('Button', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button>
      <span role={'img'} aria-label={'so cool'}>
        😀 😎 👍 💯
      </span>
    </Button>
  ))
