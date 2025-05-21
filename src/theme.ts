// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  createSystem, defaultConfig, defineConfig 
} from '@chakra-ui/react'

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
      }, 
    },
  },
})

export const system = createSystem(defaultConfig, config)