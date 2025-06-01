export async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  const data = await res.json()
  return data
}
