export default function LoadingSpinner({ size = "large" }) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16"
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-blue-100"></div>
          {/* First spinning ring (red) */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#BB1724] animate-[spin_1s_linear_infinite]"></div>
        
        {/* Second spinning ring (blue) */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-l-blue-600 animate-[spin_1.2s_linear_infinite_reverse]"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`
            ${size === 'small' ? 'w-1.5 h-1.5' : size === 'medium' ? 'w-2 h-2' : 'w-3 h-3'}
            bg-blue-600 rounded-full opacity-70
          `}></div>
        </div>
      </div>
    </div>
  )
}
