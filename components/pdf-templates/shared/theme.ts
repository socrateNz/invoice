export type StyleTier = 'classique' | 'moderne' | 'prestige';

export interface PdfTheme {
  tier: StyleTier;
  page: { backgroundColor: string; color: string };
  primary: string;
  onPrimary: string;
  accent: string;
  onAccent: string;
  surface: string;
  muted: string;
  border: string;
  /** Prestige: wrap page content in an outer accent-bordered box on a dark background. */
  boxed?: boolean;
  /** Moderne: render the document title as plain centered text instead of a filled box. */
  plainTitle?: boolean;
}

export const CLASSIQUE_THEME: PdfTheme = {
  tier: 'classique',
  page: { backgroundColor: '#ffffff', color: '#111111' },
  primary: '#1a2e5a',
  onPrimary: '#ffffff',
  accent: '#d4a017',
  onAccent: '#111111',
  surface: '#e8edf5',
  muted: '#555555',
  border: '#cccccc',
};

/** Moderne tier: light page, one brand color per document type, terser borders/muted tones shared across all types. */
export function moderneTheme(primary: string, surface: string): PdfTheme {
  return {
    tier: 'moderne',
    page: { backgroundColor: '#ffffff', color: '#111111' },
    primary,
    onPrimary: '#ffffff',
    accent: primary,
    onAccent: surface,
    surface,
    muted: '#6b7280',
    border: '#e2e8f0',
    plainTitle: true,
  };
}

/** Prestige tier: dark page wrapped in an accent-bordered box, per-type dark palette. */
export function prestigeTheme(opts: {
  primary: string;
  accent: string;
  dark: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
}): PdfTheme {
  return {
    tier: 'prestige',
    page: { backgroundColor: opts.dark, color: opts.text },
    primary: opts.primary,
    onPrimary: opts.text,
    accent: opts.accent,
    onAccent: opts.dark,
    surface: opts.surface,
    muted: opts.muted,
    border: opts.border,
    boxed: true,
  };
}

export function getTheme(tier: StyleTier | undefined, themes: Record<StyleTier, PdfTheme>): PdfTheme {
  return themes[tier || 'classique'] || themes.classique;
}
