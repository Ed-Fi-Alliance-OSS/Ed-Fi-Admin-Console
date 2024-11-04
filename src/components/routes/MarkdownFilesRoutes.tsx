import React from 'react'
import { MarkdownPage } from '../pages/MarkdownPage'


// Use Vite's import.meta.glob to import all markdown files dynamically
const markdownFiles = import.meta.glob('/src/docs/**/*.md')

// Map filenames to routes
export const markdownRoutes = Object.keys(markdownFiles).map((filePath) => {
  const pathName = filePath
    .replace('/src/docs/', '')
    .replace('.md', '')
  markdownFiles[filePath]().then((data: any) => {
    console.log(data)
  })

  return {
    path: `/docs/${pathName}`,
    component: React.lazy(async () => {
      try {
        const { default: MarkdownFileContent } = await markdownFiles[filePath]() as { default: React.JSX.Element }
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