import React from 'react';
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
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          "absolute inset-0 w-full h-full object-cover",
          className
        )}
        {...props}
      />
    </div>
  );
}
