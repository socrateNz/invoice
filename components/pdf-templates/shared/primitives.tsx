import React from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import { PdfTheme } from './theme';
import { createSharedStyles } from './styles';

export const v = (x?: string | number | null) => (x === undefined || x === null || x === '' ? '' : x.toString());

const DEFAULT_FOOTER = 'UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII';

export function PageShell({ theme, children }: { theme: PdfTheme; children: React.ReactNode }) {
  const s = createSharedStyles(theme);
  if (!theme.boxed) return <>{children}</>;
  return <View style={s.boxedPage}>{children}</View>;
}

export interface InstitutionInfo {
  name?: string;
  subtitle?: string;
  location?: string;
  acronym?: string;
  department?: string;
}

export function DocumentHeader({ theme, institution, meta }: {
  theme: PdfTheme;
  institution: InstitutionInfo;
  meta: { label: string; value?: string }[];
}) {
  const s = createSharedStyles(theme);
  return (
    <View style={s.headerRow}>
      <View>
        <Text style={s.instName}>{institution.name || 'UNIVERSITE INTERNATIONALE'}</Text>
        <Text style={s.instSub}>{institution.subtitle || 'JEAN PAUL II DE BAFANG'}</Text>
        <Text style={s.instLoc}>{institution.acronym || 'UIJPII'} — {institution.location || 'Bafang, Cameroun'}</Text>
        <Text style={s.instDept}>{institution.department || 'Cellule Informatique'}</Text>
      </View>
      <View style={s.metaRight}>
        {meta.map((m) => (
          <View key={m.label} style={s.metaRow}>
            <Text style={s.metaLabel}>{m.label} :</Text>
            <View style={s.metaVal}><Text>{v(m.value)}</Text></View>
          </View>
        ))}
      </View>
    </View>
  );
}

export function Divider({ theme }: { theme: PdfTheme }) {
  const s = createSharedStyles(theme);
  return <View style={s.divider} />;
}

export function DocumentTitle({ theme, children }: { theme: PdfTheme; children: React.ReactNode }) {
  const s = createSharedStyles(theme);
  if (theme.plainTitle) return <Text style={s.titlePlain}>{children}</Text>;
  return <View style={s.titleBox}><Text style={s.titleBoxText}>{children}</Text></View>;
}

export function SectionTitle({ theme, children }: { theme: PdfTheme; children: React.ReactNode }) {
  const s = createSharedStyles(theme);
  if (theme.plainTitle) {
    return (
      <View style={s.sectionTitleBarRow}>
        <View style={s.sectionBar} />
        <Text style={s.sectionTitleBarText}>{children}</Text>
      </View>
    );
  }
  return <Text style={s.sectionTitleUnderline}>{children}</Text>;
}

export function PartyRow({ theme, children }: { theme: PdfTheme; children: React.ReactNode }) {
  const s = createSharedStyles(theme);
  return <View style={s.partyRow}>{children}</View>;
}

export function PartyBox({ theme, title, lines }: {
  theme: PdfTheme;
  title: string;
  lines: (string | { label: string; value?: string })[];
}) {
  const s = createSharedStyles(theme);
  return (
    <View style={s.partyBox}>
      <Text style={s.partyHeader}>{title}</Text>
      <View style={s.partyBody}>
        {lines.map((line, i) =>
          typeof line === 'string'
            ? <Text key={i} style={s.partyLine}>{line}</Text>
            : <Text key={i} style={s.partyLine}><Text style={s.partyLabel}>{line.label} </Text>{v(line.value)}</Text>
        )}
      </View>
    </View>
  );
}

export function Checkbox({ theme, checked, label }: { theme: PdfTheme; checked?: boolean; label: string }) {
  const s = createSharedStyles(theme);
  return (
    <View style={s.checkItem}>
      <View style={[s.checkbox, checked ? s.checkboxOn : {}]}>
        {checked && <Text style={{ color: theme.onPrimary, fontSize: 6, lineHeight: 1 }}>✓</Text>}
      </View>
      <Text style={s.checkLabel}>{label}</Text>
    </View>
  );
}

export interface LabelValueRow {
  label: string;
  value?: string;
  narrowLabel?: string;
  narrowValue?: string;
  checks?: { checked?: boolean; label: string }[];
}

/** A bordered table of label/value rows, optionally with a second narrow label/value pair or a checkbox row instead of a value. */
export function LabelValueTable({ theme, rows }: { theme: PdfTheme; rows: LabelValueRow[] }) {
  const s = createSharedStyles(theme);
  return (
    <View style={s.table}>
      {rows.map((row, i) => (
        <View key={i} style={i < rows.length - 1 ? s.row : s.rowLast}>
          <Text style={s.labelCell}>{row.label}</Text>
          {row.checks ? (
            <View style={s.checkRow}>
              {row.checks.map((c, j) => <Checkbox key={j} theme={theme} checked={c.checked} label={c.label} />)}
            </View>
          ) : (
            <Text style={row.narrowLabel ? s.valueCellBordered : s.valueCell}>{v(row.value)}</Text>
          )}
          {row.narrowLabel && <Text style={s.labelCellNarrow}>{row.narrowLabel}</Text>}
          {row.narrowLabel && <Text style={s.valueCellNarrow}>{v(row.narrowValue)}</Text>}
        </View>
      ))}
    </View>
  );
}

export interface ItemColumn<T> {
  key: string;
  label: string;
  width: string;
  align?: 'left' | 'center' | 'right';
  render: (row: T, index: number) => string;
}

