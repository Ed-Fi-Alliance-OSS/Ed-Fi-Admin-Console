import {
  css, Global 
} from '@emotion/react'
import { useColorModeValue } from './color-mode'

export const GlobalStyles = () => {
  const bgColor = useColorModeValue('#F7FAFC', '#F7FAFC') // Same for both light/dark for now

  return (
    <Global
      styles={css`
        body, #root, .App {
          background-color: ${bgColor} !important;
          min-height: 100vh;
        }
      `}
    />
  )
}