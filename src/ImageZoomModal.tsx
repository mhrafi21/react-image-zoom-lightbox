// src/ImageZoomModal.tsx
import React, { useState, useEffect, useCallback } from "react";
import { ZoomInIcon, ZoomOutIcon, RotateCcwIcon, CloseIcon } from "./Icons";

export interface ImageZoomModalProps {
  isOpen: boolean;
  src: string | null;
  alt?: string;
  onClose: () => void;
  maxScale?: number;
  minScale?: number;
  step?: number;
  className?: string;
  /** Optional custom icons */
  zoomInIcon?: React.ReactNode;
  zoomOutIcon?: React.ReactNode;
  resetIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  src,
  alt = "Zoomable image",
  onClose,
  maxScale = 4,
  minScale = 1,
  step = 0.5,
  className = "",
  zoomInIcon,
  zoomOutIcon,
  resetIcon,
  closeIcon,
}) => {
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const resetState = useCallback(() => {
    setZoomScale(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + step, maxScale));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(prev - step, minScale);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: clientX - startPos.x,
      y: clientY - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen || !src) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-2 sm:p-4 select-none touch-none ${className}`}
    >
      {/* Controls Bar */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoomScale >= maxScale}
          className="bg-white/10 hover:bg-white/25 disabled:opacity-40 text-white p-3 rounded-full backdrop-blur-md transition-all duration-200 flex items-center justify-center"
          title="Zoom In"
        >
          {zoomInIcon || <ZoomInIcon size={20} />}
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoomScale <= minScale}
          className="bg-white/10 hover:bg-white/25 disabled:opacity-40 text-white p-3 rounded-full backdrop-blur-md transition-all duration-200 flex items-center justify-center"
          title="Zoom Out"
        >
          {zoomOutIcon || <ZoomOutIcon size={20} />}
        </button>
        <button
          type="button"
          onClick={resetState}
          className="bg-white/10 hover:bg-white/25 text-white p-3 rounded-full backdrop-blur-md transition-all duration-200 flex items-center justify-center"
          title="Reset Zoom"
        >
          {resetIcon || <RotateCcwIcon size={20} />}
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="bg-white/20 hover:bg-red-500 text-white p-3 rounded-full backdrop-blur-md transition-all duration-200 ml-2 shadow-lg flex items-center justify-center"
          title="Close"
        >
          {closeIcon || <CloseIcon size={24} />}
        </button>
      </div>

      {/* Image Viewport */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain transition-transform duration-100 ease-out rounded-lg shadow-2xl pointer-events-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomScale})`,
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};