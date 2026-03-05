"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputGroupVariants = cva(
  "flex items-center w-full rounded-xl bg-gray-50 text-base shadow-sm transition-all duration-300 outline-none border-0 hover:bg-gray-100 hover:shadow-md focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:shadow-lg has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 md:text-sm",
  {
    variants: {
      size: {
        default: "h-11",
        sm: "h-9",
        lg: "h-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface InputGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputGroupVariants> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(inputGroupVariants({ size, className }))}
        {...props}
      />
    )
  }
)
InputGroup.displayName = "InputGroup"

interface InputGroupInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean
}

const InputGroupInput = React.forwardRef<HTMLInputElement, InputGroupInputProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "input"
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex-1 bg-transparent px-4 py-2.5 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed text-base md:text-sm",
          className
        )}
        {...props}
      />
    )
  }
)
InputGroupInput.displayName = "InputGroupInput"

interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "inline-start" | "inline-end"
  asChild?: boolean
}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align = "inline-end", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200",
          align === "inline-start" && "pl-4",
          align === "inline-end" && "pr-4",
          "[&>svg]:h-5 [&>svg]:w-5",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
InputGroupAddon.displayName = "InputGroupAddon"

export { InputGroup, InputGroupInput, InputGroupAddon }
