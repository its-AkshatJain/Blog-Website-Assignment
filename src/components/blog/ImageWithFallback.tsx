"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string | null;
  alt: string;
  title?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  title,
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-gradient-to-br from-slate-700 to-slate-800 p-6 ring-2 ring-slate-600">
            <ImageOff className="h-14 w-14 text-slate-300" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-base font-semibold text-slate-200">No Image Available</p>
            <p className="text-xs text-slate-400">Image could not be loaded</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      title={title}
      fill
      className="object-cover transition-transform hover:scale-105"
      onError={() => setImageError(true)}
    />
  );
}
