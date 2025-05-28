'use client'

import {
  ChakraProvider
} from '@chakra-ui/react'
import { baseTheme } from '@edfi/admin-console-shared-sdk'
import { ReactNode } from 'react'
import { ColorModeProvider } from './color-mode'
import { Toaster } from './toaster'
import { system } from '../../theme'
import { GlobalStyles } from './global-styles'

export interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  // Use our local system which now merges baseTheme and local theme
  return (
    <ChakraProvider value={system}>
      <GlobalStyles />
      <ColorModeProvider>
        {children}
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  )
}
