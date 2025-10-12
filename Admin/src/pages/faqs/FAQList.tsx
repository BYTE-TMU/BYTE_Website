import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { api } from '../../api'
import type { FAQ } from '../../types'

export default function FAQList() {
  const [faqs, setFAQs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    loadFAQs()
  }, [])

  const loadFAQs = async () => {
    setLoading(true)
    const response = await api.faqs.getAll()

    if (response.data) {
      setFAQs(response.data)
    } else {
      setError(response.error || 'Failed to load FAQs')
    }

    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) {
      return
    }

    setDeleteId(id)
    const response = await api.faqs.delete(id)

    if (response.error) {
      alert(response.error)
    } else {
      await loadFAQs()
    }

    setDeleteId(null)
  }

  return (
    <Layout title="FAQs">
      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-ghost-white/60 font-tech-mono text-sm">
          Manage frequently asked questions
        </p>
        <Link to="/faqs/new">
          <Button variant="primary">+ Add FAQ</Button>
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
          <p className="text-ghost-white/60 font-tech-mono">Loading FAQs...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && faqs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-2xl mb-4">❓</p>
          <p className="text-ghost-white/60 font-tech-mono mb-4">
            No FAQs yet
          </p>
          <Link to="/faqs/new">
            <Button variant="primary">Add Your First FAQ</Button>
          </Link>
        </motion.div>
      )}

      {/* FAQs List */}
      {!loading && faqs.length > 0 && (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-900/30 border-2 border-gray-800 hover:border-[#48F5FE]/30 transition-colors p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-[#4C5EF6]/20 border border-[#4C5EF6]/50 text-[#4C5EF6] text-xs font-tech-mono">
                      #{faq.display_order}
                    </span>
                    <h3 className="text-lg font-tech-mono font-bold text-ghost-white">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="text-ghost-white/70 font-tech-mono text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <Link to={`/faqs/edit/${faq.id}`}>
                    <Button variant="secondary" className="text-xs">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="text-xs"
                    onClick={() => handleDelete(faq.id)}
                    isLoading={deleteId === faq.id}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats */}
      {!loading && faqs.length > 0 && (
        <div className="mt-6 p-4 bg-gray-900/30 border-l-4 border-[#4C5EF6]">
          <p className="text-sm font-tech-mono text-ghost-white/60">
            Total FAQs: {faqs.length}
          </p>
        </div>
      )}
    </Layout>
  )
}
