import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react-swc'
import 'dotenv/config'
import { defineConfig } from 'vite'
import defaultConfig from './app.config.json' assert { type: 'json' }
import { mergeEnvVars } from './merge-env-vars.mjs'


export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const envConfig = mergeEnvVars(defaultConfig)
  return {
    base: (isProd && envConfig.app.basePath) ? `${envConfig.app.basePath}/` : '/',
    css: { preprocessorOptions: { scss: { api: 'modern' } } },
    server: { port: +(process.env.PORT || 8598) },
    plugins: [
      {
        mode: 'pre',
        ...mdx({ include: 'src/docs/**/*.md', }) 
      },
      react()
    ]
  }
})