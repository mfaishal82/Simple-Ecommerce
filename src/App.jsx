import { useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useStore from './store/useStore'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import { showSuccessCheckout, showLoginRequired } from './utils/alert'
import Cart from './pages/Cart'
import PaymentSuccess from './pages/PaymentSuccess'
import Profile from './pages/Profile'
import PaymentFailed from './pages/PaymentFailed'
import ProtectedRoute from './components/ProtectedRoute'
import Modal from './components/Modal'
import { login } from './services/authService'
import Footer from './components/Footer'
import './App.css'

function App() {
  const {
    token,
    setToken,
    cartItems,
    clearCart,
    searchQuery,
    setSearchQuery,
    logout
  } = useStore()

  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState('johnd')
  const [password, setPassword] = useState('m38rmF$')
  const [loginError, setLoginError] = useState(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const searchRef = useRef(null)

  function openLoginModal() {
    setShowLoginModal(true)
    setShowUserMenu(false)
  }

  function closeLoginModal() {
    setShowLoginModal(false)
    setUsername('johnd')
    setPassword('m38rmF$')
    setLoginError(null)
  }    

  async function handleLogin(e) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError(null)
    try {
      const token = await login(username, password)
      localStorage.setItem('token', token)
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
    logout()
    setUsername('')
    setPassword('')
    setLoginError(null)
    setShowUserMenu(false)
  }  

  // Search handlers
  const handleSearch = async (query) => {
    setSearchQuery(query)
  }

  const handleSearchSubmit = (query) => {
    setSearchQuery(query)
    if (searchRef.current) {
      searchRef.current.handleSearchSubmit(query)
    }
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar
          token={token}
          showUserMenu={showUserMenu}
          onUserIconClick={() => setShowUserMenu(!showUserMenu)}
          onLoginClick={() => setShowLoginModal(true)}
          onLogoutClick={handleLogout}
          cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onSearch={handleSearch}
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

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Home 
                searchQuery={searchQuery} 
                ref={searchRef}
              />}
            />
            <Route 
              path="/payment-success" 
              element={<PaymentSuccess />} 
            />
            <Route path="/payment-failed" element={<PaymentFailed />} />            <Route path="/product/:id"
              element={
                <ProductDetail
                  isAuthenticated={!!token}
                  onLoginRequired={openLoginModal}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isAuthenticated={!!token}
                  onLoginRequired={openLoginModal}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute
                  isAuthenticated={!!token}
                  onLoginRequired={openLoginModal}
                >
                  <Cart />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
