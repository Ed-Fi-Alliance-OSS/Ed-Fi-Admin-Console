import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import { baseTheme, LoadingScreen, TEEAuthContextProvider, useSaveInitialRoute } from '@edfi/admin-console-shared-sdk'
import OnBoardingWizardProvider from './context/onBoardingWizardContext'
import LayoutWrapper from './components/layout/LayoutWrapper'
import routes from './core/routes'

// Fonts 
import '@fontsource/poppins/600-italic.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/900.css'
import '@fontsource/open-sans/400-italic.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import "@fontsource/archivo-narrow"
import AdminConsoleConfigProvider from './context/adminConsoleContext'
import { HttpServiceContextProvider } from './context/httpServiceContext'
import ExternalODSProvider from './context/externalODSContext'

interface AppProps {
  appConfig: any
}

function App({ appConfig }: AppProps) {
  console.log('Tech Console started', "UI package 2.0.99", "June 2024")

  useSaveInitialRoute({
    homeUrl: routes.home.url,
    appBasePath: "/adminconsole"
  })

  // APP PAGE

  return (
    <div className="App">
      <ColorModeScript initialColorMode={baseTheme.config.initialColorMode} />
      <ChakraProvider theme={baseTheme}>
        <HelmetProvider>
            <LoadingScreen loading={!appConfig? true : false} state='loading...' delay={0.5} />
            {appConfig && 
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
              </TEEAuthContextProvider>}
        </HelmetProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;