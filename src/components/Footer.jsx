import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#BB1724] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About SimpleMART</h3>
            <p className="text-gray-200 text-sm">
              SimpleMART is an e-commerce platform providing high-quality products
              at the best prices. We are committed to delivering a secure and
              seamless online shopping experience.
            </p>
          </div>          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-200 hover:text-white">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <a href="/#categories" className="text-gray-200 hover:text-white">
                  Categories
                </a>
              </li>
            </ul>
          </div>          {/* Contact Info */}
          <div id="contact-section">
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-200">
                  123 SimpleMART Street, Jakarta
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+6281234567890" className="text-gray-200 hover:text-white">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@simplemart.com" className="text-gray-200 hover:text-white">
                  info@simplemart.com
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Payment Methods</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white/10 px-3 py-2 rounded">QRIS</div>
              <div className="bg-white/10 px-3 py-2 rounded">GoPay</div>
              <div className="bg-white/10 px-3 py-2 rounded">DANA</div>
              <div className="bg-white/10 px-3 py-2 rounded">Bank Transfer</div>
            </div>
          </div>
        </div>        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-gray-300">
          <p>© {new Date().getFullYear()} SimpleMART. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
