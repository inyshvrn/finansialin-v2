"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";

/**
 * Professional Select/Dropdown Component
 * @param {Object} props
 * @param {string} props.label - Label di atas select
 * @param {string} props.value - Value terpilih
 * @param {Function} props.onChange - Callback saat value berubah
 * @param {Array} props.options - Array of {value, label, icon?, badge?}
 * @param {boolean} props.searchable - Apakah bisa search
 * @param {boolean} props.clearable - Apakah ada tombol clear
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.disabled - Disable select
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Apakah required
 * @param {string} props.className - Custom className
 */
export default function Select({
  label,
  value,
  onChange,
  options = [],
  searchable = false,
  clearable = false,
  placeholder = "Select option...",
  disabled = false,
  error = "",
  required = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : options;

  // Get selected option label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption?.label || placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
    setSearchTerm("");
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-[#A3A3A3] block mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full h-12 bg-[#F6F5F1] rounded-2xl px-5 flex items-center justify-between text-sm font-semibold outline-none transition-all border ${
          isOpen
            ? "ring-2 ring-[#FFD600] bg-white border-[#FFD600]"
            : "border-[#E8E2D9] focus:ring-2 focus:ring-[#FFD600]"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${
          error ? "ring-2 ring-red-500 border-red-500" : ""
        }`}
      >
        <span
          className={`flex items-center gap-2 ${value ? "text-[#1A1A1A]" : "text-[#A3A3A3]"}`}
        >
          {selectedOption?.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          {displayLabel}
          {selectedOption?.badge && (
            <span className="ml-1 px-2 py-1 text-[9px] font-black bg-[#FFD600] text-[#1A1A1A] rounded-lg">
              {selectedOption.badge}
            </span>
          )}
        </span>

        <div className="flex items-center gap-1.5">
          {clearable && value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-[#E8E2D9] rounded-lg transition text-[#A3A3A3] hover:text-[#1A1A1A]"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown
            size={16}
            className={`text-[#A3A3A3] transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Error Message */}
      {error && (
        <p className="text-[10px] text-red-500 font-semibold mt-1.5">{error}</p>
      )}

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#FFD600] rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Search Input */}
          {searchable && (
            <div className="p-3 border-b border-[#F6F5F1] sticky top-0 bg-white">
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-9 bg-[#F6F5F1] rounded-xl pl-9 pr-4 text-[12px] font-medium outline-none focus:ring-2 focus:ring-[#FFD600]"
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-3 border-b border-[#F6F5F1] last:border-0 ${
                    value === option.value
                      ? "bg-[#FFD600] text-[#1A1A1A]"
                      : "hover:bg-[#FDFCFB] text-[#1A1A1A]"
                  }`}
                >
                  {option.icon && (
                    <span className="shrink-0 text-lg">{option.icon}</span>
                  )}
                  <span className="flex-1">{option.label}</span>
                  {option.badge && (
                    <span
                      className={`text-[9px] font-black px-2 py-1 rounded-lg ${
                        value === option.value
                          ? "bg-[#1A1A1A] text-[#FFD600]"
                          : "bg-[#F6F5F1] text-[#A3A3A3]"
                      }`}
                    >
                      {option.badge}
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-[11px] font-semibold text-[#A3A3A3]">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
