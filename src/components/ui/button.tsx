
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700",
        "3d": "btn-3d bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 relative overflow-hidden shadow-[0_6px_0_rgb(59,113,202)] hover:shadow-[0_3px_0_rgb(59,113,202)] translate-y-0 hover:translate-y-1 active:translate-y-2 transition-all duration-200",
        "3d-green": "btn-3d bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 relative overflow-hidden shadow-[0_6px_0_rgb(22,163,74)] hover:shadow-[0_3px_0_rgb(22,163,74)] translate-y-0 hover:translate-y-1 active:translate-y-2 transition-all duration-200",
        "3d-purple": "btn-3d bg-gradient-to-r from-purple-400 to-indigo-500 text-white border-0 relative overflow-hidden shadow-[0_6px_0_rgb(128,63,173)] hover:shadow-[0_3px_0_rgb(128,63,173)] translate-y-0 hover:translate-y-1 active:translate-y-2 transition-all duration-200",
        "glassmorphic": "bg-white/40 backdrop-blur-md border border-white/20 shadow-sm text-gray-800 hover:bg-white/60 transition-all duration-300",
        "neon": "relative bg-black text-white overflow-hidden transition-all duration-500 border-2 border-transparent hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 text-base rounded-md px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
