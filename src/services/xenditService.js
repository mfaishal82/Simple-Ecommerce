// WARNING: This is NOT secure for production. API keys should never be exposed in frontend code
const API_URL = 'https://api.xendit.co';
const XENDIT_KEY = import.meta.env.VITE_XENDIT_KEY;

export const createPayment = async (orderData) => {
  try {
    if (!XENDIT_KEY) {
      throw new Error('Xendit API key is not configured');
    }

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(XENDIT_KEY + ':'));
    headers.append('Content-Type', 'application/json');

    const data = {
      external_id: `order-${Date.now()}`,
      amount: orderData.total,
      payer_email: orderData.email,
      description: 'SimpleMART Order',
      success_redirect_url: window.location.origin + '/payment-success',
      failure_redirect_url: window.location.origin + '/payment-failed'
    };

    const response = await fetch(`${API_URL}/v2/invoices`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create invoice');
    }

    const invoice = await response.json();
    
    // Redirect to Xendit Invoice page
    if (invoice.invoice_url) {
      window.location.href = invoice.invoice_url;
      return invoice;
    } else {
      throw new Error('Invalid invoice response from Xendit');
    }
    
  } catch (error) {
    console.error('Error creating Xendit payment:', error);
    throw error;
  }
};

/*
Untuk mengimplementasikan Xendit payment gateway secara aman, sebaiknya tetap menggunakan backend karena:

1. Secret key/API key Xendit tidak boleh terekspos di frontend (client-side) karena alasan keamanan
2. Callback/webhook dari Xendit untuk payment status updates memerlukan endpoint backend
3. Validasi pembayaran perlu dilakukan di sisi server

Namun, untuk tujuan demo atau prototype, kita bisa menggunakan Xendit test environment dengan cara yang lebih sederhana menggunakan pendekatan redirect ke invoice URL. Tapi perlu diingat ini TIDAK AMAN untuk production
*/