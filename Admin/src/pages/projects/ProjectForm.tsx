import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { Input, TextArea, Select } from '../../components/Input'
import { api } from '../../api'
import type { ProjectFormData } from '../../types'

export default function ProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>({
    id: '',
    title: '',
    status: 'On-going',
    description: '',
    technologies: [],
    github_url: '',
    image_url: '',
    type: 'current',
  })

  useEffect(() => {
    if (isEdit && id) {
      api.projects.getById(id).then(res => {
        if (res.data) setFormData(res.data)
      })
    }
  }, [id, isEdit])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const response = isEdit && id
      ? await api.projects.update(id, formData)
      : await api.projects.create(formData)

    if (response.error) {
      alert(response.error)
      setLoading(false)
    } else {
      navigate('/projects')
    }
  }

  return (
    <Layout title={isEdit ? 'Edit Project' : 'Add Project'}>
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-gray-900/30 p-6 border-2 border-[#48F5FE]/30 mb-6">
          <Input
            label="Title"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
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
            label="GitHub URL"
            type="url"
            value={formData.github_url}
            onChange={e => setFormData({ ...formData, github_url: e.target.value })}
            required
          />

          <Input
            label="Image URL (Optional)"
            type="url"
            value={formData.image_url || ''}
            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
          />

          <Select
            label="Status"
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value as any })}
            required
          >
            <option value="On-going">On-going</option>
            <option value="Completed">Completed</option>
          </Select>

          <Select
            label="Type"
            value={formData.type}
            onChange={e => setFormData({ ...formData, type: e.target.value as any })}
            required
          >
            <option value="current">Current</option>
            <option value="past">Past</option>
          </Select>

          <Input
            label="Technologies (comma-separated)"
            value={formData.technologies.join(', ')}
            onChange={e => setFormData({
              ...formData,
              technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
            })}
            placeholder="React, TypeScript, TailwindCSS"
            required
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" isLoading={loading}>{isEdit ? 'Update' : 'Create'}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/projects')}>Cancel</Button>
        </div>
      </form>
    </Layout>
  )
}
