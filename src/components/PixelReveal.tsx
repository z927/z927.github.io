import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface PixelRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Number of pixel block columns for the overlay mask */
  cols?: number;
  rows?: number;
}

/**
 * Wraps children in a pixel-fragmented entrance animation.
 * An overlay grid of opaque blocks dissolves away in a staggered pattern,
 * revealing the content underneath with a digital/glitchy feel.
 */
const PixelReveal = ({
  children,
  className = "",
  delay = 0,
  cols = 8,
  rows = 6,
}: PixelRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Build a shuffled order for the blocks
  const totalBlocks = cols * rows;
  const blockOrder = useRef(
    Array.from({ length: totalBlocks }, (_, i) => i).sort(() => Math.random() - 0.5)
  ).current;

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* The actual content — starts invisible and fades in quickly */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.15, delay }}
      >
        {children}
      </motion.div>

      {/* Pixel block overlay */}
      {isInView && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {blockOrder.map((orderIndex, i) => (
            <motion.div
              key={i}
              className="bg-background"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: 0.08,
                delay: delay + (orderIndex / totalBlocks) * 0.6,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PixelReveal;
