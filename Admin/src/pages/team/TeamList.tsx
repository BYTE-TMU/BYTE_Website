import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { api } from '../../api'
import type { TeamMember } from '../../types'

export default function TeamList() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    setLoading(true)
    const response = await api.teamMembers.getAll()

    if (response.data) {
      setMembers(response.data.sort((a, b) => b.rank - a.rank))
    } else {
      setError(response.error || 'Failed to load team members')
    }

    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return
    }

    setDeleteId(id)
    const response = await api.teamMembers.delete(id)

    if (response.error) {
      alert(response.error)
    } else {
      await loadMembers()
    }

    setDeleteId(null)
  }

  const filteredMembers = filterCategory === 'all'
    ? members
    : members.filter(m => m.categories.includes(filterCategory))

  const categories = ['all', 'Leadership', 'Strategic Team', 'Technical Team']

  return (
    <Layout title="Team Members">
      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 font-tech-mono text-sm transition-colors ${
                filterCategory === cat
                  ? 'bg-[#4C5EF6] text-white border-2 border-[#4C5EF6]'
                  : 'bg-gray-800 text-ghost-white/80 border-2 border-gray-700 hover:border-[#48F5FE]/50'
              }`}
            >
              {cat === 'all' ? 'All Members' : cat}
            </button>
          ))}
        </div>

        <Link to="/team/new">
          <Button variant="primary">+ Add Member</Button>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 font-tech-mono text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-ghost-white/60 font-tech-mono">Loading team members...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-2xl mb-4">👥</p>
          <p className="text-ghost-white/60 font-tech-mono mb-4">
            {filterCategory === 'all' ? 'No team members yet' : `No members in ${filterCategory}`}
          </p>
          <Link to="/team/new">
            <Button variant="primary">Add Your First Member</Button>
          </Link>
        </motion.div>
      )}

      {/* Members Table */}
      {!loading && filteredMembers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900/50 border-b-2 border-[#CEFE00]/30">
                <th className="px-4 py-3 text-left text-sm font-tech-mono font-bold text-ghost-white">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-tech-mono font-bold text-ghost-white">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-tech-mono font-bold text-ghost-white">
                  Position
                </th>
                <th className="px-4 py-3 text-left text-sm font-tech-mono font-bold text-ghost-white">
                  Categories
                </th>
                <th className="px-4 py-3 text-left text-sm font-tech-mono font-bold text-ghost-white">
                  Rank
                </th>
                <th className="px-4 py-3 text-right text-sm font-tech-mono font-bold text-ghost-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors"
                >
                  <td className="px-4 py-4">
                    <img
                      src={member.profile_pic_url}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#48F5FE]/30"
                    />
                  </td>
                  <td className="px-4 py-4 font-tech-mono text-ghost-white">
                    {member.name}
                  </td>
                  <td className="px-4 py-4 font-tech-mono text-ghost-white/80 text-sm">
                    {member.position}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {member.categories.map(cat => (
                        <span
                          key={cat}
                          className="px-2 py-1 bg-[#4C5EF6]/20 border border-[#4C5EF6]/50 text-[#4C5EF6] text-xs font-tech-mono"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-tech-mono text-ghost-white">
                    {member.rank}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link to={`/team/edit/${member.id}`}>
                        <Button variant="secondary" className="text-xs">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="text-xs"
                        onClick={() => handleDelete(member.id)}
                        isLoading={deleteId === member.id}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      {!loading && members.length > 0 && (
        <div className="mt-6 p-4 bg-gray-900/30 border-l-4 border-[#4C5EF6]">
          <p className="text-sm font-tech-mono text-ghost-white/60">
            Showing {filteredMembers.length} of {members.length} total members
          </p>
        </div>
      )}
    </Layout>
  )
}
