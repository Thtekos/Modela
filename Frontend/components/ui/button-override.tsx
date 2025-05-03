"use client"

import { forwardRef } from "react"
import { Button as ShadcnButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ButtonProps as ShadcnButtonProps } from "@/components/ui/button"

export interface ButtonProps extends ShadcnButtonProps {}

// This component ensures consistent styling throughout the app
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, ...props }, ref) => {
  // Add consistent styles based on variant
  const styles = cn(
    {
      // For outline buttons, maintain dark background and white text
      "bg-transparent text-white hover:text-white": variant === "outline",
      // For ghost buttons, ensure hover effect maintains readability
      "text-gray-300 hover:text-white hover:bg-gray-800": variant === "ghost",
      // For default buttons, ensure they stay dark with white text
      "text-white hover:text-white": variant === "default" || !variant,
    },
    className,
  )

  return <ShadcnButton className={styles} variant={variant} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button }
