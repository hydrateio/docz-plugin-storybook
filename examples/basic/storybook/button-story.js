import React from 'react'
import { storiesOf } from '@storybook/react'
import Button, { StyledButton } from '../components/Button'

storiesOf('Button', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button>
      <span role={'img'} aria-label={'so cool'}>
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('Styled Components', module).add('with text', () => <StyledButton>Hello Button</StyledButton>)
