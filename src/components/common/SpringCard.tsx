import React, { ReactNode, HTMLAttributes } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface SpringCardProps extends HTMLAttributes<HTMLDivElement> {
  key?: React.Key;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SpringCard({ children, className = '', onClick }: SpringCardProps) {
  const [props, api] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 350, friction: 25 },
  }));

  const calc = (x: number, y: number, rect: DOMRect) => [
    -(y - rect.top - rect.height / 2) / 25,
    (x - rect.left - rect.width / 2) / 25,
    1.025,
  ];

  const trans = (x: number, y: number, s: number) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  return (
    <animated.div
      className={`cursor-pointer transform-gpu ${className}`}
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const [x, y, s] = calc(e.clientX, e.clientY, rect);
        api.start({ xys: [x, y, s] });
      }}
      onMouseLeave={() => {
        api.start({ xys: [0, 0, 1] });
      }}
      style={{
        willChange: 'transform',
        transform: props.xys.to((x, y, s) => trans(x, y, s)),
      }}
    >
      {children}
    </animated.div>
  );
}
