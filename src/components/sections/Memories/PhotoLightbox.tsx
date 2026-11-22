"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MemoryPhoto } from "@/types/content";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface PhotoLightboxProps {
  photo: MemoryPhoto | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  onClose,
}) => {
  const containerRef = useFocusTrap(!!photo);

  return (
    <AnimatePresence>
      {photo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption || "Photo Lightbox"}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-plum-950/75 backdrop-blur-md"
          />

          {/* Lightbox Container */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative max-w-lg w-full bg-white rounded-card p-4 sm:p-6 shadow-ambient z-10 space-y-4"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-plum-500 hover:text-plum-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              aria-label="Close photo view"
            >
              <X size={16} />
            </button>

            {/* Photo / Visual */}
            <div className="relative aspect-4/3 w-full rounded-sm overflow-hidden bg-gradient-to-tr from-blush-200 via-rose-100 to-lavender-200 flex items-center justify-center">
              {photo.src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/photos/20251229_213708.jpg"
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : null}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 pointer-events-none">
                <span className="text-4xl">📸</span>
                <span className="text-xs font-sans text-plum-700 mt-2">
                  Treasured Snapshot
                </span>
              </div>
            </div>

            {/* Caption & Metadata */}
            <div className="text-center space-y-1 pt-2">
              <p className="font-hand text-2xl text-plum-700 leading-snug">
                {photo.caption}
              </p>
              {(photo.date || photo.location) && (
                <p className="font-sans text-xs tracking-wider uppercase text-plum-400">
                  {[photo.date, photo.location].filter(Boolean).join(" • ")}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
