'use client'

import {
  ChakraProvider, defaultSystem
} from '@chakra-ui/react'
import { system } from '../../theme'
import { ReactNode } from 'react'

export interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  // Use system if available, otherwise fall back to defaultSystem
  const themeSystem = system || defaultSystem

  return (
    <ChakraProvider value={themeSystem}>
      {children}
    </ChakraProvider>
  )
}
