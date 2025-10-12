import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

// Team
import TeamList from './pages/team/TeamList'
import TeamForm from './pages/team/TeamForm'

// Projects
import ProjectList from './pages/projects/ProjectList'
import ProjectForm from './pages/projects/ProjectForm'

// Events
import EventList from './pages/events/EventList'
import EventForm from './pages/events/EventForm'

// Announcements
import AnnouncementList from './pages/announcements/AnnouncementList'
import AnnouncementForm from './pages/announcements/AnnouncementForm'

// Users
import UsersList from './pages/users/UsersList'

// FAQs
import FAQList from './pages/faqs/FAQList'
import FAQForm from './pages/faqs/FAQForm'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Team Routes */}
          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <TeamList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team/new"
            element={
              <ProtectedRoute>
                <TeamForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team/edit/:id"
            element={
              <ProtectedRoute>
                <TeamForm />
              </ProtectedRoute>
            }
          />

          {/* Project Routes */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <ProtectedRoute>
                <ProjectForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/edit/:id"
            element={
              <ProtectedRoute>
                <ProjectForm />
              </ProtectedRoute>
            }
          />

          {/* Event Routes */}
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/new"
            element={
              <ProtectedRoute>
                <EventForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/edit/:id"
            element={
              <ProtectedRoute>
                <EventForm />
              </ProtectedRoute>
            }
          />

          {/* Announcement Routes */}
          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <AnnouncementList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcements/new"
            element={
              <ProtectedRoute>
                <AnnouncementForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcements/edit/:id"
            element={
              <ProtectedRoute>
                <AnnouncementForm />
              </ProtectedRoute>
            }
          />

          {/* Users Routes */}
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />

          {/* FAQ Routes */}
          <Route
            path="/faqs"
            element={
              <ProtectedRoute>
                <FAQList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faqs/new"
            element={
              <ProtectedRoute>
                <FAQForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faqs/edit/:id"
            element={
              <ProtectedRoute>
                <FAQForm />
              </ProtectedRoute>
            }
          />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
