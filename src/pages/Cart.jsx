import { useState } from 'react'
import { Link } from 'react-router-dom'
import { showConfirmDelete } from '../utils/alert'
import { createPayment } from '../services/xenditService'
import Swal from 'sweetalert2'

export default function Cart({ items, onUpdateQuantity, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const handleCheckout = async () => {
    try {
      const orderData = {
        total: total * 14000, // Convert to IDR
        email: 'customer@example.com', // In real app, get from user profile
        customerName: 'John Doe', // In real app, get from user profile
      }

      // Show loading state
      const loading = Swal.fire({
        title: 'Preparing Payment',
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })

      // Create payment and redirect to Xendit
      await createPayment(orderData)
      
      // The page will be redirected to Xendit, so we don't need to call onCheckout
    } catch (error) {
      console.error('Checkout error:', error)
      Swal.fire({
        icon: 'error',
        title: 'Checkout Failed',
        text: 'There was a problem processing your payment. Please try again.',
      })
    }
  }

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity === 0) {
      const result = await showConfirmDelete()
      if (result.isConfirmed) {
        onUpdateQuantity(productId, 0)
      }
    } else {
      onUpdateQuantity(productId, newQuantity)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 py-4 border-b last:border-0"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-blue-600">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleQuantityChange(item.id, Math.max(0, item.quantity - 1))
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCheckout}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
