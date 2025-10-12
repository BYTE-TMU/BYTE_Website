import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../../components/Layout'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import type { User } from '../../types'

export default function UsersList() {
  const { isOwner } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    const response = await api.users.getAll()

    if (response.data) {
      setUsers(response.data.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ))
    } else {
      setError(response.error || 'Failed to load users')
    }

    setLoading(false)
  }

  const handleRoleChange = async (userId: string, newRole: 'owner' | 'admin' | 'member') => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return
    }

    setUpdatingUserId(userId)
    const response = await api.users.updateRole(userId, newRole)

    if (response.error) {
      alert(response.error)
    } else {
      await loadUsers()
    }

    setUpdatingUserId(null)
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-[#CEFE00]/20 border-[#CEFE00]/50 text-[#CEFE00]'
      case 'admin':
        return 'bg-[#4C5EF6]/20 border-[#4C5EF6]/50 text-[#4C5EF6]'
      default:
        return 'bg-gray-700/20 border-gray-700/50 text-gray-400'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 border-green-500/50 text-green-400'
      case 'suspended':
        return 'bg-red-500/20 border-red-500/50 text-red-400'
      default:
        return 'bg-gray-700/20 border-gray-700/50 text-gray-400'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Layout title="Users Management">
      {/* Info Banner */}
      {!isOwner && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 font-tech-mono text-sm">
          ⚠️ You can view users but only owners can change roles.
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 font-tech-mono text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-ghost-white/60 font-tech-mono">Loading users...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && users.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-2xl mb-4">👤</p>
          <p className="text-ghost-white/60 font-tech-mono mb-4">
            No users found
          </p>
        </motion.div>
      )}

      {/* Users Table */}
      {!loading && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900/50 border-b-2 border-[#CEFE00]/30">
                <th className="px-4 py-3 text-left text-sm font-tech-mono font-bold text-ghost-white">
                  Username
                </th>
                <th className="px-4 py-3 text-left text-sm font-tech-mono font-bold text-ghost-white">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-tech-mono font-bold text-ghost-white">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-tech-mono font-bold text-ghost-white">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-tech-mono font-bold text-ghost-white">
                  Created
                </th>
                {isOwner && (
                  <th className="px-4 py-3 text-right text-sm font-tech-mono font-bold text-ghost-white">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr
                  key={user.uid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors"
                >
                  <td className="px-4 py-4 font-tech-mono text-ghost-white">
                    {user.username}
                  </td>
                  <td className="px-4 py-4 font-tech-mono text-ghost-white/80 text-sm">
                    {user.email}
                    {user.email_verified && (
                      <span className="ml-2 text-xs text-green-400">✓</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 border text-xs font-tech-mono uppercase ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 border text-xs font-tech-mono uppercase ${getStatusBadgeColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-tech-mono text-ghost-white/60 text-sm">
                    {formatDate(user.created_at)}
                  </td>
                  {isOwner && (
                    <td className="px-4 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(
                              user.uid,
                              e.target.value as 'owner' | 'admin' | 'member'
                            )
                          }
                          disabled={updatingUserId === user.uid}
                          className="bg-gray-800 border-2 border-gray-700 text-ghost-white px-3 py-1 text-sm font-tech-mono focus:outline-none focus:border-[#48F5FE] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                          <option value="owner">Owner</option>
                        </select>
                        {updatingUserId === user.uid && (
                          <span className="text-[#48F5FE] text-sm animate-pulse">
                            Updating...
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      {!loading && users.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-900/30 border-l-4 border-[#CEFE00]">
            <p className="text-sm font-tech-mono text-ghost-white/60">Total Users</p>
            <p className="text-2xl font-orbitron font-bold text-ghost-white">{users.length}</p>
          </div>
          <div className="p-4 bg-gray-900/30 border-l-4 border-[#4C5EF6]">
            <p className="text-sm font-tech-mono text-ghost-white/60">Admins</p>
            <p className="text-2xl font-orbitron font-bold text-ghost-white">
              {users.filter((u) => u.role === 'admin' || u.role === 'owner').length}
            </p>
          </div>
          <div className="p-4 bg-gray-900/30 border-l-4 border-green-500">
            <p className="text-sm font-tech-mono text-ghost-white/60">Active</p>
            <p className="text-2xl font-orbitron font-bold text-ghost-white">
              {users.filter((u) => u.status === 'active').length}
            </p>
          </div>
        </div>
      )}
    </Layout>
  )
}