export function ItemsTable<T extends { id: string }>({ theme, columns, rows }: {
  theme: PdfTheme;
  columns: ItemColumn<T>[];
  rows: T[];
}) {
  const s = createSharedStyles(theme);
  return (
    <View style={s.table}>
      <View style={s.itemsHeadRow}>
        {columns.map((c) => (
          <Text key={c.key} style={[s.itemsHeadCell, { width: c.width, textAlign: c.align || 'left' }]}>{c.label}</Text>
        ))}
      </View>
      {rows.map((row, i) => (
        <View key={row.id || i} style={i < rows.length - 1 ? s.row : s.rowLast}>
          {columns.map((c) => (
            <Text key={c.key} style={[s.itemsCell, { width: c.width, textAlign: c.align || 'left' }, c.key === columns[columns.length - 1].key ? { borderRight: 0 } : {}]}>
              {c.render(row, i)}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

export function TotalBox({ theme, label, value }: { theme: PdfTheme; label: string; value: string }) {
  const s = createSharedStyles(theme);
  return (
    <View style={s.totalWrap}>
      <View style={s.totalBox}>
        <Text style={s.totalLabel}>{label}</Text>
        <Text style={s.totalValue}>{value}</Text>
      </View>
    </View>
  );
}

export interface SignatureSpec {
  title: string;
  subtitle?: string;
  name?: string;
  date?: string;
  signatureLabel?: string;
  /** Data URL (PNG) of a digitally-captured signature, drawn in place of the blank signature line. */
  image?: string;
}

export function SignatureRow({ theme, signatures }: { theme: PdfTheme; signatures: SignatureSpec[] }) {
  const s = createSharedStyles(theme);
  return (
    <View style={s.sigRow}>
      {signatures.map((sig, i) => (
        <View key={i} style={i > 0 && i < signatures.length - 1 ? [s.sigBox, s.sigBoxMid] : s.sigBox}>
          <Text style={s.sigTitle}>{sig.title}</Text>
          {sig.subtitle ? <Text style={s.sigLabel}>{sig.subtitle}</Text> : null}
          <Text style={s.sigName}>{v(sig.name)}</Text>
          {sig.image ? (
            <Image src={sig.image} style={{ height: 26, maxWidth: 95, objectFit: 'contain', marginTop: 4, marginBottom: 3 }} />
          ) : (
            <View style={s.sigLine} />
          )}
          <Text style={s.sigLabel}>{sig.signatureLabel || 'Signature'}</Text>
          <View style={[s.sigLine, { marginBottom: 6 }]} />
          <Text style={s.sigLabel}>Date : {v(sig.date)}</Text>
        </View>
      ))}
    </View>
  );
}

export function DocumentFooter({ theme, text }: { theme: PdfTheme; text?: string }) {
  const s = createSharedStyles(theme);
  return (
    <View fixed style={s.footer}>
      <Text style={s.footerText}>{text || DEFAULT_FOOTER}</Text>
    </View>
  );
}

/** A prominent highlighted amount block (e.g. payment received, cash movement). Uses a semantic color independent of the tier theme. */
export function AmountHero({ label, value, subtext, color = '#166534', backgroundColor = '#dcfce7' }: {
  label: string; value: string; subtext?: string; color?: string; backgroundColor?: string;
}) {
  return (
    <View style={{ backgroundColor, border: `2pt solid ${color}`, padding: '16 20', marginBottom: 16, alignItems: 'center' }}>
      <Text style={{ fontSize: 9, color, marginBottom: 4, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }}>{label}</Text>
      <Text style={{ fontSize: 22, fontFamily: 'Helvetica-Bold', color, marginBottom: 4 }}>{value}</Text>
      {subtext ? <Text style={{ fontSize: 8.5, color, fontFamily: 'Helvetica-Oblique', textAlign: 'center' }}>{subtext}</Text> : null}
    </View>
  );
}

/** A borderless label/value row, e.g. a cost breakdown line. */
export function KeyValueRow({ theme, label, value }: { theme: PdfTheme; label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
      <Text style={{ width: '50%', fontSize: 8, color: theme.muted }}>{label}</Text>
      <Text style={{ width: '50%', fontSize: 8, fontFamily: 'Helvetica-Bold', color: theme.primary, textAlign: 'right' }}>{value}</Text>
    </View>
  );
}

/** A full-width highlighted total bar (as opposed to TotalBox's right-aligned pill). */
export function TotalBar({ theme, label, value }: { theme: PdfTheme; label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: theme.primary, padding: '5 8', marginBottom: 8 }}>
      <Text style={{ flexGrow: 1, fontSize: 9, fontFamily: 'Helvetica-Bold', color: theme.onPrimary }}>{label}</Text>
      <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: theme.accent }}>{value}</Text>
    </View>
  );
}

export function NoteBox({ theme, children }: { theme: PdfTheme; children: React.ReactNode }) {
  return (
    <View style={{ border: `1pt solid ${theme.border}`, padding: 8, marginBottom: 8, backgroundColor: '#fffbea' }}>
      <Text style={{ fontSize: 7.5, color: theme.muted, fontFamily: 'Helvetica-Oblique' }}>{children}</Text>
    </View>
  );
}

export function StampArea({ theme, text = 'Zone réservée au tampon / cachet officiel' }: { theme: PdfTheme; text?: string }) {
  return (
    <View style={{ border: `2pt dashed ${theme.accent}`, padding: 12, marginBottom: 8, alignItems: 'center', backgroundColor: '#fffbea' }}>
      <Text style={{ fontSize: 8, color: theme.accent, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', textAlign: 'center' }}>{text}</Text>
    </View>
  );
}
