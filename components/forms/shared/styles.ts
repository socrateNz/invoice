// Structural (color-free) Tailwind classes shared by every document form. Kept free of
// per-type brand colors on purpose: Tailwind's JIT scanner only picks up literal class
// strings, so arbitrary-value color classes (e.g. `focus:ring-[#1a2e5a]`) must stay as
// literals in each form file rather than being built dynamically here.
export const SECTION_CARD = "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-5";
export const SECTION_TITLE = "font-semibold text-sm tracking-wide";
export const SECTION_BODY = "p-5 space-y-4";
export const FIELD_LABEL = "block text-xs font-medium text-gray-600 mb-1";
