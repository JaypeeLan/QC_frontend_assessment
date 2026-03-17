import NextImage from "next/image";
import React from "react";

interface AppImageProps {
  name: "avatar" | "logo" | "my-applications-icon" | "new-application-img" | "recent-activity-img" | "support-img" | "next" | "vercel";
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function AppImage({ name, alt, className = "", width, height, priority = false }: AppImageProps) {
  // Try assuming png first, but gracefully fallback to svgs for next/vercel
  const extension = name === 'next' || name === 'vercel' ? 'svg' : 'png';
  
  return (
    <NextImage
      src={`/images/${name}.${extension}`}
      alt={alt}
      width={width || 100}
      height={height || 100}
      className={className}
      priority={priority}
    />
  );
}
