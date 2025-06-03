import React, { useState, useEffect } from 'react'

export default function Sidebar({ onSelectCategory, selectedCategory }) {
  const [categories, setCategories] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = React.useRef(null)
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const data = await res.json()
        setCategories(data) // Just get the categories from API
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>      <div
        ref={sidebarRef}
        className={`fixed lg:relative top-0 left-0 h-full w-64 bg-white border border-blue-500 border-r-2 rounded-md shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300 ease-in-out z-40`}
        id='categories'
      >
        {/* Close button for mobile */}        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-20 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 mt-6 max-sm:mt-14">Categories</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  onSelectCategory('all')
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 rounded cursor-pointer hover:bg-gray-100 ${
                  !selectedCategory || selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-600'
                    : ''
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => {
                    onSelectCategory(category.toLowerCase())
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 rounded cursor-pointer hover:bg-gray-100 ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-600'
                      : ''
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>      {/* Open button for mobile */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed z-50 bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <span className="text-xl">📑</span>
          <span className="text-sm font-medium">Categories</span>
        </button>
      )}
    </>
  )
}