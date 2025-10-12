import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { api } from '../../api'
import type { Announcement } from '../../types'

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnnouncements()
  }, [])

  const loadAnnouncements = async () => {
    const response = await api.announcements.getAll()
    if (response.data) {
      setAnnouncements(response.data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return
    await api.announcements.delete(id)
    loadAnnouncements()
  }

  return (
    <Layout title="Announcements">
      <div className="flex justify-between items-center mb-6">
        <div className="text-ghost-white/60 font-tech-mono text-sm">
          {announcements.length} announcement{announcements.length !== 1 ? 's' : ''}
        </div>
        <Link to="/announcements/new">
          <Button variant="primary">+ Add Announcement</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-ghost-white/60 font-tech-mono">Loading...</div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl mb-4">📢</p>
          <p className="text-ghost-white/60 font-tech-mono mb-4">No announcements yet</p>
          <Link to="/announcements/new"><Button>Add Your First Announcement</Button></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement, i) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900/30 border-2 border-[#2B9398]/20 p-6 hover:border-[#2B9398]/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-orbitron font-bold text-white">{announcement.title}</h3>
                    <span className="text-sm text-[#CEFE00] font-tech-mono">{announcement.date}</span>
                  </div>

                  <p className="text-sm text-ghost-white/70 font-tech-mono mb-4">
                    {announcement.description}
                  </p>

                  {announcement.link && (
                    <a
                      href={announcement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#48F5FE] font-tech-mono hover:underline"
                    >
                      🔗 {announcement.link}
                    </a>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <Link to={`/announcements/edit/${announcement.id}`}>
                    <Button variant="secondary" className="text-xs">Edit</Button>
                  </Link>
                  <Button variant="danger" className="text-xs" onClick={() => handleDelete(announcement.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Layout>
  )
}
