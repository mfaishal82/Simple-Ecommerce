import { useState, useEffect } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const res = await fetch('https://fakestoreapi.com/products')
        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return <p className="text-center text-gray-700">Loading products...</p>
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded shadow p-4 flex flex-col"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-48 object-contain mb-4"
          />
          <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
          <p className="text-blue-600 font-bold text-xl">${product.price}</p>
        </div>
      ))}
    </div>
  )
}
