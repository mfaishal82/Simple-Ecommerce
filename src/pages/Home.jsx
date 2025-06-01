import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../services/productService'
import Sidebar from '../components/Sidebar'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const LIMIT = 8

  // Create refs for tracking
  const observer = useRef()
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) {
        observer.current.observe(node)
      }
    },
    [loading, hasMore]
  )

  // Reset page when category changes
  useEffect(() => {
    setPage(0)
    setProducts([]) // Clear products when category changes
  }, [selectedCategory])

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      try {
        setLoading(true)
        const skip = page * LIMIT
        const data = await fetchProducts(LIMIT, skip, selectedCategory)

        if (isMounted) {
          setProducts((prevProducts) => {
            const newProducts = data.products.filter(
              (newProduct) => !prevProducts.some((prev) => prev.id === newProduct.id)
            )
            return [...prevProducts, ...newProducts]
          })
          setHasMore(data.hasMore)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [page, LIMIT, selectedCategory])

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-4">
      <Sidebar
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      <div className="flex-1 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              ref={index === products.length - 1 ? lastProductElementRef : null}
              className="bg-white rounded shadow p-4 flex flex-col hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 object-contain mb-4"
              />
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-blue-600 font-bold text-xl mt-auto">
                ${product.price}
              </p>
            </Link>
          ))}
        </div>
        {loading && (
          <div className="col-span-full text-center py-4">
            <p className="text-gray-600">Loading more products...</p>
          </div>
        )}
      </div>
    </div>
  )
}
