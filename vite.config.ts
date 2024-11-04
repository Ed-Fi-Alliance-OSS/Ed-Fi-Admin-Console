import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import defaultConfig from './app.config.json' assert { type: 'json' }
import { mergeEnvVars } from './merge-env-vars.mjs'
import mdx from '@mdx-js/rollup'


export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const envConfig = mergeEnvVars(defaultConfig)
  return {
    base: (isProd && envConfig.app.basePath) ? `${envConfig.app.basePath}/` : './',
    server: {
      port: +(process.env.PORT || 8598)
    },
    plugins: [
      {mode: 'pre', ...mdx({
        include: 'src/docs/**/*.md',
      })},
      react()
    ]
  }
})