import { useState, useEffect, useRef } from 'react'

export default function Navbar({ token, onUserIconClick, showUserMenu, onLoginClick, onLogoutClick }) {
  const menuRef = useRef(null)
  const [menuVisible, setMenuVisible] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false)
      }
    }
    if (menuVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuVisible])

  function toggleMenu() {
    setMenuVisible((prev) => !prev)
  }

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center max-w-7xl mx-auto relative">
      <div className="text-2xl font-bold text-blue-600">SimpleMart</div>
      <div className="flex items-center space-x-6">
        <button
          aria-label="Cart"
          className="relative text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          🛒
          {/* You can add cart item count badge here */}
        </button>
        <div className="relative" ref={menuRef}>
          <button
            aria-label="User"
            onClick={toggleMenu}
            className="relative text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            👤
            {!token && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </button>
          {menuVisible && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-50">
              {!token ? (
                <button
                  onClick={() => {
                    toggleMenu()
                    onLoginClick()
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    toggleMenu()
                    onLogoutClick()
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
