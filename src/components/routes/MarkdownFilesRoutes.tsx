// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import React from 'react'
import { MarkdownPage } from '../pages/MarkdownPage'

// Use Vite's import.meta.glob to import all markdown files dynamically
const markdownFiles = import.meta.glob('/src/docs/**/*.md')

// Map filenames to routes
export const markdownRoutes = Object.keys(markdownFiles).map((filePath) => {
  const pathName = filePath
    .replace('/src/docs/', '')
    .replace('.md', '')

  return {
    path: `/docs/${pathName}`,
    component: React.lazy(async () => {
      try {
        const { default: MarkdownFileContent } = await markdownFiles[filePath]() as { default: React.FC }
        return {
          default: () => (<MarkdownPage>
            <MarkdownFileContent />
          </MarkdownPage>)
        }
      } catch (error) {
        console.error('Error loading markdown file', error)
        return { default: () => <div>Error loading markdown file {filePath}</div> }
      }
    }),
  }
})