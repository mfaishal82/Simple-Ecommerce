export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-none bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
