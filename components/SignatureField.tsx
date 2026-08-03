"use client";

import { useState } from "react";
import { PenLine, Check, X } from "lucide-react";
import SignaturePad from "@/components/SignaturePad";

interface SignatureFieldProps {
  /** Label shown in the pad dialog and used to build the trigger button text, e.g. "Demandeur". */
  label: string;
  value?: string;
  onChange: (dataUrl: string | null) => void;
}

/** A "Signer" trigger + signed indicator for one signature slot in a document form.
 * Encapsulates the SignaturePad dialog so each form only needs one line per signatory. */
export default function SignatureField({ label, value, onChange }: SignatureFieldProps) {
  const [open, setOpen] = useState(false);

  if (value) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg">
          <img src={value} alt={`Signature ${label}`} className="h-6 max-w-[90px] object-contain" />
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-700">
            <Check size={12} /> Signé
          </span>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-gray-400 hover:text-red-600 transition-colors"
          title="Effacer la signature"
        >
          <X size={14} />
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs text-gray-500 hover:text-gray-800 underline transition-colors"
        >
          Re-signer
        </button>
        <SignaturePad open={open} onOpenChange={setOpen} title={`Signature — ${label}`} onSign={(dataUrl) => onChange(dataUrl)} />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 rounded-lg text-xs font-medium transition-colors"
      >
        <PenLine size={13} /> Signer
      </button>
      <SignaturePad open={open} onOpenChange={setOpen} title={`Signature — ${label}`} onSign={(dataUrl) => onChange(dataUrl)} />
    </>
  );
}
