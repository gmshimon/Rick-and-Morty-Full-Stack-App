'use client'
const Loading = () => {
  return (
    <div className='flex'>
      <svg
        className={`
          animate-spin
          duration-1000 hover:duration-500
       
        `}
        style={{ width: 44, height: 44 }}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0l4 4-4 4V4a8 8 0 00-8 8z"
        />
      </svg>
    </div>
  )
}

export default Loading
