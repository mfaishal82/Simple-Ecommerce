import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetail({ onAddToCart, isAuthenticated, onLoginRequired }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      onLoginRequired()
      return
    }
    onAddToCart(product)
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!res.ok) throw new Error('Failed to fetch product')
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

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
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600 mb-6">
            ${product.price}
          </p>
          <button            onClick={() => handleAddToCart(product)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isAuthenticated ? 'Add to Cart' : 'Login to Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
