import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { api } from '../../api'
import type { Project } from '../../types'

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const response = await api.projects.getAll()
    if (response.data) {
      setProjects(response.data)
    } else {
      setError(response.error || 'Failed to load projects')
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await api.projects.delete(id)
    loadProjects()
  }

  return (
    <Layout title="Projects">
      <div className="flex justify-between items-center mb-6">
        <div className="text-ghost-white/60 font-tech-mono text-sm">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </div>
        <Link to="/projects/new">
          <Button variant="primary">+ Add Project</Button>
        </Link>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400">{error}</div>}

      {loading ? (
        <div className="text-center py-12 text-ghost-white/60 font-tech-mono">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl mb-4">🚀</p>
          <p className="text-ghost-white/60 font-tech-mono mb-4">No projects yet</p>
          <Link to="/projects/new"><Button>Add Your First Project</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900/30 border-2 border-[#48F5FE]/20 p-6 hover:border-[#48F5FE]/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-orbitron font-bold text-white">{project.title}</h3>
                <span className={`px-3 py-1 text-xs font-tech-mono ${
                  project.status === 'On-going' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-ghost-white/70 font-tech-mono mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 5).map(tech => (
                  <span key={tech} className="px-2 py-1 bg-[#4C5EF6]/20 text-[#4C5EF6] text-xs font-tech-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Link to={`/projects/edit/${project.id}`}>
                  <Button variant="secondary" className="text-xs">Edit</Button>
                </Link>
                <Button variant="danger" className="text-xs" onClick={() => handleDelete(project.id)}>
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Layout>
  )
}
