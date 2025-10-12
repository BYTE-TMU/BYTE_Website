import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { api } from '../../api'
import type { Event } from '../../types'

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    const response = await api.events.getAll()
    if (response.data) {
      setEvents(response.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return
    await api.events.delete(id)
    loadEvents()
  }

  const upcomingEvents = events.filter(e => !e.is_past)
  const pastEvents = events.filter(e => e.is_past)

  return (
    <Layout title="Events">
      <div className="flex justify-between items-center mb-6">
        <div className="text-ghost-white/60 font-tech-mono text-sm">
          {upcomingEvents.length} upcoming, {pastEvents.length} past
        </div>
        <Link to="/events/new">
          <Button variant="primary">+ Add Event</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-ghost-white/60 font-tech-mono">Loading...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl mb-4">📅</p>
          <p className="text-ghost-white/60 font-tech-mono mb-4">No events yet</p>
          <Link to="/events/new"><Button>Add Your First Event</Button></Link>
        </div>
      ) : (
        <>
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-4">Upcoming Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h3 className="text-2xl font-orbitron font-bold text-white mb-4">Past Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  )
}

function EventCard({ event, index, onDelete }: { event: Event; index: number; onDelete: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-gray-900/30 border-2 p-6 hover:border-[#CEFE00]/50 transition-colors ${
        event.is_past ? 'border-gray-700/20 opacity-75' : 'border-[#CEFE00]/20'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-orbitron font-bold text-white mb-1">{event.title}</h3>
          <p className="text-sm text-[#CEFE00] font-tech-mono">
            {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {event.type && (
          <span className="px-3 py-1 bg-[#4C5EF6]/20 text-[#4C5EF6] text-xs font-tech-mono uppercase">
            {event.type}
          </span>
        )}
      </div>

      <p className="text-sm text-ghost-white/70 font-tech-mono mb-4 line-clamp-3">
        {event.description}
      </p>

      {event.location && (
        <p className="text-xs text-ghost-white/50 font-tech-mono mb-4">📍 {event.location}</p>
      )}

      <div className="flex gap-2">
        <Link to={`/events/edit/${event.id}`}>
          <Button variant="secondary" className="text-xs">Edit</Button>
        </Link>
        <Button variant="danger" className="text-xs" onClick={() => onDelete(event.id)}>
          Delete
        </Button>
      </div>
    </motion.div>
  )
}
