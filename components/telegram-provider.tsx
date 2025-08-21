"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface TelegramWebApp {
  ready: () => void
  expand: () => void
  close: () => void
  MainButton: {
    text: string
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
  }
  initData: string
  initDataUnsafe: any
}

interface TelegramContextType {
  webApp: TelegramWebApp | null
  user: any
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  user: null,
})

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp
      setWebApp(tg)
      setUser(tg.initDataUnsafe?.user)

      tg.ready()
      tg.expand()
    }
  }, [])

  return <TelegramContext.Provider value={{ webApp, user }}>{children}</TelegramContext.Provider>
}

export const useTelegram = () => useContext(TelegramContext)
