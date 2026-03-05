import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-blue-500/20",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-slate-900 to-blue-900 text-white hover:from-slate-800 hover:to-blue-800 shadow-md hover:shadow-xl hover:scale-105 active:scale-95",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-xl hover:scale-105 active:scale-95",
        outline:
          "border-2 border-gray-300 bg-white text-black hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md hover:scale-105 active:scale-95",
        secondary:
          "bg-gray-100 text-black hover:bg-gray-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95",
        ghost:
          "text-black hover:bg-gray-100 hover:scale-105 active:scale-95",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
      },
      size: {
        default: "h-11 px-6 py-2.5 has-[>svg]:px-4",
        xs: "h-7 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 rounded-lg gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-lg px-8 text-base has-[>svg]:px-5",
        icon: "size-11",
        "icon-xs": "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
