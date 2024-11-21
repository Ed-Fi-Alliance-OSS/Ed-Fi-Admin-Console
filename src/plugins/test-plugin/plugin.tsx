import { BasePlugin } from '../BasePlugin'
import { FooterLeftComponent } from './components/FooterLeft'
import { GetOrganisations } from './functions/GetOrganizations'

export default {
  name: 'test-plugin',
  strings: { 'app': { 'ODS_INSTANCES': 'ODS Instances', } },
  register: (registry) => {
    registry.registerComponent('FooterLeft', FooterLeftComponent)
    registry.registerFunctionality('GetOrganisations', GetOrganisations)
  },
} as BasePlugin