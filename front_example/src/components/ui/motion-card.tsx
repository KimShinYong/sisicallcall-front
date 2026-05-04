import type { ReactNode } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

type MotionCardProps = HTMLMotionProps<"div"> & {
  children: ReactNode
}

function MotionCard({
  children,
  className,
  transition,
  viewport,
  ...props
}: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ margin: "-40px", ...viewport, once: viewport?.once ?? true }}
      transition={{ duration: 0.22, ease: "easeOut", ...transition }}
      className={cn(
        "rounded-2xl border bg-card p-5 text-card-foreground shadow-sm backdrop-blur",
        "transition-shadow hover:shadow-lg hover:shadow-primary/5",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        "dark:bg-card/90",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { MotionCard }
