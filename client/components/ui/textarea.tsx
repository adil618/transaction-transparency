import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-gray-400 aria-invalid:ring-2 aria-invalid:ring-red-500/20 aria-invalid:bg-red-50 flex field-sizing-content min-h-24 w-full rounded-xl bg-gray-50 px-4 py-3 text-base shadow-sm transition-all duration-300 outline-none border-0 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg hover:bg-gray-100 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
