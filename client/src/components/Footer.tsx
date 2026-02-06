import { CopyrightIcon } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-1 py-4 text-slate-800 text-sm border-t">
      <CopyrightIcon className='text-gray-400' size={14} />
      <span className='text-gray-400'>2026 PR AI Website Builder</span>
    </footer>
  )
}

export default Footer
