import { BasePlugin } from '../BasePlugin'
import { MockApiService } from './functions/MockApiService'

export default {
  name: 'test-plugin',
  strings: { 'app': { 'ODS_INSTANCES': 'Instances', } },
  register: (registry) => {
    registry.registerFunctionality('ApiService', MockApiService)
  },
} as BasePlugin