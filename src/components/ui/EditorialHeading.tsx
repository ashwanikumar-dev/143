'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface EditorialHeadingProps {
  chapterNumber?: number | string;
  title: string;
  subtitle?: string;
  emphasisWord?: string;
  className?: string;
}

export const EditorialHeading: React.FC<EditorialHeadingProps> = ({
  chapterNumber,
  title,
  subtitle,
  emphasisWord,
  className = '',
}) => {
  // Format chapter label with leading zero if numeric
  const chapterLabel =
    chapterNumber !== undefined
      ? typeof chapterNumber === 'number'
        ? `CHAPTER ${chapterNumber.toString().padStart(2, '0')}`
        : chapterNumber
      : null;

  // Render title with optional italic emphasis
  const renderTitle = () => {
    if (!emphasisWord) return title;

    const parts = title.split(new RegExp(`(${emphasisWord})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === emphasisWord.toLowerCase() ? (
        <em key={index} className="font-serif italic font-normal text-rose-500">
          {part}
        </em>
      ) : (
        part
      )
    );
  };

  return (
    <div className={cn('text-center space-y-2 mb-6', className)}>
      {chapterLabel && (
        <p className="font-sans text-[11px] uppercase tracking-[0.25em] font-semibold text-plum-500/70">
          {chapterLabel}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-plum-700 leading-tight">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="font-sans text-sm sm:text-base text-plum-600/80 max-w-lg mx-auto font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
