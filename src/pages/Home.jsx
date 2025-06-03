import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { fetchProducts, searchProducts } from '../services/productService'
import Sidebar from '../components/Sidebar'
import useStore from '../store/useStore'

const Home = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const { 
    selectedCategory,
    setSelectedCategory,
    searchQuery
  } = useStore()
  
  const LIMIT = 8;

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

  useImperativeHandle(ref, () => ({
    handleSearchSubmit: async (query) => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchProducts(query);
        setProducts(data.products);
        setHasMore(false); // Disable infinite scroll for search results
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }));

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-4 h-[calc(100vh-5rem)]">
      <Sidebar
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div className="flex-1 min-w-0 overflow-y-auto">
        {/* No Results Message */}
        {products.length > 0 && searchQuery && !products.some(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        ) && (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada produk yang cocok dengan pencarian "{searchQuery}"</p>
          </div>
        )}

        <div className="bg-gray-50 p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products
            .filter(product => {
              if (!searchQuery) return true;
              const query = searchQuery.toLowerCase();
              return (
                product.title.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                (product.description?.toLowerCase() || '').includes(query)
              );
            })
            .map((product, index) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                ref={index === products.length - 1 ? lastProductElementRef : null}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
              >                <div className="relative pt-[100%] border-b-0 overflow-hidden">
                  <div className="absolute inset-0 p-4 flex items-center justify-center bg-white">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain transition-all duration-300 opacity-0 onload:opacity-100 group-hover:scale-110"
                      onLoad={(e) => e.target.classList.add('opacity-100')}
                    />
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full capitalize">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-1 border-t border-gray-100">
                  <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  {product.rating && (
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating.rate)
                                ? 'fill-current'
                                : 'fill-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-500">
                        ({product.rating.count})
                      </span>
                    </div>
                  )}

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2">
                      <p className="text-lg sm:text-xl font-semibold text-blue-600">
                        ${product.price}
                      </p>
                      <p className="text-xs text-gray-400 line-through">
                        ${(product.price * 1.2).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-xs text-green-600 font-medium mt-1">
                      Save 20%
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>        {loading && (
          <div className="col-span-full py-4 flex flex-col items-center">
            <LoadingSpinner size="medium" />
            <p className="text-gray-600 mt-2">Loading more products...</p>
          </div>
        )}
      </div>
    </div>
  )
});

export default Home;
