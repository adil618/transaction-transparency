import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-400 selection:bg-primary selection:text-primary-foreground h-11 w-full min-w-0 rounded-xl bg-gray-50 px-4 py-2.5 text-base shadow-sm transition-all duration-300 outline-none border-0 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:bg-gray-100 hover:shadow-md",
        "focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg",
        "aria-invalid:ring-2 aria-invalid:ring-red-500/20 aria-invalid:bg-red-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
