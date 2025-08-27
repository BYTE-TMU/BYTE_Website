import React from 'react'
import PageTitle from '@/components/layout/PageTitle'
import FAQSection from '@/components/sections/FAQSection'
import JoinSection from '@/components/sections/JoinSection'

export default function Support() {
  return (
    <>
      <PageTitle 
        title="Support" 
        subtitle="We'd love to hear from you" 
      />
      
      <FAQSection />
      
      <JoinSection
        memberUrl="/apply/member"
        discordUrl="/discord"
        teamUrl="/apply/team"
      />
    </>
  )
}