'use client'

import {
  ChakraProvider
} from '@chakra-ui/react'
import { baseTheme } from '@edfi/admin-console-shared-sdk'
import { ReactNode } from 'react'
import { ColorModeProvider } from './color-mode'
import { Toaster } from './toaster'

export interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  // baseTheme from @edfi/admin-console-shared-sdk is already a v3 system
  // so we can use it directly with ChakraProvider
  return (
    <ChakraProvider value={baseTheme}>
      <ColorModeProvider>
        {children}
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  )
}
