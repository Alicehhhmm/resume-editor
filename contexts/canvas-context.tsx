'use client'

import { createContext } from 'react'

import { createCanvasStore } from '@/stores/canvas-store'

export type CanvasStoreApi = ReturnType<typeof createCanvasStore>

export const CanvasStoreContext = createContext<CanvasStoreApi | undefined>(
    undefined
)
