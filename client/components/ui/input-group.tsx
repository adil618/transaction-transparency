"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputGroupVariants = cva(
  "flex items-center w-full rounded-md border border-input bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 md:text-sm",
  {
    variants: {
      size: {
        default: "h-9",
        sm: "h-8",
        lg: "h-10",
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
          "flex-1 bg-transparent px-3 py-2 placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed",
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
          "flex items-center justify-center text-muted-foreground",
          align === "inline-start" && "pl-3",
          align === "inline-end" && "pr-3",
          "[&>svg]:h-4 [&>svg]:w-4",
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
