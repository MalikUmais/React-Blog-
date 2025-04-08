// import React from 'react'

// function Button({
//     children,
//     type = 'button',
//     bgColor = 'bg-indigo-600',
//     textColor = 'text-white',
//     className = '',
//     fullWidth = false,
//     ...props
// }) {
//   return (
//     <button
//       className={`
//         px-4 py-2 rounded-full font-medium
//         ${bgColor} ${textColor}
//         hover:shadow-md transition-all duration-300
//         focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50
//         ${fullWidth ? 'w-full' : ''}
//         ${className}
//       `}
//       type={type}
//       {...props}
//     >
//       {children}
//     </button>
//   )
// }

// export default Button

function Button({
  children,
  type = "button",
  bgColor = "bg-indigo-600",
  textColor = "text-white",
  className = "",
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={`
        px-4 py-2 rounded-full font-medium
        ${bgColor} ${textColor} 
        hover:shadow-md transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        active:scale-[0.98] transform 
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
