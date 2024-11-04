import { BasePlugin } from '../BasePlugin'
import { FooterLeftComponent } from './components/FooterLeft'
import { GetOrganisations } from './functions/GetOrganizations'

export default {
  name: 'test-plugin',
  strings: {
    'api': {
      edfi: 'https://ed-fi.org'
    },
    'app': {
      HEADER_TITLE: 'Test EDFI Plugins',
    }
  },
  register: (registry) => {
    registry.registerComponent('FooterLeft', FooterLeftComponent)
    registry.registerFunctionality('GetOrganisations', GetOrganisations)
  },
} as BasePlugin