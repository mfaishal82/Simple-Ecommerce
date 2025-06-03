export async function fetchProducts(limit = 8, skip = 0, category = 'all') {
  // Add artificial delay of 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));

  const res = await fetch('https://fakestoreapi.com/products')
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  const originalData = await res.json()
    let productsToUse = category === 'all' ? originalData : originalData.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );

  // Generate more products for infinite scroll by repeating and modifying the data
  const repeatCount = Math.floor(skip / productsToUse.length) + 1;
  const allData = Array(repeatCount).fill(null).flatMap((_, repeatIndex) =>    productsToUse.map((product) => ({
      ...product,
      id: product.id + (repeatIndex * 1000) // Make IDs unique across pages
    }))
  );

  // Apply pagination
  const startIndex = skip;
  const endIndex = startIndex + limit;
  const paginatedData = allData.slice(startIndex, endIndex);

  return {
    products: paginatedData,
    hasMore: true, // Always true for infinite scroll
    total: allData.length
  }
}

export async function searchProducts(query) {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    
    // Filter products by title match
    const filteredProducts = data.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    
    return {
      products: filteredProducts,
      hasMore: false
    }
  } catch (error) {
    console.error('Error searching products:', error)
    throw error
  }
}
