import {
  forOwn, merge, pickBy, set,
} from 'lodash-es'

export const mergeEnvVars = (defaultConf) => {
  const combinedConfig = merge(defaultConf, {})
  const envVars = pickBy(process.env, (_, a) => a?.startsWith('EG_') && a?.includes('__'))

  forOwn(envVars, (v, k) => {
    set(combinedConfig, k?.replace('EG_', '').replace(/__/gm, '.'), v)
  })

  return combinedConfig
}