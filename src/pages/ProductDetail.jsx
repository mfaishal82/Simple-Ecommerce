import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { showLoginRequired } from '../utils/alert'
import useStore from '../store/useStore'

export default function ProductDetail({ isAuthenticated, onLoginRequired }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const addToCart = useStore(state => state.addToCart)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const originalId = (id % 1000) % 20 || 20
        const res = await fetch(`https://fakestoreapi.com/products/${originalId}`)
        if (!res.ok) throw new Error('Failed to fetch product')
        const data = await res.json()
        const modifiedProduct = {
          ...data,
          id: parseInt(id),
          title: document.referrer.includes('/') ? data.title : data.title
        }
        setProduct(modifiedProduct)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      await showLoginRequired()
      onLoginRequired()
      return
    }
    addToCart(product)
    await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  if (loading) {
    return <p className="text-center text-gray-700">Loading product...</p>
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>
  }

  if (!product) {
    return <p className="text-center text-gray-700">Product not found</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link 
          to="/" 
          onClick={(e) => {
            e.preventDefault()
            const categoryElement = document.querySelector(`button[data-category="${product.category}"]`)
            if (categoryElement) {
              categoryElement.click()
            }
          }}
          className="hover:text-blue-600"
        >
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{product.title}</span>
      </nav>

      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>
        <div className="md:w-1/2">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <p className="text-3xl font-bold text-blue-600">
                ${product.price}
              </p>
            </div>
            {product.rating && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Rating</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium">{product.rating.rate}</span>
                  <span className="text-gray-400 text-sm">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isAuthenticated ? 'Add to Cart' : 'Login to Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
