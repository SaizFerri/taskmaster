import { setup, type Preview } from '@storybook/vue3'
import { createPinia } from 'pinia'
import '../src/assets/base.css'
import { App } from 'vue'
import setupRouter from '../src/router'

const pinia = createPinia()

setup((app: App) => {
  app.use(pinia)
  app.use(setupRouter())
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
