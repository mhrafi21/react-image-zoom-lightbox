import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import { ZoomInIcon, ZoomOutIcon, RotateCcwIcon, CloseIcon } from "./Icons";

const clampScale = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getClientPoint = (
  event: React.MouseEvent<any> | React.TouchEvent<any>
) => {
  if ("touches" in event && event.touches.length > 0) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  if ("clientX" in event && "clientY" in event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  return { x: 0, y: 0 };
};

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
    if (!isOpen) return;
    resetState();
  }, [isOpen, src, resetState]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleZoomIn = useCallback(() => {
    setZoomScale((prev) => {
      const next = clampScale(prev + step, minScale, maxScale);
      if (next <= minScale) {
        setPosition({ x: 0, y: 0 });
      }
      return next;
    });
  }, [maxScale, minScale, step]);

  const handleZoomOut = useCallback(() => {
    setZoomScale((prev) => {
      const next = clampScale(prev - step, minScale, maxScale);
      if (next === minScale) {
        setPosition({ x: 0, y: 0 });
      }
      return next;
    });
  }, [maxScale, minScale, step]);

  const handleWheelZoom = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault();

      const delta = event.deltaY < 0 ? step : -step;
      setZoomScale((prev) => {
        const next = clampScale(prev + delta, minScale, maxScale);
        if (next === minScale) {
          setPosition({ x: 0, y: 0 });
        }
        return next;
      });
    },
    [maxScale, minScale, step]
  );

  const handleMouseDown = (event: React.MouseEvent<any> | React.TouchEvent<any>) => {
    if (zoomScale <= minScale) return;

    setIsDragging(true);
    const point = getClientPoint(event);
    setStartPos({
      x: point.x - position.x,
      y: point.y - position.y,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<any> | React.TouchEvent<any>) => {
    if (!isDragging || zoomScale <= minScale) return;

    const point = getClientPoint(event);
    setPosition({
      x: point.x - startPos.x,
      y: point.y - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen || !src) return null;

  return (
    <div className={`image-zoom-modal ${className}`.trim()} role="dialog" aria-modal="true">
      <div className="image-zoom-toolbar">
        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoomScale >= maxScale}
          className="image-zoom-button"
          title="Zoom In"
          aria-label="Zoom in"
        >
          {zoomInIcon || <ZoomInIcon size={20} />}
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoomScale <= minScale}
          className="image-zoom-button"
          title="Zoom Out"
          aria-label="Zoom out"
        >
          {zoomOutIcon || <ZoomOutIcon size={20} />}
        </button>
        <button
          type="button"
          onClick={resetState}
          className="image-zoom-button"
          title="Reset Zoom"
          aria-label="Reset zoom"
        >
          {resetIcon || <RotateCcwIcon size={20} />}
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="image-zoom-button image-zoom-button--close"
          title="Close"
          aria-label="Close dialog"
        >
          {closeIcon || <CloseIcon size={24} />}
        </button>
      </div>

      <div
        className={isDragging ? "image-zoom-viewport is-dragging" : "image-zoom-viewport"}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onWheel={handleWheelZoom}
      >
        <img
          src={src}
          alt={alt}
          className="image-zoom-image"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomScale})`,
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};