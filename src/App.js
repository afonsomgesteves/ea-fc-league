import NavigationBar from './components/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import LeaderboardPage from './pages/LeaderboardPage'
import NewGamePage from './pages/NewGamePage'
import './app.css'
import Header from './components/Header'
import { AuthContextProvider } from './context/AuthContext'
import Protected from './components/Protected'

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/history"
            element={
              <Protected>
                <HistoryPage />
              </Protected>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <Protected>
                <LeaderboardPage />
              </Protected>
            }
          />
          <Route
            path="/newgame"
            element={
              <Protected>
                <NewGamePage />
              </Protected>
            }
          />
        </Routes>
      </div>
      <NavigationBar />
    </AuthContextProvider>
  )
}

export default App
