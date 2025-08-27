import React from 'react'
import PageTitle from '@/components/layout/PageTitle'
import Mission from '@/components/sections/Mission'
import Join from '@/components/sections/Join'

export default function AboutPage() {
  return (
    <>
      <PageTitle 
        title="About" 
        subtitle="We build software that make real impacts" 
      />
      <Mission />
      <Join />
    </>
  )
}