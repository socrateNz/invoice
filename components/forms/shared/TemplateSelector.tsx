"use client";

import { UseFormRegister, UseFormWatch, FieldValues, Path } from "react-hook-form";
import { SECTION_CARD, SECTION_BODY, SECTION_TITLE } from "./styles";

export interface TemplateOption {
  value: string;
  label: string;
  desc: string;
}

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  /** Field name holding the selected style tier, e.g. "template". */
  name: Path<T>;
  /** Header gradient (hex colors) — matches this document type's brand identity. */
  gradientFrom: string;
  gradientTo: string;
  options: TemplateOption[];
}

/** The "🎨 Modèle de document" 3-way style picker, identical in structure across every
 * document form. Colors are applied via inline styles (not Tailwind arbitrary-value
 * classes) so a single shared component can be parameterized per document type without
 * fighting Tailwind's JIT class scanner. */
export function TemplateSelector<T extends FieldValues>({ register, watch, name, gradientFrom, gradientTo, options }: Props<T>) {
  const current = (watch(name) as string) || options[0]?.value;

  return (
    <div className={SECTION_CARD}>
      <div
        className="flex items-center gap-2 px-5 py-3 text-white"
        style={{ background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }}
      >
        <span className={SECTION_TITLE}>🎨 Modèle de document</span>
      </div>
      <div className={SECTION_BODY}>
        <div className="grid grid-cols-3 gap-3">
          {options.map(({ value, label, desc }) => {
            const isActive = current === value;
            return (
              <label
                key={value}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all border-gray-200 hover:border-gray-300"
                style={isActive ? { borderColor: gradientFrom, backgroundColor: `${gradientFrom}0d` } : undefined}
              >
                <input type="radio" value={value} {...register(name)} className="sr-only" />
                <span className="text-sm font-semibold" style={{ color: isActive ? gradientFrom : '#374151' }}>{label}</span>
                <span className="text-xs text-gray-400">{desc}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
