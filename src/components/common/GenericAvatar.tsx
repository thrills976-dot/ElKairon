import React, { useState } from 'react';
import { User, Briefcase, Building2, ShieldCheck } from 'lucide-react';

export interface GenericAvatarProps {
  src?: string | null;
  name?: string;
  role?: 'candidate' | 'employer' | 'admin' | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showBadge?: boolean;
  alt?: string;
}

const SIZE_MAP = {
  xs: 'w-7 h-7 text-[10px]',
  sm: 'w-9 h-9 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-20 h-20 text-lg md:text-xl',
  '2xl': 'w-24 h-24 text-xl md:text-2xl',
};

const ICON_SIZE_MAP = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 26,
  xl: 32,
  '2xl': 40,
};

export const GenericAvatar: React.FC<GenericAvatarProps> = ({
  src,
  name = '',
  role = 'candidate',
  size = 'md',
  className = '',
  showBadge = false,
  alt = 'Avatar',
}) => {
  const [imageError, setImageError] = useState(false);

  // Generate clean initials if name exists (e.g. "John Doe" => "JD")
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const iconSize = ICON_SIZE_MAP[size] || 20;

  const isEmployer = role === 'employer';
  const bgGradient = isEmployer
    ? 'bg-gradient-to-tr from-navy-950 via-navy-900 to-navy-800 text-gold-400 border-navy-700'
    : 'bg-gradient-to-tr from-navy-950 via-navy-900 to-teal-900 text-teal-300 border-teal-600/30';

  const renderFallback = () => {
    if (initials) {
      return (
        <span className="font-display font-extrabold tracking-wider select-none">
          {initials}
        </span>
      );
    }
    if (isEmployer) {
      return <Building2 size={iconSize} className="text-gold-400/90" />;
    }
    return <User size={iconSize} className="text-teal-300/90" />;
  };

  const hasValidImage = Boolean(src && typeof src === 'string' && src.trim().length > 5 && !imageError);

  return (
    <div className={`relative inline-flex shrink-0 select-none ${className}`}>
      {hasValidImage ? (
        <img
          src={src as string}
          alt={name || alt}
          onError={() => setImageError(true)}
          className={`${sizeClass} rounded-2xl object-cover border border-gray-200 shadow-xs`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          className={`${sizeClass} rounded-2xl ${bgGradient} border flex items-center justify-center shadow-xs font-bold`}
          title={name || (isEmployer ? 'Employer Profile' : 'Candidate Profile')}
        >
          {renderFallback()}
        </div>
      )}

      {showBadge && (
        <span
          className="absolute -bottom-1 -right-1 p-0.5 bg-teal-600 text-white rounded-md shadow-xs flex items-center justify-center border border-white"
          title="Verified Network Profile"
        >
          <ShieldCheck size={Math.max(10, Math.floor(iconSize * 0.45))} />
        </span>
      )}
    </div>
  );
};
