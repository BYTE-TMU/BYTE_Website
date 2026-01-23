import { useState } from 'react'
import PageTitle from '@/components/layout/PageTitle'
import SliderSection from '@/components/sections/SliderSection'
import AnnouncementCard from '@/components/sections/AnnouncementCard'
import RecapCard from '@/components/sections/RecapCard'
import Join from '@/components/sections/Join'
import EventRecapModal from '@/components/modals/EventRecapModal'
import { eventsData, Event } from '@/data/eventsData'

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Helper functions for filtering events
  const getUpcomingEvents = (): Event[] => {
    const currentDate = new Date();
    return eventsData
      .filter(event => new Date(event.date) >= currentDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getPastEvents = (): Event[] => {
    const currentDate = new Date();
    return eventsData
      .filter(event => new Date(event.date) < currentDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()

  // Add placeholder cards for upcoming events if none exist
  const getUpcomingEventsWithPlaceholders = () => {
    const events = [...upcomingEvents]
    const placeholdersNeeded = events.length === 0 ? 1 : 0

    for (let i = 0; i < placeholdersNeeded; i++) {
      events.push({
        id: `placeholder-${i}`,
        title: 'Coming Soon',
        date: 'TBA',
        description: 'Stay tuned for more exciting events and workshops. Follow us on our social media for the latest updates!',
        imageUrl: 'https://picsum.photos/320/180?random=placeholder',
        location: 'TMU Campus',
        type: 'social' as const
      })
    }

    return events
  }

  const upcomingEventsWithPlaceholders = getUpcomingEventsWithPlaceholders()

  const handleRegistration = (url: string) => {
    window.open(url, '_blank')
  }

  const handleRecapView = (event: Event) => {
    if (event.recap) {
      setSelectedEvent(event)
      setIsModalOpen(true)
    } else if (event.recapUrl) {
      // Fallback to external URL if no recap data
      window.open(event.recapUrl, '_blank')
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  // Format date for display (from YYYY-MM-DD to readable format)
  const formatDate = (dateString: string) => {
    if (dateString === 'TBA') return 'TBA'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
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
        {upcomingEventsWithPlaceholders.map((event) => (
          <AnnouncementCard
            key={event.id}
            date={formatDate(event.date)}
            title={event.title}
            description={event.description}
            imageUrl={event.imageUrl}
            buttonText={event.registrationUrl ? "Register" : undefined}
            onButtonClick={event.registrationUrl ? () => handleRegistration(event.registrationUrl!) : undefined}
            isPlaceholder={event.id.startsWith('placeholder')}
          />
        ))}
      </SliderSection>

      <SliderSection
        title="Past Events"
        itemsPerPage={4}
      >
        {pastEvents.map((event) => (
          <RecapCard
            key={event.id}
            title={event.title}
            description={event.description}
            buttonText={(event.recap || event.recapUrl) ? "View Recap" : undefined}
            onButtonClick={(event.recap || event.recapUrl) ? () => handleRecapView(event) : undefined}
          />
        ))}
      </SliderSection>

      <Join />

      <EventRecapModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}