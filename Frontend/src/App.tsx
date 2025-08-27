import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import AboutPage from '@/pages/About'
import News from '@/pages/News'
import EventsPage from '@/pages/Events'
import Support from '@/pages/Support'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-digital-abyss text-ghost-white">
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
    </Router>
  )
}

export default App