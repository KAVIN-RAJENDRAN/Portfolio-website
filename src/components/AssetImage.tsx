import React, { useState } from 'react';

interface AssetImageProps {
  src: string;
  alt: string;
  initials: string;
  className?: string;
  containerClassName?: string;
}

export const AssetImage: React.FC<AssetImageProps> = ({
  src,
  alt,
  initials,
  className = '',
  containerClassName = ''
}) => {
  const [hasError, setHasError] = useState(false);

  // If the path contains the default template placeholders or is missing, or had an error
  const isPlaceholderPath = !src || src.includes('placeholder') || src === '';

  const handleImageError = () => {
    setHasError(true);
    // Developer warning in console to guide asset placement
    console.warn(`[Asset Missing] Could not load image at "${src}". Please place the correct image in the public assets directory.`);
  };

  if (hasError || isPlaceholderPath) {
    return (
      <div
        className={`flex items-center justify-center font-outfit font-semibold uppercase tracking-wider text-text-primary border border-border bg-surface rounded-full shadow-sm theme-transition ${containerClassName}`}
        title={`Fallback placeholder for ${alt} (Expected path: ${src})`}
      >
        <span className="text-sm select-none">{initials}</span>
      </div>
    );
  }

  const fitClass = className.includes('object-') ? '' : 'object-cover object-center';

  return (
    <img
      src={src}
      alt={alt}
      onError={handleImageError}
      className={`${fitClass} theme-transition ${className}`}
    />
  );
};
