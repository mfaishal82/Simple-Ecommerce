# State Management dengan Zustand di SimpleMART

## Instalasi dan Setup

### 1. Install Zustand
```bash
# Menggunakan npm
npm install zustand

# Atau menggunakan yarn
yarn add zustand

# Atau menggunakan pnpm
pnpm add zustand
```

### 2. Setup Store Dasar
```javascript
// src/store/useStore.js
import { create } from 'zustand'

const useStore = create((set) => ({
  // Initial state
  count: 0,
  // Actions
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 }))
}))

export default useStore
```

### 3. Menambahkan Persistensi
```javascript
// src/store/useStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      // State & actions here
    }),
    {
      name: 'storage-name', // nama untuk localStorage key
      partialize: (state) => ({
        // Pilih state yang ingin dipersist
        someData: state.someData
      })
    }
  )
)
```

### 4. Penggunaan Dasar di Komponen
```javascript
import useStore from '../store/useStore'

function MyComponent() {
  // Mengambil state dan actions
  const { count, increment } = useStore()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

### 5. Best Practices Setup
- Pisahkan store dalam file terpisah
- Gunakan TypeScript untuk type safety (opsional)
- Pertimbangkan penggunaan devtools
- Struktur store dengan baik dari awal

Dokumen ini menjelaskan implementasi state management menggunakan Zustand di aplikasi SimpleMART.

## Struktur State

State global dibagi menjadi beberapa kategori utama:

### 1. Auth State
```javascript
{
  token: null,         // Menyimpan token autentikasi
  setToken: (token),   // Fungsi untuk mengupdate token
  logout: ()          // Fungsi untuk logout dan membersihkan state
}
```

### 2. Cart State
```javascript
{
  cartItems: [],                          // Array produk di keranjang
  addToCart: (product),                   // Menambah item ke keranjang
  updateCartQuantity: (productId, qty),   // Update jumlah item
  clearCart: ()                           // Kosongkan keranjang
}
```

### 3. Category State
```javascript
{
  selectedCategory: 'all',              // Kategori yang aktif
  setSelectedCategory: (category)       // Mengubah kategori
}
```

### 4. Search State
```javascript
{
  searchQuery: '',                    // Query pencarian
  setSearchQuery: (query)            // Update query pencarian
}
```

## Persistensi Data

Menggunakan middleware `persist` untuk menyimpan data di localStorage:

```javascript
persist(
  (set, get) => ({
    // ... state and actions
  }),
  {
    name: 'simplemart-storage',
    partialize: (state) => ({ 
      token: state.token,
      cartItems: state.cartItems 
    })
  }
)
```

Hanya `token` dan `cartItems` yang disimpan di localStorage, sementara state lainnya akan reset saat refresh.

## Penggunaan di Komponen

### 1. Di Cart.jsx
```javascript
const { cartItems, updateCartQuantity } = useStore()

// Mengupdate quantity
const handleQuantityChange = (productId, newQuantity) => {
  updateCartQuantity(productId, newQuantity)
}
```

### 2. Di ProductDetail.jsx
```javascript
const addToCart = useStore(state => state.addToCart)

// Menambah ke keranjang
const handleAddToCart = (product) => {
  addToCart(product)
}
```

### 3. Di Home.jsx
```javascript
const { 
  selectedCategory,
  setSelectedCategory,
  searchQuery
} = useStore()

// Filter produk berdasarkan searchQuery
products.filter(product => {
  if (!searchQuery) return true;
  const query = searchQuery.toLowerCase();
  return product.title.toLowerCase().includes(query)
})
```

### 4. Di App.jsx
```javascript
const {
  token,
  setToken,
  cartItems,
  clearCart,
  searchQuery,
  setSearchQuery,
  logout
} = useStore()

// Handle logout
const handleLogout = () => {
  logout()
}
```

## Pendekatan Implementasi

Dalam mengimplementasikan state management dengan Zustand, tidak ada urutan kaku yang harus diikuti. Berikut beberapa pendekatan yang bisa dipilih:

### 1. Pendekatan Per Fitur
```javascript
// Bebas memilih mulai dari:
- Auth State (token, login, logout)
- Cart State (items, add, update, remove)
- Category State (filter produk)
- Search State (pencarian produk)
```

### 2. Pendekatan Per Halaman
```javascript
// Fokus satu halaman sampai selesai
1. Home.jsx
   - Category state
   - Search state
   - Product listing
   
