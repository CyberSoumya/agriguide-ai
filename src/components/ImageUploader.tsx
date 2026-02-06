import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Image, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  title: string;
  description: string;
  hint: string;
  isAnalyzing?: boolean;
  analyzingText?: string;
}

export function ImageUploader({
  onImageSelect,
  title,
  description,
  hint,
  isAnalyzing = false,
  analyzingText = 'Analyzing...',
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleFile(file);
      }
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [onImageSelect]
  );

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageSelect(file);
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="uploader"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-2xl border-2 border-dashed p-8 transition-all duration-300 ${
                isDragging
                  ? 'border-primary bg-primary/5 scale-[1.02]'
                  : 'border-border hover:border-primary/50 bg-card'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center text-center">
                <motion.div
                  animate={{ y: isDragging ? -5 : 0 }}
                  className="mb-4 p-4 rounded-full bg-primary/10"
                >
                  <Upload className="h-8 w-8 text-primary" />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {description}
                </p>
                
                <div className="flex flex-wrap gap-3 justify-center mb-4">
                  <Button variant="secondary" size="sm" className="pointer-events-none">
                    <Image className="h-4 w-4 mr-2" />
                    Gallery
                  </Button>
                  <Button variant="secondary" size="sm" className="pointer-events-none">
                    <Camera className="h-4 w-4 mr-2" />
                    Camera
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {hint}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden bg-card border border-border"
          >
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover"
            />
            
            {isAnalyzing ? (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  <p className="text-foreground font-medium">{analyzingText}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={clearPreview}
                className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
