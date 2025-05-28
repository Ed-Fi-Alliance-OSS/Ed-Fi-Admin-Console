// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  createSystem, defaultConfig, defineConfig 
} from '@chakra-ui/react'
import { baseTheme } from '@edfi/admin-console-shared-sdk'

// Get the baseTheme tokens and extend them
const config = defineConfig({
  theme: {
    keyframes: {
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      fadeIn: {
        'from': { opacity: 0 },
        'to': { opacity: 1 },
      },
    },
    tokens: { 
      animations: { 
        spin: { value: 'spin 1s linear infinite' },
        fadeIn: { value: 'fadeIn 0.5s forwards' },
      },      colors: {
        bodyColor: {
          value: "{colors.black.value}",
          _dark: { value: "white" }
        },        bodyBg: {
          value: "#F7FAFC", // Explicit value for gray.50
          _dark: { value: "#F7FAFC" } // Same for dark mode to prevent issues
        },
        // Define primaryBlue600 explicitly
        primaryBlue600: { value: "#2563eb" },
        // Define secondaryBlue colors
        secondaryBlue600: { value: "#3182ce" }, // A slightly lighter blue
        secondaryBlue500: { value: "#4299e1" }, // An even lighter blue        // Add standard blue color scale for compatibility
        blue: {
          50: { value: "#eff6ff" },
          100: { value: "#dbeafe" },
          200: { value: "#bfdbfe" },
          300: { value: "#93c5fd" },
          400: { value: "#60a5fa" },
          500: { value: "#3b82f6" },
          600: { value: "#2563eb" },
          700: { value: "#1d4ed8" },
          800: { value: "#1e40af" },
          900: { value: "#1e3a8a" }
        },
        // Add red color scale for red buttons
        red: {
          50: { value: "#fef2f2" },
          100: { value: "#fee2e2" },
          200: { value: "#fecaca" },
          300: { value: "#fca5a5" },
          400: { value: "#f87171" },
          500: { value: "#ef4444" },          600: { value: "#dc2626" },
          700: { value: "#b91c1c" },
          800: { value: "#991b1b" },
          900: { value: "#7f1d1d" }        }
      }
    },
    semanticTokens: {
      colors: {
        "chakra-body-text": { value: "{colors.bodyColor}" },
        "chakra-body-bg": { value: "{colors.bodyBg}" }
      }
    }
  },
})

export const system = createSystem(defaultConfig, config)