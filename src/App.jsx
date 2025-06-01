import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import Modal from './components/Modal'
import { login } from './services/authService'
import './App.css'

function App() {  const [token, setToken] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState('johnd')
  const [password, setPassword] = useState('m38rmF$')
  const [loginError, setLoginError] = useState(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [cartItems, setCartItems] = useState([])

  function handleAddToCart(product) {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function handleUpdateCartQuantity(productId, newQuantity) {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId))
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  function handleCheckout() {
    if (!token) {
      openLoginModal()
      return
    }
    // Implement checkout logic here
    alert('Thank you for your purchase!')
    setCartItems([])
  }

  function toggleUserMenu() {
    setShowUserMenu((prev) => !prev)
  }

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
    setCartItems([]) // Clear cart items on logout
  }
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar
          token={token}
          onUserIconClick={toggleUserMenu}
          showUserMenu={showUserMenu}
          onLoginClick={openLoginModal}
          onLogoutClick={handleLogout}
          cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route              path="/product/:id"
              element={
                <ProductDetail
                  onAddToCart={handleAddToCart}
                  isAuthenticated={!!token}
                  onLoginRequired={openLoginModal}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute
                  isAuthenticated={!!token}
                  onLoginRequired={openLoginModal}
                >
                  <Cart
                    items={cartItems}
                    onUpdateQuantity={handleUpdateCartQuantity}
                    onCheckout={handleCheckout}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
