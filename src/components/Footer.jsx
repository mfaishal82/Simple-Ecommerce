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
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span className="text-gray-200">
                  123 SimpleMART Street, Jakarta
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+6281234567890" className="text-gray-200 hover:text-white">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
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
