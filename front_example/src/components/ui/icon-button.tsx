import type { ButtonHTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
}

function IconButton({
  label,
  className,
  children,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel ?? label}
      data-slot="icon-button"
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-background text-foreground shadow-sm",
        "transition-all hover:bg-accent hover:text-accent-foreground active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { IconButton }
