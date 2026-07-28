'use client'

// Modules
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface FadeUpMotionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
  once?: boolean
  inView?: boolean
}

const FadeUpMotion = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  x = 0,
  y = 18,
  once = true,
  inView = false,
}: FadeUpMotionProps) => {
  const shouldReduceMotion = useReducedMotion()

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        x,
        y,
      }

  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
  }

  const transition = {
    duration: shouldReduceMotion ? 0.15 : duration,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.2, 0, 0, 1] as const,
  }

  if (inView) {
    return (
      <motion.div
        initial={initial}
        whileInView={visible}
        viewport={{
          once,
          amount: 0.2,
        }}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div initial={initial} animate={visible} transition={transition} className={className}>
      {children}
    </motion.div>
  )
}

export default FadeUpMotion
