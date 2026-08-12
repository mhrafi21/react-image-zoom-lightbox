import { useState, useCallback } from "react";

export interface UseImageZoomReturn {
  isOpen: boolean;
  selectedImage: string | null;
  openZoom: (src: string) => void;
  closeZoom: () => void;
}

export const useImageZoom = (): UseImageZoomReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openZoom = useCallback((src: string) => {
    setSelectedImage(src);
    setIsOpen(true);
  }, []);

  const closeZoom = useCallback(() => {
    setIsOpen(false);
    setSelectedImage(null);
  }, []);

  return { isOpen, selectedImage, openZoom, closeZoom };
};