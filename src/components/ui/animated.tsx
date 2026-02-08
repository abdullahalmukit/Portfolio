import { motion } from "framer-motion";
import { useMotion } from "@/contexts/MotionContext";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface AnimatedDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Helper to filter out incompatible props for motion components
const filterMotionProps = (props: React.HTMLAttributes<HTMLElement>) => {
  const { 
    onDrag, onDragStart, onDragEnd, 
    onAnimationStart, onAnimationEnd, onAnimationIteration,
    onTransitionEnd, 
    ...filteredProps 
  } = props;
  return filteredProps;
};

export function AnimatedSection({ 
  children, 
  className,
  delay = 0,
  ...props 
}: AnimatedSectionProps) {
  const { shouldAnimate, shouldReduceMotion } = useMotion();

  if (!shouldAnimate) {
    return (
      <section className={cn(className)} {...props}>
        {children}
      </section>
    );
  }

  const motionProps = filterMotionProps(props);

  return (
    <motion.section
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn(className)}
      {...motionProps}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedDiv({ 
  children, 
  className,
  delay = 0,
  ...props 
}: AnimatedDivProps) {
  const { shouldAnimate, shouldReduceMotion } = useMotion();

  if (!shouldAnimate) {
    return (
      <div className={cn(className)} {...props}>
        {children}
      </div>
    );
  }

  const motionProps = filterMotionProps(props);

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn(className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className,
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  const { shouldAnimate } = useMotion();

  if (!shouldAnimate) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const { shouldAnimate, shouldReduceMotion } = useMotion();

  if (!shouldAnimate) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: shouldReduceMotion ? 0.15 : 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          }
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
