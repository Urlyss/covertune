import { useTranslations } from 'next-intl';
import React from 'react'

const Footer = () => {
  const tf = useTranslations('Footer');
  return (
    <footer className="border-t fixed bottom-0 w-full bg-background z-50">
    <div className='container flex flex-col items-center justify-center gap-4 h-16 md:flex-row'>
        <p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
          {tf('content.text1')}
          {" "}<a href="https://twitter.com/odusseuskamto" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Urlyss</a>{". "}
            {tf('content.text2')}
            <a href="https://github.com/urlyss/covertune" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">GitHub</a>
        </p>
    </div>
    </footer>
  )
}

export default Footer