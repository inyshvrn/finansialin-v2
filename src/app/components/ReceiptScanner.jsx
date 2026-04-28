"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileImage,
  Loader2,
  ScanSearch,
  UploadCloud,
} from "lucide-react";
import { apiRequest } from "../../lib/api";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ReceiptScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return "";
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const validateFile = (file) => {
    if (!file) {
      return "Please select an image file.";
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only jpg, jpeg, png, and webp files are allowed.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File size must be 4MB or less.";
    }

    return "";
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0] || null;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setScanResult(null);
    setSuccessMessage("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please choose a receipt image first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    setScanResult(null);

    const formData = new FormData();
    formData.append("receiptImage", selectedFile);

    try {
      const response = await apiRequest("/api/insights/receipt-ocr", {
        method: "POST",
        body: formData,
      });

      const normalizedResult =
        response?.data ?? response?.result ?? response?.text ?? response;

      setScanResult(normalizedResult);
      setSuccessMessage("Receipt scanned successfully.");
    } catch (uploadError) {
      console.error(uploadError);
      setError(uploadError?.message || "Failed to scan receipt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto rounded-3xl border border-amber-100 bg-gradient-to-b from-white to-amber-50/60 p-6 shadow-xl shadow-amber-100/40">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <ScanSearch size={14} /> OCR Scanner
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">
            Scan Receipt
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Upload a receipt image to extract text and transaction insights.
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={handleFileSelect}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative w-full overflow-hidden rounded-2xl border-2 border-dashed border-amber-200 bg-white p-6 text-left transition-all hover:border-amber-400 hover:shadow-lg"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-100/0 via-amber-100/50 to-amber-100/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex flex-col items-center justify-center gap-3 text-center">
          <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
            <UploadCloud size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Click to choose receipt image
            </p>
            <p className="text-xs text-slate-500">
              JPG, JPEG, PNG, WEBP up to 4MB
            </p>
          </div>
        </div>
      </button>

      {selectedFile && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
            <FileImage size={16} /> Selected File: {selectedFile.name}
          </div>
          <img
            src={previewUrl}
            alt="Receipt preview"
            className="h-56 w-full rounded-xl border border-slate-200 object-contain bg-slate-50"
          />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Processing...
            </>
          ) : (
            <>
              <ScanSearch size={16} /> Scan Receipt
            </>
          )}
        </button>
      </div>

      {successMessage && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {scanResult && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-700">
            OCR Result
          </h3>
          <pre className="max-h-72 overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-100">
            {typeof scanResult === "string"
              ? scanResult
              : JSON.stringify(scanResult, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
};

export default ReceiptScanner;
