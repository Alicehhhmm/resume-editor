'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { CanvasStoreApi, CanvasStoreContext } from '@/contexts/canvas-context'
import { createCanvasStore, initCanvasState } from '@/store/canvas-store'
import { getTemplateFromStorage } from '@/services/templateService'

interface CanvasProviderProps {
    children: ReactNode
}

export const CanvasProvider = ({ children }: CanvasProviderProps) => {
    const storeRef = useRef<CanvasStoreApi>(createCanvasStore(initCanvasState()))

    console.log('storeRef.current:', storeRef.current);

    // 在客户端侧首次加载时尝试从 localStorage 恢复状态
    useEffect(() => {
        const savedTemplate = getTemplateFromStorage()
        if (savedTemplate) {
            storeRef.current.setState((state) => ({
                ...state,
                currentTemplate: savedTemplate,
            }))
        }
    }, [])

    return (
        <CanvasStoreContext.Provider value={storeRef.current}>
            {children}
        </CanvasStoreContext.Provider>
    )
}
