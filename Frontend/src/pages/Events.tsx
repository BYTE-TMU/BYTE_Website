import React from 'react'
import PageTitle from '@/components/layout/PageTitle'
import SliderSection from '@/components/sections/SliderSection'
import AnnouncementCard from '@/components/sections/AnnouncementCard'
import RecapCard from '@/components/sections/RecapCard'
import Join from '@/components/sections/Join'
import { upcomingEventsData } from '@/data/upcomingEventsData'
import { pastEventsData } from '@/data/pastEventsData'

export default function EventsPage() {
  const handleRegistration = (url: string) => {
    window.open(url, '_blank')
  }

  const handleRecapView = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <>
      <PageTitle 
        title="Events" 
        subtitle="We host events that help you learn technical skills and expand your network" 
      />
      
      <SliderSection
        title="Upcoming Events"
        titleColor="#48F5FE"
        itemsPerPage={2}
      >
        {upcomingEventsData.map((event) => (
          <AnnouncementCard
            key={event.id}
            date={event.date}
            title={event.title}
            description={event.description}
            imageUrl={event.imageUrl}
            buttonText={event.registrationUrl ? "Register" : undefined}
            onButtonClick={event.registrationUrl ? () => handleRegistration(event.registrationUrl!) : undefined}
          />
        ))}
      </SliderSection>
      
      <SliderSection
        title="Past Events"
        itemsPerPage={4}
      >
        {pastEventsData.map((event) => (
          <RecapCard
            key={event.id}
            title={event.title}
            description={event.description}
            buttonText={event.recapUrl ? "View Recap" : undefined}
            onButtonClick={event.recapUrl ? () => handleRecapView(event.recapUrl!) : undefined}
          />
        ))}
      </SliderSection>
      
      <Join />
    </>
  )
}