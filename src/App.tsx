// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  ChakraProvider
} from '@chakra-ui/react'
import { ColorModeProvider } from "./components/ui/color-mode"
import {
  baseTheme, EdxConfigProvider, LoadingScreen, TEEAuthContextProvider, useSaveInitialRoute
} from '@edfi/admin-console-shared-sdk'
import { HelmetProvider } from 'react-helmet-async'
import LayoutWrapper from './components/layout/LayoutWrapper'
import AdminConsoleConfigProvider from './context/adminConsoleContext'
import { HttpServiceContextProvider } from './context/httpServiceContext'
import { MockDataProvider } from './context/mockDataContext'
import OnBoardingWizardProvider from './context/onBoardingWizardContext'
import { TenantsContextProvider } from './context/tenantContext'
import routes from './core/routes'
import {
  loadPlugins, PluginLoader, PluginProvider
} from './plugins/BasePlugin'
import { system } from "./theme";

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
      <ChakraProvider theme={system}>
        <ColorModeProvider>

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
                      <OnBoardingWizardProvider>
                        <AdminConsoleConfigProvider config={appConfig}>
                          <HttpServiceContextProvider redirectOnError={true}>
                            <TenantsContextProvider>
                              <LayoutWrapper />
                            </TenantsContextProvider>
                          </HttpServiceContextProvider>
                        </AdminConsoleConfigProvider>
                      </OnBoardingWizardProvider>
                    </TEEAuthContextProvider>
                  </PluginProvider>
                </MockDataProvider>
              </EdxConfigProvider>}
          </HelmetProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </div>
  )
}

export default App