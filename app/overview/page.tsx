"use client"
import { ModeToggle } from '@/components/shared/Mode'
import React from 'react'
type Props = {}

function Page({ }: Props) {
  return (
    <div className='w-full h-full flex'>
      <p>Overview Default</p>
      <ModeToggle/>
    </div>
  )
}

export default Page