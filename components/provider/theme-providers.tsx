'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function RThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            storageKey="resume-theme"
            disableTransitionOnChange
            enableColorScheme
            {...props}
        >
            {children}
        </NextThemesProvider>
    )
}
