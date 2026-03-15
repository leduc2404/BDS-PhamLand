"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  label?: string;
  className?: string;
  theme?: 'light' | 'dark';
  floatingLabel?: boolean;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

export default function CustomSelect({ 
  options, 
  placeholder = "Chọn loại hình tài sản *", 
  label,
  className = "",
  theme = "dark",
  floatingLabel = true,
  onChange,
  defaultValue = ""
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = selected 
    ? options.find(o => o.value === selected)?.label 
    : placeholder;

  const isDark = theme === "dark";
  const triggerBorder = isOpen 
    ? "border-accent" 
    : (isDark ? "border-slate-600" : "border-slate-200");
  const triggerHover = isDark ? "hover:border-slate-400" : "hover:border-accent";
  const triggerText = selected 
    ? (isDark ? "text-white" : "text-slate-800")
    : "text-slate-400";

  return (
    <div className="relative group" ref={dropdownRef}>
      <input type="hidden" name="property_type" value={selected} required={true} />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${className || `w-full bg-transparent border-0 border-b py-3 text-left font-light outline-none transition-colors px-0`} flex items-center justify-between ${triggerBorder} ${triggerHover} ${triggerText}`}
      >
        <span className="truncate">{selectedLabel}</span>
        <span 
          className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          arrow_drop_down
        </span>
      </button>

      {/* Floating Label for consistency */}
      {floatingLabel && (
        <span className={`absolute left-0 transition-all cursor-text pointer-events-none ${
          selected || isOpen 
            ? '-top-4 text-[10px] text-accent uppercase tracking-widest font-medium' 
            : 'top-3 text-slate-400 text-sm font-light opacity-0'
        }`}>
          {label || `${placeholder.replace(' *', '')} *`}
        </span>
      )}

      <div 
        className={`absolute z-50 w-full mt-2 border rounded-sm py-2 transition-all duration-300 origin-top ${
          isDark ? "bg-[#0a1128] border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]" : "bg-white border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
        } ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setSelected(option.value);
              setIsOpen(false);
              if (onChange) onChange(option.value);
            }}
            className={`w-full text-left px-5 py-3.5 text-sm font-light transition-colors flex items-center justify-between group-hover:bg-transparent ${
              selected === option.value 
                ? (isDark ? 'text-accent bg-white/5' : 'text-accent bg-slate-50') 
                : (isDark ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-primary')
            }`}
          >
            {option.label}
            {selected === option.value && (
              <span className="material-symbols-outlined text-[16px]">check</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
