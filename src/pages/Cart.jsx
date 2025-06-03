import { Link } from 'react-router-dom'
import { showConfirmDelete } from '../utils/alert'
import { createPayment } from '../services/xenditService'
import Swal from 'sweetalert2'
import useStore from '../store/useStore'

export default function Cart() {
  const { cartItems, updateCartQuantity } = useStore()
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const handleCheckout = async () => {
    try {
      const orderData = {
        total: total * 14000, // Convert to IDR
        email: 'customer@example.com', // In real app, get from user profile
        customerName: 'John Doe', // In real app, get from user profile
      };

      // Show loading state
      Swal.fire({
        title: 'Preparing Payment',
        html: `
          <div class="flex flex-col items-center py-4">
            <div class="relative w-12 h-12">
              <div class="absolute inset-0 rounded-full border-[3px] border-blue-100"></div>
              <div class="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#BB1724] animate-[spin_1s_linear_infinite]"></div>
              <div class="absolute inset-0 rounded-full border-[3px] border-transparent border-l-blue-600 animate-[spin_1.2s_linear_infinite_reverse]"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-2 h-2 bg-blue-600 rounded-full opacity-70"></div>
              </div>
            </div>
          </div>
        `.trim(),
        allowOutsideClick: false,
        showConfirmButton: false
      });

      // Create payment and redirect to Xendit
      const result = await createPayment(orderData);
      
      if (!result) {
        throw new Error('Payment creation failed');
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Checkout Failed',
        text: 'There was a problem processing your payment. Please try again.',
      });
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity === 0) {
      const result = await showConfirmDelete();
      if (result.isConfirmed) {
        updateCartQuantity(productId, 0);
      }
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
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
        {cartItems.map((item) => (
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
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
