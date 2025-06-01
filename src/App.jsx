import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import Home from './pages/Home'
import Modal from './components/Modal'
import { login } from './services/authService'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)
  const [loginLoading, setLoginLoading] = useState(false)

  function toggleUserMenu() {
    setShowUserMenu((prev) => !prev)
  }

  function openLoginModal() {
    setShowLoginModal(true)
    setShowUserMenu(false)
  }

  function closeLoginModal() {
    setShowLoginModal(false)
    setUsername('')
    setPassword('')
    setLoginError(null)
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError(null)
    try {
      const token = await login(username, password)
      setToken(token)
      closeLoginModal()
    } catch (err) {
      setLoginError(err.message)
      setToken(null)
    } finally {
      setLoginLoading(false)
    }
  }

  function handleLogout() {
    setToken(null)
    setUsername('')
    setPassword('')
    setLoginError(null)
    setShowUserMenu(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        token={token}
        onUserIconClick={toggleUserMenu}
        showUserMenu={showUserMenu}
        onLoginClick={openLoginModal}
        onLogoutClick={handleLogout}
      />
      {showLoginModal && (
        <Modal onClose={closeLoginModal}>
          <LoginForm
            username={username}
            password={password}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleLogin}
            loading={loginLoading}
            error={loginError}
          />
        </Modal>
      )}
      <main className="p-4">
        <Home />
      </main>
    </div>
  )
}

export default App
