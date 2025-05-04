import React from "react"

export const LoadingDots: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      <span className="w-2 h-2 bg-current rounded-full animate-pulse [animation-delay:0s]"></span>
      <span className="w-2 h-2 bg-current rounded-full animate-pulse [animation-delay:0.2s]"></span>
      <span className="w-2 h-2 bg-current rounded-full animate-pulse [animation-delay:0.4s]"></span>
    </span>
  )
}