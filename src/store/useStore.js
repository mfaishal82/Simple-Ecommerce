import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // Auth State
      token: null,
      setToken: (token) => set({ token }),
      logout: () => {
        set({ token: null, cartItems: [] })
        localStorage.removeItem('token')
      },

      // Cart State
      cartItems: [],
      addToCart: (product) => {
        const items = get().cartItems
        const existing = items.find(item => item.id === product.id)
        
        if (existing) {
          set({
            cartItems: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({ cartItems: [...items, { ...product, quantity: 1 }] })
        }
      },
      updateCartQuantity: (productId, newQuantity) => {
        const items = get().cartItems
        if (newQuantity === 0) {
          set({ cartItems: items.filter(item => item.id !== productId) })
        } else {
          set({
            cartItems: items.map(item =>
              item.id === productId ? { ...item, quantity: newQuantity } : item
            )
          })
        }
      },
      clearCart: () => set({ cartItems: [] }),

      // Category State
      selectedCategory: 'all',
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      // Search State
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'simplemart-storage',
      partialize: (state) => ({ 
        token: state.token,
        cartItems: state.cartItems 
      })
    }
  )
)

export default useStore
