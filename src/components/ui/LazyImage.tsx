import React, { useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholderSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function LazyImage({ src, placeholderSrc, alt, className, containerClassName, ...props }: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div className={cn("relative overflow-hidden w-full h-full bg-navy-800/40", containerClassName)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out",
          className
        )}
        {...props}
      />
    </div>
  );
}
