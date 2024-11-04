export const BasePluginComponent = {
  'HeaderRight': {
    headerBg: 'white' as string | undefined
  },
  'FooterLeft': {
    marginTop: 5,
    marginBottom: 5
  },
}

export const EmptyComponents = Object.keys(BasePluginComponent).reduce((acc, key) => ({...acc, [key]: () => <div>{'{'}{key}{'}'}</div>}), {})

export type BasePluginComponentNames = keyof typeof BasePluginComponent