import { StyleSheet } from '@react-pdf/renderer';
import { PdfTheme } from './theme';

export function createSharedStyles(theme: PdfTheme) {
  const { primary, onPrimary, accent, onAccent, surface, muted, border, page } = theme;

  return StyleSheet.create({
    page: {
      paddingTop: 30, paddingBottom: 50, paddingHorizontal: 35,
      fontFamily: 'Helvetica', fontSize: 8.5,
      color: page.color, backgroundColor: page.backgroundColor,
    },
    boxedPage: { border: `2pt solid ${accent}`, padding: '20 20' },

    // Header
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
    instName: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: primary, textTransform: 'uppercase', lineHeight: 1.3 },
    instSub: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: primary },
    instLoc: { fontSize: 7.5, color: muted, marginTop: 1 },
    instDept: { fontSize: 7.5, color: accent, fontFamily: 'Helvetica-Bold', marginTop: 1 },
    metaRight: { alignItems: 'flex-end' },
    metaRow: { flexDirection: 'row', marginBottom: 3 },
    metaLabel: { fontSize: 7.5, color: muted, width: 85, textAlign: 'right', marginRight: 4 },
    metaVal: { width: 110, borderBottom: `1pt solid ${border}`, fontSize: 8, color: page.color, paddingLeft: 2, minHeight: 10 },

    divider: { borderBottom: `2pt solid ${accent}`, marginBottom: 8, marginTop: 3 },

    // Title
    titleBox: { backgroundColor: primary, padding: '7 12', marginBottom: 10, alignItems: 'center' },
    titleBoxText: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: onPrimary, textTransform: 'uppercase', letterSpacing: 1 },
    titlePlain: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: primary, textAlign: 'center', marginBottom: 12, textTransform: 'uppercase' },

    // Section titles
    sectionTitleUnderline: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: primary, textTransform: 'uppercase', marginBottom: 4, paddingBottom: 2, borderBottom: `1.5pt solid ${accent}` },
    sectionTitleBarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginTop: 8 },
    sectionBar: { width: 3, backgroundColor: primary, marginRight: 7, alignSelf: 'stretch', minHeight: 12 },
    sectionTitleBarText: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: primary, textTransform: 'uppercase' },

    // Party boxes
    partyRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
    partyBox: { flex: 1, border: `1pt solid ${border}` },
    partyHeader: { backgroundColor: primary, color: onPrimary, padding: '3 8', fontSize: 8, fontFamily: 'Helvetica-Bold', textAlign: 'center' },
    partyBody: { padding: 8 },
    partyLine: { fontSize: 8, color: page.color, marginBottom: 3 },
    partyLabel: { fontSize: 7.5, color: muted },

    // Generic label/value table
    table: { border: `1pt solid ${border}`, marginBottom: 8 },
    row: { flexDirection: 'row', borderBottom: `0.5pt solid ${border}` },
    rowLast: { flexDirection: 'row' },
    labelCell: { backgroundColor: surface, fontFamily: 'Helvetica-Bold', fontSize: 8, color: primary, padding: '4 6', width: '30%', borderRight: `0.5pt solid ${border}` },
    valueCell: { fontSize: 8, padding: '4 6', flexGrow: 1, color: page.color },
    valueCellBordered: { fontSize: 8, padding: '4 6', flexGrow: 1, color: page.color, borderRight: `0.5pt solid ${border}` },
    labelCellNarrow: { backgroundColor: surface, fontFamily: 'Helvetica-Bold', fontSize: 8, color: primary, padding: '4 6', width: '18%', borderRight: `0.5pt solid ${border}`, borderLeft: `0.5pt solid ${border}` },
    valueCellNarrow: { fontSize: 8, padding: '4 6', width: '14%', color: page.color, borderRight: `0.5pt solid ${border}` },

    // Checkboxes
    checkRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: '4 6', flexGrow: 1, gap: 8 },
    checkItem: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
    checkbox: { width: 9, height: 9, border: `1pt solid ${page.color}`, marginRight: 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
    checkboxOn: { backgroundColor: primary },
    checkLabel: { fontSize: 8, color: page.color },

    // Items table
    itemsHeadRow: { flexDirection: 'row', backgroundColor: primary },
    itemsHeadCell: { color: onPrimary, fontFamily: 'Helvetica-Bold', fontSize: 7.5, padding: '4 4', borderRight: `0.5pt solid ${onPrimary}` },
    itemsCell: { fontSize: 8, padding: '4 6', borderRight: `0.5pt solid ${border}`, color: page.color },

    // Totals
    totalWrap: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 },
    totalBox: { flexDirection: 'row', border: `1pt solid ${primary}` },
    totalLabel: { backgroundColor: primary, color: onPrimary, padding: '5 12', fontSize: 9, fontFamily: 'Helvetica-Bold' },
    totalValue: { backgroundColor: accent, color: onAccent, padding: '5 12', fontSize: 10, fontFamily: 'Helvetica-Bold' },

    // Signatures
    sigRow: { flexDirection: 'row', border: `1pt solid ${border}`, marginBottom: 8 },
    sigBox: { flex: 1, padding: 8, minHeight: 90 },
    sigBoxMid: { borderLeft: `1pt solid ${border}`, borderRight: `1pt solid ${border}` },
    sigTitle: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: onPrimary, backgroundColor: primary, padding: '3 4', textAlign: 'center', marginBottom: 6 },
    sigLine: { borderBottom: `1pt solid ${page.color}`, marginBottom: 12, marginTop: 4, width: '80%' },
    sigLabel: { fontSize: 7, color: muted },
    sigName: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: page.color },

    // Footer
    footer: { position: 'absolute', bottom: 18, left: 35, right: 35, borderTop: `1pt solid ${accent}`, paddingTop: 5, alignItems: 'center' },
    footerText: { fontSize: 7, color: muted, fontFamily: 'Helvetica-Oblique', textAlign: 'center' },
  });
}

export type SharedPdfStyles = ReturnType<typeof createSharedStyles>;