2. Cart.jsx
   - Cart state
   - Quantity updates
   - Checkout flow
   
3. ProductDetail.jsx
   - Product state
   - Add to cart
   - Category navigation
```

### 3. Pendekatan Per Flow
```javascript
// Mengikuti journey pengguna
1. Authentication Flow
   - Login
   - Logout
   - Token management
   
2. Shopping Flow
   - Browse products
   - Search/filter
   - View details
   
3. Cart Flow
   - Add to cart
   - Update quantity
   - Checkout
```

### 4. Pendekatan Prioritas
```javascript
// Berdasarkan kepentingan fitur
1. Core Features
   - Shopping cart (bisnis utama)
   - Auth (keamanan)
   
2. Enhancement Features
   - Category filter
   - Search functionality
   
3. Additional Features
   - Wishlist
   - User preferences
```

### Tips Implementasi

1. **Mulai dari Yang Sederhana**
   ```javascript
   // Basic state
   const simpleState = {
     data: [],
     setData: (newData) => set({ data: newData })
   }
   
   // Berkembang ke kompleks
   const enhancedState = {
     data: [],
     setData: (newData) => set({ data: newData }),
     addItem: (item) => set(state => ({ 
       data: [...state.data, item] 
     })),
     updateItem: (id, newData) => set(state => ({
       data: state.data.map(item => 
         item.id === id ? { ...item, ...newData } : item
       )
     }))
   }
   ```

2. **Incremental Development**
   - Buat fitur dasar
   - Test fungsionalitas
   - Tambah fitur lanjutan
   - Optimasi performance

3. **Integrasi Bertahap**
   - Integrasikan ke komponen satu per satu
   - Test setiap integrasi
   - Pastikan tidak ada regresi

### Kunci Sukses

1. **Konsistensi**
   - Ikuti pola yang sama untuk state serupa
   - Gunakan penamaan yang konsisten
   - Dokumentasikan setiap perubahan

2. **Testing**
   - Test setiap perubahan state
   - Verifikasi update UI
   - Cek persistensi data

3. **Maintenance**
   - Keep it simple
   - Pisahkan logic kompleks
   - Dokumentasi yang jelas

4. **Monitoring**
   - Pantau performance
   - Cek memory leaks
   - Debug state changes

## Keunggulan Implementasi

1. **Pemisahan Concerns**
   - State dikelompokkan berdasarkan fungsi (auth, cart, search, category)
   - Setiap kelompok memiliki actions tersendiri
   - Mudah untuk maintenance dan scaling

2. **Optimasi Performance**
   - Menggunakan selector untuk mencegah re-render yang tidak perlu
   - State yang persistent dipisahkan dari state sementara
   - Penggunaan `get()` untuk mengakses state terbaru dalam actions

3. **User Experience**
   - Cart items tersimpan setelah refresh browser
   - Login state persistent
   - Transisi state yang smooth

4. **Developer Experience**
   - Tidak ada boilerplate yang berlebihan
   - Actions terdefinisi jelas
   - Mudah debugging dengan devtools

## Tips Penggunaan

1. **Selector**
   ```javascript
   // Gunakan selector untuk performance
   const token = useStore(state => state.token)
   ```

2. **Multiple State**
   ```javascript
   // Ambil beberapa state sekaligus
   const { token, cartItems } = useStore()
   ```

3. **Action Composition**
   ```javascript
   // Action bisa menggunakan action lain
   logout: () => {
     clearCart()
     set({ token: null })
   }
   ```

4. **Computed Values**
   ```javascript
   // Hitung total cart
   const total = cartItems.reduce((sum, item) => 
     sum + item.price * item.quantity, 0
   )
   ```

## Debugging

Untuk debugging state, bisa menggunakan browser devtools:
1. Buka Application tab
2. Lihat di Local Storage
3. Cari key 'simplemart-storage'

## Catatan Penting

1. Jangan simpan data sensitif di state persistent
2. Gunakan selector untuk optimasi performance
3. State persistent sebaiknya minimal
4. Validasi data sebelum masuk ke state
5. Selalu handle error state
