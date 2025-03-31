import { PropsWithChildren } from 'react'
import { ScrollArea } from '@radix-ui/themes'

import Header from '@/components/Header.tsx'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen max-h-screen flex flex-col relative w-screen">
      <Header />
      <ScrollArea>
        <div
          style={{ height: 'calc(100vh - 40px)' }}
          className="flex flex-col w-screen"
        >
          {children}
        </div>
      </ScrollArea>
    </div>
  )
}
