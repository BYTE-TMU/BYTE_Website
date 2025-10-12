import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { Input, TextArea, Select } from '../../components/Input'
import { api } from '../../api'
import type { EventFormData } from '../../types'

export default function EventForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<EventFormData>({
    id: '',
    title: '',
    date: '',
    description: '',
    image_url: '',
    location: '',
    type: undefined,
    registration_url: '',
    recap_url: '',
    recap: undefined,
  })

  useEffect(() => {
    if (isEdit && id) {
      api.events.getById(id).then(res => {
        if (res.data) setFormData(res.data)
      })
    }
  }, [id, isEdit])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const response = isEdit && id
      ? await api.events.update(id, formData)
      : await api.events.create(formData)

    if (response.error) {
      alert(response.error)
      setLoading(false)
    } else {
      navigate('/events')
    }
  }

  return (
    <Layout title={isEdit ? 'Edit Event' : 'Add Event'}>
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-gray-900/30 p-6 border-2 border-[#48F5FE]/30 mb-6">
          <Input
            label="Title"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <TextArea
            label="Description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
            rows={6}
          />

          <Input
            label="Location (Optional)"
            value={formData.location || ''}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g., TMU Student Centre"
          />

          <Select
            label="Event Type (Optional)"
            value={formData.type || ''}
            onChange={e => setFormData({ ...formData, type: e.target.value as any || undefined })}
          >
            <option value="">Select type</option>
            <option value="workshop">Workshop</option>
            <option value="hackathon">Hackathon</option>
            <option value="networking">Networking</option>
            <option value="social">Social</option>
            <option value="competition">Competition</option>
          </Select>

          <Input
            label="Image URL (Optional)"
            type="url"
            value={formData.image_url || ''}
            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
          />

          <Input
            label="Registration URL (Optional)"
            type="url"
            value={formData.registration_url || ''}
            onChange={e => setFormData({ ...formData, registration_url: e.target.value })}
          />

          <Input
            label="Recap URL (Optional)"
            type="url"
            value={formData.recap_url || ''}
            onChange={e => setFormData({ ...formData, recap_url: e.target.value })}
          />

          {/* Event Recap Section */}
          <div className="mt-6 p-4 bg-gray-800/30 border border-[#CEFE00]/30">
            <h4 className="text-lg font-orbitron font-bold text-white mb-4">Event Recap (Optional)</h4>

            <TextArea
              label="Recap Summary"
              value={formData.recap?.summary || ''}
              onChange={e => setFormData({
                ...formData,
                recap: { summary: e.target.value, images: formData.recap?.images || [] }
              })}
              rows={4}
              placeholder="Describe how the event went..."
            />

            <Input
              label="Recap Images (comma-separated URLs)"
              value={formData.recap?.images.join(', ') || ''}
              onChange={e => setFormData({
                ...formData,
                recap: {
                  summary: formData.recap?.summary || '',
                  images: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                }
              })}
              placeholder="https://example.com/1.jpg, https://example.com/2.jpg"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" isLoading={loading}>{isEdit ? 'Update' : 'Create'}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/events')}>Cancel</Button>
        </div>
      </form>
    </Layout>
  )
}
