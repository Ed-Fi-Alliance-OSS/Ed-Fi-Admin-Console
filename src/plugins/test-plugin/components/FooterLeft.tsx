import { BasePluginComponent } from '../../BasePluginComponent'

export const FooterLeftComponent = (props: typeof BasePluginComponent['FooterLeft']) => {
  return <div>Showing Component from Footer Left: MarginTop = {props.marginTop}, MarginBottom: {props.marginBottom}</div>
}
