"use client";

import { useState, useRef } from "react";
import { uploadImageToImgBB } from "@/lib/upload";
import { ImagePlus, X, Loader2 } from "lucide-react";
import imageCompression from "browser-image-compression";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Ảnh đại diện",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const options = { maxSizeMB: 1.5, maxWidthOrHeight: 1280, useWebWorker: true, initialQuality: 0.8 };
      const compressedFile = await imageCompression(file, options);
      const url = await uploadImageToImgBB(compressedFile as File);
      onChange(url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      {value ? (
        <div className="relative group w-fit">
          <img
            src={value}
            alt="Preview"
            className="h-28 rounded-xl object-cover border border-white/[0.08]"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-white/[0.08] hover:border-amber-500/30 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
              <span className="text-xs text-slate-400">Đang upload...</span>
            </>
          ) : (
            <>
              <ImagePlus className="w-6 h-6 text-slate-500" />
              <span className="text-xs text-slate-400">
                Nhấn hoặc kéo thả ảnh vào đây
              </span>
            </>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}

// --- Multi Image Uploader ---

interface MultiImageUploaderProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

export function MultiImageUploader({
  values,
  onChange,
  label = "Gallery",
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    const newUrls: string[] = [];
    const options = { maxSizeMB: 1.5, maxWidthOrHeight: 1280, useWebWorker: true, initialQuality: 0.8 };
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const compressedFile = await imageCompression(file, options);
        const url = await uploadImageToImgBB(compressedFile as File);
        newUrls.push(url);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
    onChange([...values.filter(Boolean), ...newUrls]);
    setUploading(false);
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-3">
        {label}
      </label>

      {/* Existing images */}
      {values.filter(Boolean).length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {values
            .filter(Boolean)
            .map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Gallery ${index + 1}`}
                  className="w-24 h-20 rounded-lg object-cover border border-white/[0.08]"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
        </div>
      )}

      {/* Upload area */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-white/[0.08] hover:border-amber-500/30 rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
      >
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
            <span className="text-xs text-slate-400">Đang upload...</span>
          </>
        ) : (
          <>
            <ImagePlus className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-400">
              Thêm ảnh (nhấn hoặc kéo thả)
            </span>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
          }
        }}
      />
    </div>
  );
}
