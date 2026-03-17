import Image from "next/image";
import React from "react";

export type IconName = "file" | "globe" | "profile-icon" | "window" | "application-status-icon" | "arrow-down" | "documents-icon" | "email-icon" | "notification-with-badge" | "notifications-icon" | "phone-icon" | "settings-icon" | "light-blue-arrow-down" | "camera-icon";

interface IconProps {
  name: IconName;
  className?: string;
  width?: number;
  height?: number;
}

export function Icon({ name, className = "", width = 24, height = 24 }: IconProps) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt={`${name} icon`}
      width={width}
      height={height}
      className={className}
    />
  );
}
