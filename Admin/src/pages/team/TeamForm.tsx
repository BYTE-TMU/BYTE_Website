import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { Input, TextArea } from '../../components/Input'
import { api } from '../../api'
import type { TeamMemberFormData } from '../../types'

const CATEGORIES = ['Leadership', 'Strategic Team', 'Technical Team']

export default function TeamForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<TeamMemberFormData>({
    id: '',
    name: '',
    position: '',
    profile_pic_url: '',
    rank: 50,
    categories: [],
    connections: [],
  })

  useEffect(() => {
    if (isEdit && id) {
      loadMember(id)
    }
  }, [id, isEdit])

  const loadMember = async (memberId: string) => {
    setLoading(true)
    const response = await api.teamMembers.getById(memberId)

    if (response.data) {
      setFormData(response.data)
    } else {
      alert(response.error || 'Failed to load member')
      navigate('/team')
    }

    setLoading(false)
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required'
    }

    if (!formData.profile_pic_url.trim()) {
      newErrors.profile_pic_url = 'Profile picture URL is required'
    }

    if (formData.categories.length === 0) {
      newErrors.categories = 'At least one category is required'
    }

    if (formData.rank < 0 || formData.rank > 100) {
      newErrors.rank = 'Rank must be between 0 and 100'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)

    const response = isEdit && id
      ? await api.teamMembers.update(id, formData)
      : await api.teamMembers.create(formData)

    if (response.error) {
      alert(response.error)
      setLoading(false)
    } else {
      navigate('/team')
    }
  }

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }))
  }

  if (loading && isEdit) {
    return (
      <Layout title={isEdit ? 'Edit Team Member' : 'Add Team Member'}>
        <div className="text-center py-12">
          <p className="text-ghost-white/60 font-tech-mono">Loading...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={isEdit ? 'Edit Team Member' : 'Add Team Member'}>
      <div className="max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-900/30 p-6 border-2 border-[#48F5FE]/30 mb-6">
            <h3 className="text-xl font-orbitron font-bold text-white mb-6">
              Member Information
            </h3>

            <Input
              label="ID"
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              error={errors.id}
              placeholder="e.g., member-001 (leave empty for auto-generate)"
              disabled={isEdit}
            />

            <Input
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              required
              placeholder="e.g., John Doe"
            />

            <Input
              label="Position"
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              error={errors.position}
              required
              placeholder="e.g., VP of Technology"
            />

            <Input
              label="Profile Picture URL"
              type="url"
              value={formData.profile_pic_url}
              onChange={(e) => setFormData({ ...formData, profile_pic_url: e.target.value })}
              error={errors.profile_pic_url}
              required
              placeholder="https://example.com/image.jpg"
            />

            {formData.profile_pic_url && (
              <div className="mb-4">
                <p className="text-sm font-tech-mono text-ghost-white/60 mb-2">Preview:</p>
                <img
                  src={formData.profile_pic_url}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#48F5FE]/30"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200'
                  }}
                />
              </div>
            )}

            <Input
              label="Rank"
              type="number"
              value={formData.rank}
              onChange={(e) => setFormData({ ...formData, rank: parseInt(e.target.value) || 0 })}
              error={errors.rank}
              required
              min={0}
              max={100}
              placeholder="50"
            />
            <p className="text-xs text-ghost-white/40 font-tech-mono -mt-3 mb-4">
              Higher rank = larger bubble (President: 100, VP: 80, Director: 70, Engineer: 50)
            </p>

            {/* Categories */}
            <div className="mb-4">
              <label className="block text-sm font-tech-mono font-bold text-ghost-white mb-2">
                Categories <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-3 flex-wrap">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 font-tech-mono text-sm transition-colors border-2 ${
                      formData.categories.includes(category)
                        ? 'bg-[#4C5EF6] text-white border-[#4C5EF6]'
                        : 'bg-gray-800 text-ghost-white/80 border-gray-700 hover:border-[#48F5FE]/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {errors.categories && (
                <p className="mt-1 text-xs text-red-400 font-tech-mono">{errors.categories}</p>
              )}
              <p className="text-xs text-ghost-white/40 font-tech-mono mt-2">
                Select all categories this member belongs to
              </p>
            </div>

            {/* Connections (Optional) */}
            <Input
              label="Connections (Optional)"
              type="text"
              value={formData.connections?.join(', ') || ''}
              onChange={(e) => setFormData({
                ...formData,
                connections: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
              })}
              placeholder="member-id-1, member-id-2"
            />
            <p className="text-xs text-ghost-white/40 font-tech-mono -mt-3 mb-4">
              Comma-separated list of member IDs for network visualization
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" variant="primary" isLoading={loading}>
              {isEdit ? 'Update Member' : 'Create Member'}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/team')}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
