
import PageTitle from '@/components/layout/PageTitle'
import FAQSection from '@/components/sections/FAQSection'
import Contact from '@/components/sections/Contact'
import JoinSection from '@/components/sections/JoinSection'

export default function Support() {
  return (
    <>
      <PageTitle 
        title="Support" 
        subtitle="We'd love to hear from you" 
      />
      
      <FAQSection />
      
      <Contact />
      
      <JoinSection
        memberUrl="/apply/member"
        discordUrl="/discord"
        teamUrl="/apply/team"
      />
    </>
  )
}