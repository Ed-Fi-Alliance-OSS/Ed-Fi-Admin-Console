import { defaultsDeep, get, hasIn } from 'lodash-es'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { BasePluginComponent, BasePluginComponentNames, EmptyComponents } from './BasePluginComponent'
import { BasePluginFunction, BasePluginFunctionNames } from './BasePluginFunction'
import { BasePluginStrings, BasePluginStringsKeys, StringsShape } from './BasePluginStrings'
// Load all plugins inside the plugins folder
export function loadPlugins() {
  const plugins = import.meta.glob('./*/plugin.tsx', {eager: true})
  return Object.values(plugins).map((module: any) => module.default as BasePlugin)
}

type componentType = { [K in BasePluginComponentNames]: React.FC<typeof BasePluginComponent[K]> }
type functionType = { [K in BasePluginFunctionNames]?: (...args: BasePluginFunction[K]) => void | unknown }

export interface RegistryState {
  components: componentType;
  functionalities: functionType;
  strings: StringsShape;
  getString: (key: BasePluginStringsKeys) => string;
  registerStrings: (strings: StringsShape) => void;
  registerComponent: <K extends keyof typeof BasePluginComponent>(
    name: K,
    component: React.FC<typeof BasePluginComponent[K]>
  ) => void;
  registerFunctionality: <K extends BasePluginFunctionNames>(
    name: K,
    functionality: (...args: BasePluginFunction[K]) => void
  ) => void;
}

const PluginContext = createContext<RegistryState | undefined>(undefined)

export const PluginProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [components, setComponents] = useState<componentType>(EmptyComponents as componentType)
  const [functionalities, setFunctionalities] = useState<functionType>({})
  const [strings, setStrings] = useState({})

  const registerComponent: RegistryState['registerComponent'] = (name, component) => {
    setComponents((prev) => ({...prev, [name]: (props: typeof BasePluginComponent[typeof name]) => {
      const Component = component
      const defaultProps = BasePluginComponent[name]
      return <Component {...defaultProps} {...props} />
    }}))
  }

  // Register a functionality with the specific function signature
  const registerFunctionality: RegistryState['registerFunctionality'] = (name, functionality) => {
    setFunctionalities((prev) => ({...prev, [name]: functionality}))
  }

  const registerStrings = (pluginStrings: StringsShape) => {
    setStrings((prev) => defaultsDeep(pluginStrings, prev))
  }

  const getString = (key: BasePluginStringsKeys) => {
    if(hasIn(strings, key)) {
      return get(strings, key).toString()
    }
    return '-UNDEFINED-'
  }

  const registry: RegistryState = {
    components,
    functionalities,
    strings,
    getString,
    registerStrings,
    registerComponent,
    registerFunctionality
  }

  return (
    <PluginContext.Provider value={registry}>
      {children}
    </PluginContext.Provider>
  )
}

export const usePluginContext = () => {
  const context = useContext(PluginContext)
  if (!context) {
    throw new Error('usePluginContext must be used within a PluginProvider')
  }
  return context
}


export interface BasePlugin {
  name: string;
  strings?: StringsShape;
  register: (registry: RegistryState) => void;
}

interface PluginLoaderProps {
  plugins: BasePlugin[];
  enabled: string[];
}

export const PluginLoader: React.FC<PluginLoaderProps> = ({plugins, enabled}) => {

  const registry = usePluginContext()

  useEffect(() => {
    console.debug('Loading Base Strings')
    registry.registerStrings(BasePluginStrings)
  }, [BasePluginStrings])

  useEffect(() => {
    console.debug('Loading plugins')
    console.debug('Detected Plugins:', plugins.map(p => p.name))

    const toRegister = plugins.filter((plugin) => enabled.includes(plugin.name))

    console.debug('Registered Plugins:', toRegister.map(p => p.name))
    toRegister.forEach((plugin) => {
      plugin.register(registry)
      if(plugin.strings) {
        console.debug('Registering String', plugin.strings)
        registry.registerStrings(plugin.strings)
      }
    })

    const notFound = enabled.filter((plugin) => !plugins.map(p => p.name).includes(plugin))
    if(notFound.length > 0) {
      console.error('Plugins Not Found:', notFound)
    }

  }, [enabled, plugins])

  return null
}