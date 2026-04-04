import React from 'react';
import './image.css';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, width, height, className = '', ...props }, ref) => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={`wix-image ${className}`}
        style={style}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';
