import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import { showSuccessCheckout, showLoginRequired } from './utils/alert'
import Cart from './pages/Cart'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFailed'
import ProtectedRoute from './components/ProtectedRoute'
import Modal from './components/Modal'
import { login } from './services/authService'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState('johnd')
  const [password, setPassword] = useState('m38rmF$')
  const [loginError, setLoginError] = useState(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems')
    return savedCart ? JSON.parse(savedCart) : []
  })
  function handleAddToCart(product) {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      const newCart = existing
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }]
      
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(newCart))
      return newCart
    })
  }
  function handleUpdateCartQuantity(productId, newQuantity) {
    setCartItems(prev => {
      const newCart = newQuantity === 0
        ? prev.filter(item => item.id !== productId)
        : prev.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
      
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(newCart))
      return newCart
    })
  }  async function handleCheckout() {
    if (!token) {
      openLoginModal()
      return
    }
    // Implement checkout logic here
    await showSuccessCheckout()
    setCartItems([])
    localStorage.removeItem('cartItems') // Clear cart from localStorage
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
  }    async function handleLogin(e) {
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
  }  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('cartItems') // Clear cart from localStorage
    setToken(null)
    setUsername('')
    setPassword('')
    setLoginError(null)
    setShowUserMenu(false)
    setCartItems([]) // Clear cart items on logout
  }  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar
          token={token}
          showUserMenu={showUserMenu}
          onUserIconClick={() => setShowUserMenu(!showUserMenu)}
          onLoginClick={() => setShowLoginModal(true)}
          onLogoutClick={handleLogout}
          cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onSearch={setSearchQuery}
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
          </Modal>        )}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Home searchQuery={searchQuery} />}
            />
            <Route 
              path="/payment-success" 
              element={<PaymentSuccess setCartItems={setCartItems} />} 
            />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/product/:id"
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
            />          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
