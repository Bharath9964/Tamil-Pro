import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import PublicLandingPage from './pages/PublicLandingPage'
import ProtectedRoute from './pages/ProtectedRoute'
import OverviewPage from './pages/OverviewPage'
import AssessmentHomePage from './pages/AssessmentHomePage'
import ReadingPage from './pages/ReadingPage'
import WritingPage from './pages/WritingPage'
import SpeakingPage from './pages/SpeakingPage'
import ListeningPage from './pages/ListeningPage'
import ReviewPage from './pages/ReviewPage'
import AboutPage from './pages/AboutPage'
import TeamPage from './pages/TeamPage'
import AppShell from './components/AppShell'
import { AssessmentProvider } from './context/AssessmentContext'

const App = () => (
  <Routes>
    <Route path="/" element={<PublicLandingPage />} />
    <Route path="/auth" element={<AuthPage />} />

    <Route
      element={
        <ProtectedRoute>
          <AssessmentProvider>
            <AppShell />
          </AssessmentProvider>
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<OverviewPage />} />
      <Route path="/assessment" element={<AssessmentHomePage />} />
      <Route path="/assessment/reading" element={<ReadingPage />} />
      <Route path="/assessment/writing" element={<WritingPage />} />
      <Route path="/assessment/speaking" element={<SpeakingPage />} />
      <Route path="/assessment/listening" element={<ListeningPage />} />
      <Route path="/assessment/review" element={<ReviewPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/team" element={<TeamPage />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default App
