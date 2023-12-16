import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRouter'
import { AuthProvider } from './context/AuthContext'

import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CalendarsPage from './pages/CalendarsPage';
import CalendarDetailPage from './pages/CalendarDetailPage'
import ProfilePage from './pages/ProfilePage'
import UserListPage from './pages/UserListPage'
import UserProfilePage from './pages/UserProfilePage'
import TrackingPage from './pages/TrackingPage'
import ReportsPage from './pages/ReportsPage'
import FaqPage from './pages/FaqPage'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* <Header /> */}
          <Routes>
          {/* <Route path="/calendars" element={<PrivateRoute><CalendarsPage /></PrivateRoute>} /> */}
          <Route exact path="/profiles" element={<UserListPage />} />
          <Route exact path="/profiles/:userId" element={<UserProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/calendars" element={<CalendarsPage />} />
          <Route path="/calendars/:calendarId" element={<CalendarDetailPage />} />
          <Route path="/track" element={<TrackingPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/faq" element={<FaqPage />} />
            <Route path="/" element={
              <PrivateRoute element={HomePage} />
            }/>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
