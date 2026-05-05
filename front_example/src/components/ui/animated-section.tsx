import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

import { cn } from '@/lib/utils'

type AnimatedSectionProps = Omit<HTMLMotionProps<'section'>, 'children'> & {
  children: React.ReactNode
  delay?: number
  once?: boolean
}

function AnimatedSection({
  children,
  className,
  delay = 0,
  once = true,
  transition,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      data-slot="animated-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={transition ?? { duration: 0.35, delay, ease: 'easeOut' }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.section>
  )
}

export { AnimatedSection }
