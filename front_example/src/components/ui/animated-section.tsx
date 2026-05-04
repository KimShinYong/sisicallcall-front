import type { ReactNode } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

type AnimatedSectionProps = Omit<HTMLMotionProps<"section">, "children"> & {
  children: ReactNode
  delay?: number
  once?: boolean
}

function AnimatedSection({
  children,
  className,
  delay = 0,
  once = true,
  transition,
  viewport,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-80px", ...viewport, once }}
      transition={{ duration: 0.35, delay, ease: "easeOut", ...transition }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}

export { AnimatedSection }
