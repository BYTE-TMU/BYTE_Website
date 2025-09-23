import PageTitle from '@/components/layout/PageTitle'
import Mission from '@/components/sections/Mission'
import Join from '@/components/sections/Join'
import TeamSection from '@/components/team/TeamSection'
import { meetTheTeamData } from '@/data/teamData'

export default function AboutPage() {
  return (
    <>
      <PageTitle 
        title="About" 
        subtitle="We build software that make real impacts" 
      />
      <Mission />
      
      {/* Team sections */}
      <TeamSection 
        title="MEET THE TEAM"
        teamData={meetTheTeamData}
        showPrototypes={true}
      />
      
      {/* <TeamSection 
        title="PROJECT CONTRIBUTORS"
        teamData={projectContributorsData}
      /> */}
      
      <Join />
    </>
  )
}