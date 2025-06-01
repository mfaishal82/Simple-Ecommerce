import Swal from 'sweetalert2'

export const showConfirmDelete = () => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "This item will be removed from your cart",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, remove it!',
    cancelButtonText: 'Cancel'
  })
}

export const showSuccessCheckout = () => {
  return Swal.fire({
    title: 'Thank you for your purchase!',
    text: 'Your order has been processed successfully',
    icon: 'success',
    confirmButtonColor: '#3085d6',
  })
}

export const showLoginRequired = () => {
  return Swal.fire({
    title: 'Login Required',
    text: 'Please login to continue shopping',
    icon: 'info',
    confirmButtonColor: '#3085d6',
  })
}
