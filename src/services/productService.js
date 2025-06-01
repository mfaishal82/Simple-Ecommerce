export async function fetchProducts(limit = 8, skip = 0, category = 'all') {
  // Add artificial delay of 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));

  const res = await fetch('https://fakestoreapi.com/products')
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  const originalData = await res.json()
  
  // Filter by category if specified
  const filteredData = category === 'all' 
    ? originalData 
    : originalData.filter(product => product.category === category)

  // Create an array of products by repeating the filtered data
  const allData = Array(10).fill(null).flatMap(() =>
    filteredData.map((product, index) => ({
      ...product,
      id: product.id + (index * 1000) + (skip * 100), // Ensure unique IDs
      title: `${product.title} (${Math.floor(skip/8) + 1}-${index + 1})` // Add page number to title
    }))
  )
  
  // Simulate pagination by slicing the data
  const paginatedData = allData.slice(0, limit)
  
  // Always return hasMore as true to simulate infinite data
  return {
    products: paginatedData,
    hasMore: true, // Always true to simulate infinite scroll
    total: allData.length
  }
}
