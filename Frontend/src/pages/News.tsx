
import PageTitle from '@/components/layout/PageTitle'
import SliderSection from '@/components/sections/SliderSection'
import AnnouncementCard from '@/components/sections/AnnouncementCard'
import Join from '@/components/sections/Join'
import { announcementsData } from '@/data/announcementsData'

export default function News() {
  return (
    <>
      <PageTitle 
        title="News" 
        subtitle="Stay updated with our vision for this year" 
      />
      
      <SliderSection
        title="Announcements"
        titleColor="#48F5FE"
        itemsPerPage={2}
      >
        {announcementsData.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            date={announcement.date}
            title={announcement.title}
            description={announcement.description}
            imageUrl={announcement.imageUrl}
          />
        ))}
      </SliderSection>
      
      <Join />
    </>
  )
}