import {
  ChakraProvider, ColorModeScript 
} from '@chakra-ui/react'
import {
  baseTheme, EdxConfigProvider, LoadingScreen, TEEAuthContextProvider, useSaveInitialRoute 
} from '@edfi/admin-console-shared-sdk'
import { HelmetProvider } from 'react-helmet-async'
import LayoutWrapper from './components/layout/LayoutWrapper'
import OnBoardingWizardProvider from './context/onBoardingWizardContext'
import routes from './core/routes'
import {
  loadPlugins, PluginLoader, PluginProvider 
} from './plugins/BasePlugin'
// Fonts 
import '@fontsource/archivo-narrow'
import '@fontsource/open-sans/400-italic.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600-italic.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/900.css'
import AdminConsoleConfigProvider from './context/adminConsoleContext'
import ExternalODSProvider from './context/externalODSContext'
import { HttpServiceContextProvider } from './context/httpServiceContext'
import { MockDataProvider } from './context/mockDataContext'

interface AppProps {
  appConfig: any
}

function App({ appConfig }: AppProps) {
  console.log('Tech Console started', 'UI package 2.0.99', 'June 2024')

  useSaveInitialRoute({
    homeUrl: routes.home.url,
    appBasePath: '/adminconsole'
  })

  // APP PAGE

  return (
    <div className="App">
      
      <ColorModeScript initialColorMode={baseTheme.config.initialColorMode} />

      <ChakraProvider theme={baseTheme}>


        <LoadingScreen
          delay={0.5}
          loading={!appConfig ? true : false}
          state='loading...'
        />

        <HelmetProvider>
          {appConfig &&
            <EdxConfigProvider config={appConfig}>
              <MockDataProvider>
                <PluginProvider>
                  <PluginLoader
                    enabled={appConfig.plugins || []}
                    plugins={loadPlugins()}
                  />

                  <TEEAuthContextProvider edxAppConfig={appConfig}>
                    <ExternalODSProvider config={appConfig}>
                      <OnBoardingWizardProvider>
                        <AdminConsoleConfigProvider config={appConfig}>
                          <HttpServiceContextProvider redirectOnError={true}>
                            <LayoutWrapper />
                          </HttpServiceContextProvider>
                        </AdminConsoleConfigProvider>
                      </OnBoardingWizardProvider>
                    </ExternalODSProvider>
                  </TEEAuthContextProvider>
                </PluginProvider>
              </MockDataProvider>
            </EdxConfigProvider>}
        </HelmetProvider>
      </ChakraProvider>
    </div>
  )
}

export default App