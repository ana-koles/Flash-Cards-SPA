import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import { MemoryRouter } from 'react-router-dom'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => {
      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      )
    },
  ],
}

export default preview
