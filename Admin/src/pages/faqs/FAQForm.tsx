import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { api } from '../../api'
import type { FAQFormData } from '../../types'

export default function FAQForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<FAQFormData>({
    question: '',
    answer: '',
    display_order: 1,
  })

  useEffect(() => {
    if (isEdit && id) {
      loadFAQ(parseInt(id))
    }
  }, [id, isEdit])

  const loadFAQ = async (faqId: number) => {
    setLoading(true)
    const response = await api.faqs.getById(faqId)

    if (response.data) {
      setFormData({
        question: response.data.question,
        answer: response.data.answer,
        display_order: response.data.display_order,
      })
    } else {
      setError(response.error || 'FAQ not found')
    }

    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.question.trim()) {
      setError('Question is required')
      return
    }

    if (!formData.answer.trim()) {
      setError('Answer is required')
      return
    }

    setSaving(true)
    setError('')

    const response = isEdit && id
      ? await api.faqs.update(parseInt(id), formData)
      : await api.faqs.create(formData)

    if (response.error) {
      setError(response.error)
      setSaving(false)
    } else {
      navigate('/faqs')
    }
  }

  const handleChange = (field: keyof FAQFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <Layout title={isEdit ? 'Edit FAQ' : 'New FAQ'}>
        <div className="text-center py-12">
          <p className="text-ghost-white/60 font-tech-mono">Loading...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={isEdit ? 'Edit FAQ' : 'New FAQ'}>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 font-tech-mono text-sm"
        >
          {error}
        </motion.div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="max-w-3xl"
      >
        <div className="space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm font-tech-mono font-bold text-ghost-white mb-2">
              Question *
            </label>
            <Input
              type="text"
              value={formData.question}
              onChange={(e) => handleChange('question', e.target.value)}
              placeholder="e.g., Who can join BYTE?"
              required
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-tech-mono font-bold text-ghost-white mb-2">
              Answer *
            </label>
            <textarea
              value={formData.answer}
              onChange={(e) => handleChange('answer', e.target.value)}
              placeholder="Provide a detailed answer..."
              rows={6}
              required
              className="w-full bg-gray-900 border-2 border-gray-700 text-ghost-white px-4 py-3 font-tech-mono text-sm focus:outline-none focus:border-[#48F5FE] transition-colors resize-vertical"
            />
            <p className="mt-1 text-xs text-ghost-white/40 font-tech-mono">
              {formData.answer.length} characters
            </p>
          </div>

          {/* Display Order */}
          <div>
            <label className="block text-sm font-tech-mono font-bold text-ghost-white mb-2">
              Display Order *
            </label>
            <Input
              type="number"
              value={formData.display_order}
              onChange={(e) => handleChange('display_order', parseInt(e.target.value) || 1)}
              min="1"
              required
            />
            <p className="mt-1 text-xs text-ghost-white/40 font-tech-mono">
              FAQs are displayed in ascending order
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              isLoading={saving}
              className="min-w-[120px]"
            >
              {isEdit ? 'Update FAQ' : 'Create FAQ'}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/faqs')}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </div>
      </motion.form>

      {/* Preview */}
      {formData.question && formData.answer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 pt-12 border-t-2 border-gray-800"
        >
          <h3 className="text-xl font-orbitron font-black text-white mb-6">
            Preview
          </h3>

          <div className="bg-[#4C5EF6] border border-[#48F5FE] p-6">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-white font-medium text-lg pr-4">
                {formData.question}
              </h4>
              <span className="px-2 py-1 bg-white/10 text-white text-xs font-tech-mono flex-shrink-0">
                #{formData.display_order}
              </span>
            </div>
            <p className="text-white/90 text-base leading-relaxed">
              {formData.answer}
            </p>
          </div>
        </motion.div>
      )}
    </Layout>
  )
}
