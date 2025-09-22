import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import AboutPage from '@/pages/About'
import News from '@/pages/News'
import EventsPage from '@/pages/Events'
import Support from '@/pages/Support'

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location])

  return null
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-digital-abyss text-ghost-white relative">
        <div className="relative z-10">
          <ScrollToHash />
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/news" element={<News />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App