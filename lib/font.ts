import { Open_Sans, IBM_Plex_Mono, Inter, Geist, Geist_Mono } from 'next/font/google';

// This configures the Next.js Font for Open Sans
// We then export a variable and class name to be used
// within Tailwind (tailwind.config.ts) and Storybook (preview.js)
export const OPEN_SANS = Open_Sans({
    weight: ['300', '400', '600', '700'],
    display: 'fallback',
    subsets: ['latin'],
    variable: '--font-open-sans',
});

// This configures the Next.js Font for IBM Plex Mono
// We then export a variable and class name to be used
// within Tailwind (tailwind.config.ts) and Storybook (preview.js)
export const IBM_PLEX_MONO = IBM_Plex_Mono({
    weight: ['400', '600'],
    subsets: ['latin'],
    fallback: ['ui-monospace'],
    variable: '--font-ibm-plex-mono',
});

export const INTER = Inter({
    subsets: ['latin'],
});

export const GEIST_SANS = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

export const GEIST_MONO = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})