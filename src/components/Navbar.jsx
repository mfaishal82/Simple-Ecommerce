import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ token, onUserIconClick, showUserMenu, onLoginClick, onLogoutClick, cartItemsCount, onSearch }) {
  const menuRef = useRef(null)
  const [menuVisible, setMenuVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const navigate = useNavigate()
  // Handle menu visibility
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMenuVisible(false)
      }
    }

    // Add event listeners only when menu is visible
    if (menuVisible) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [menuVisible])

  // Handle search submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
      navigate('/')
      setIsSearchVisible(false)
    }
  }

  // Debounce search for real-time filtering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch && onSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery, onSearch])

  // Close search on route change
  useEffect(() => {
    setIsSearchVisible(false)
  }, [navigate])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="bg-[#BB1724] sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href='/' 
            // to="/" 
            className="text-2xl font-['Impact'] text-blue-500 tracking-wider"
            style={{ 
              letterSpacing: '0.5px',
              textShadow: `
                -1px -1px 0 #fff,
                 1px -1px 0 #fff,
                -1px  1px 0 #fff,
                 1px  1px 0 #fff
              `
            }}
          >
            Simple<span className='text-red-600'>MART</span>
          </a>

          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Desktop Search */}
            <form onSubmit={handleSearchSubmit} className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-[300px] rounded-full bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Mobile Search Icon */}
            <button 
              className="md:hidden text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              aria-label="Toggle search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Contact Icon Options - Uncomment the one you prefer */}
            <button
              onClick={scrollToContact}
              className="text-white hover:text-gray-200 focus:outline-none cursor-pointer"
              aria-label="Contact"
            >
              {/* Option 1: Phone icon - Good for direct contact representation */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>

              {/* Option 2: Support/Chat icon - Modern customer service look */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg> */}

              {/* Option 3: Question/Help icon - Good for support/FAQ context */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg> */}

              {/* Option 4: Location/Address icon - Good if focusing on physical location */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg> */}
            </button>

            {token && (
              <div className="relative inline-flex items-center justify-center">
                <Link
                  to="/cart"
                  aria-label="Cart"
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-[#BB1724] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#BB1724]">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            )}
            
            <div className="relative inline-flex items-center justify-center" ref={menuRef}>
              <button
                aria-label="User"
                onClick={() => setMenuVisible(!menuVisible)}
                className="text-white hover:text-gray-200 focus:outline-none cursor-pointer relative"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {!token && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
              {menuVisible && (                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden py-2 transform origin-top-right transition-all duration-200 ease-out">
                  {!token ? (
                    <button
                      onClick={() => {
                        setMenuVisible(false)
                        onLoginClick()
                      }}                      className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition duration-150 cursor-pointer font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setMenuVisible(false)}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition duration-150 cursor-pointer font-medium border-b border-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setMenuVisible(false)
                          onLogoutClick()
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition duration-150 cursor-pointer font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Search Bar */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchVisible ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
