import React from 'react'
import { storiesOf } from '@storybook/react'
import Button, { StyledButton } from '../components/Button'

storiesOf('Button', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button>
      <style>{'* { font-size: 24px; }'}</style>
      <span role={'img'} aria-label={'so cool'}>
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add('with styled components', () => <StyledButton>I'm styled!</StyledButton>)
