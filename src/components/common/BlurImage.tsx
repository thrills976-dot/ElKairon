import { useState, useRef, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

interface BlurImageProps extends HTMLMotionProps<"img"> {
  containerClassName?: string;
  zoomOnHover?: boolean;
}

export function BlurImage({ src, alt, className, containerClassName, zoomOnHover = true, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoading(false);
    }
  }, [src]);

  return (
    <div className={cn("overflow-hidden relative bg-navy-950", containerClassName)}>
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoading(false)}
        initial={false}
        animate={{ 
          filter: isLoading ? "blur(20px)" : "blur(0px)",
          scale: isLoading ? 1.1 : 1,
        }}
        whileHover={zoomOnHover && !isLoading ? { scale: 1.08 } : undefined}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={cn(
          "w-full h-full object-cover origin-center",
          className
        )}
        {...props}
      />
    </div>
  );
}
