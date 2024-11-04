import React from 'react'
import './MarkdownPage.scss'

interface MarkdownPageProps {
  children?: React.ReactNode
}

export const MarkdownPage: React.FC<MarkdownPageProps> = ({ children }) => {
  return (<>
    <div className="markdown-content">
      {children}
    </div>
  </>
  )
}
