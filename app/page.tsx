'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
    const router = useRouter()

    useEffect(() => {
        router.push('/edit')
    }, [router])

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='animate-pulse'>Loading...</div>
        </div>
    )
}
