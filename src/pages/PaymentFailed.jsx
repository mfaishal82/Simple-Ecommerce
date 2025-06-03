import { Link } from 'react-router-dom';

export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-8">
            <svg className="h-10 w-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Payment Failed
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We're sorry, but there was an error processing your payment. Please try again.
          </p>
          <div className="space-y-4">
            <Link
              to="/cart"
              className="w-full inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-150 cursor-pointer"
            >
              Return to Cart
            </Link>
            <Link
              to="/"
              className="w-full inline-flex justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
