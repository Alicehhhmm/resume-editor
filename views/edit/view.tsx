'use client'

import React from 'react'

import { EditPanels } from '@/views/edit/edit-panels/view'

type Props = {}

export const EditView = ({}: Props) => {
    return (
        <div className="w-full h-full">
            <EditPanels />
        </div>
    )
}
