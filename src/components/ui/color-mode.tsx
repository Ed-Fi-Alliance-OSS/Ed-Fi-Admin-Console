'use client'

import type {
  IconButtonProps, SpanProps 
} from '@chakra-ui/react'
import {
  IconButton, Skeleton, Box as Span
} from '@chakra-ui/react'
// Remove direct imports from Chakra hooks as they're causing context errors
import {
  ThemeProvider, useTheme 
} from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import * as React from 'react'
import {
  LuMoon, LuSun 
} from 'react-icons/lu'

export interface ColorModeProviderProps {
  children: React.ReactNode;
  defaultColorMode?: string;
  [key: string]: any;
}

export function ColorModeProvider({ children, ...props }: ColorModeProviderProps) {
  return (
    <ThemeProvider disableTransitionOnChange attribute="class" {...props}>
      {children}
    </ThemeProvider>
  )
}

export type ColorMode = 'light' | 'dark'

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  // Use next-themes built-in hook
  const { resolvedTheme, setTheme } = useTheme()

  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return {
    colorMode: (resolvedTheme || 'light') as ColorMode,
    setColorMode: (mode) => setTheme(mode),
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()
  return (
    <React.Suspense fallback={<Skeleton boxSize="8" />}>
      <IconButton
        ref={ref}
        aria-label="Toggle color mode"
        size="sm"
        variant="ghost"
        onClick={toggleColorMode}
        {...props}
      >
        <ColorModeIcon />
      </IconButton>
    </React.Suspense>
  )
})

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(function LightMode(props, ref) {
  return (
    <Span
      ref={ref}
      className="chakra-theme light"
      color="fg"
      colorPalette="gray"
      colorScheme="light"
      display="contents"
      {...props}
    />
  )
},)

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(function DarkMode(props, ref) {
  return (
    <Span
      ref={ref}
      className="chakra-theme dark"
      color="fg"
      colorPalette="gray"
      colorScheme="dark"
      display="contents"
      {...props}
    />
  )
},)
