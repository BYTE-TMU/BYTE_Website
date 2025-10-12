import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { Input, TextArea } from '../../components/Input'
import { api } from '../../api'
import type { AnnouncementFormData } from '../../types'

export default function AnnouncementForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<AnnouncementFormData>({
    id: '',
    date: '',
    title: '',
    description: '',
    image_url: '',
    link: '',
  })

  useEffect(() => {
    if (isEdit && id) {
      api.announcements.getById(id).then(res => {
        if (res.data) setFormData(res.data)
      })
    }
  }, [id, isEdit])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const response = isEdit && id
      ? await api.announcements.update(id, formData)
      : await api.announcements.create(formData)

    if (response.error) {
      alert(response.error)
      setLoading(false)
    } else {
      navigate('/announcements')
    }
  }

  return (
    <Layout title={isEdit ? 'Edit Announcement' : 'Add Announcement'}>
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-gray-900/30 p-6 border-2 border-[#48F5FE]/30 mb-6">
          <Input
            label="Title"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Display Date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            required
            placeholder="e.g., Sep 12, 2025"
          />

          <TextArea
            label="Description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
            rows={6}
          />

          <Input
            label="Image URL (Optional)"
            type="url"
            value={formData.image_url || ''}
            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
          />

          <Input
            label="Link (Optional)"
            type="url"
            value={formData.link || ''}
            onChange={e => setFormData({ ...formData, link: e.target.value })}
            placeholder="https://example.com"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" isLoading={loading}>{isEdit ? 'Update' : 'Create'}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/announcements')}>Cancel</Button>
        </div>
      </form>
    </Layout>
  )
}
