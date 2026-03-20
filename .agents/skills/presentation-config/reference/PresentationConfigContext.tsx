import { createContext, useContext, useState, type ReactNode } from 'react'
import { suiLight, suiDark, suiHighContrast } from '@ringcentral/spring-theme'

export type ThemeOption = 'light' | 'dark' | 'highContrast'
export type EnvironmentOption = 'fullscreen' | 'macos' | 'windows'
export type UserRole = 'admin' | 'agent'

const themeMap = {
  light: suiLight,
  dark: suiDark,
  highContrast: suiHighContrast,
} as const

interface PresentationConfigContextValue {
  themeOption: ThemeOption
  setThemeOption: (t: ThemeOption) => void
  themeObject: typeof suiLight
  environment: EnvironmentOption
  setEnvironment: (e: EnvironmentOption) => void
  userRole: UserRole
  setUserRole: (r: UserRole) => void
}

const PresentationConfigContext = createContext<PresentationConfigContextValue | null>(null)

export function usePresentationConfig() {
  const ctx = useContext(PresentationConfigContext)
  if (!ctx) throw new Error('usePresentationConfig must be used within PresentationConfigProvider')
  return ctx
}

export function PresentationConfigProvider({ children }: { children: ReactNode }) {
  const [themeOption, setThemeOption] = useState<ThemeOption>('light')
  const [environment, setEnvironment] = useState<EnvironmentOption>('fullscreen')
  const [userRole, setUserRole] = useState<UserRole>('admin')

  const value: PresentationConfigContextValue = {
    themeOption,
    setThemeOption,
    themeObject: themeMap[themeOption],
    environment,
    setEnvironment,
    userRole,
    setUserRole,
  }

  return (
    <PresentationConfigContext.Provider value={value}>
      {children}
    </PresentationConfigContext.Provider>
  )
}
