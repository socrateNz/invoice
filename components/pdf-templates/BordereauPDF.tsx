import React from 'react';
import {
  Document, Page, Text, View, StyleSheet, Line, Svg
} from '@react-pdf/renderer';
import { BordereauData } from '@/types/bordereau';

const C_DARK_BLUE = '#1a2e5a';
const C_GOLD = '#d4a017';
const C_LIGHT_BLUE_BG = '#e8edf5';
const C_WHITE = '#ffffff';
const C_BLACK = '#111111';
const C_GRAY = '#555555';
const C_BORDER = '#cccccc';
const C_HEADER_BG = '#f0f4fa';

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 50,
    paddingLeft: 35,
    paddingRight: 35,
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    color: C_BLACK,
    backgroundColor: C_WHITE,
  },

  // ── Header ──────────────────────────────────────────────────────
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  headerLeft: {},
  institutionName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: C_DARK_BLUE,
    textTransform: 'uppercase',
    lineHeight: 1.3,
  },
  institutionSubName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: C_DARK_BLUE,
    lineHeight: 1.3,
  },
  institutionLocation: {
    fontSize: 8,
    color: C_GRAY,
    marginTop: 1,
  },
  institutionDept: {
    fontSize: 8,
    color: C_GOLD,
    fontFamily: 'Helvetica-Bold',
    marginTop: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  metaLabel: {
    fontSize: 8,
    color: C_GRAY,
    width: 85,
    textAlign: 'right',
    marginRight: 4,
  },
  metaLine: {
    width: 120,
    borderBottom: `1pt solid ${C_BLACK}`,
    minHeight: 10,
    fontSize: 8,
    paddingLeft: 2,
  },

  goldLine: {
    borderBottom: `2pt solid ${C_GOLD}`,
    marginBottom: 8,
    marginTop: 2,
  },

  // ── Document Title ───────────────────────────────────────────────
  titleContainer: {
    backgroundColor: C_DARK_BLUE,
    padding: '6 12',
    marginBottom: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: C_WHITE,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // ── Section Heading ──────────────────────────────────────────────
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: C_DARK_BLUE,
    textTransform: 'uppercase',
    marginBottom: 4,
    paddingBottom: 2,
    borderBottom: `1.5pt solid ${C_GOLD}`,
  },

  // ── Generic Table ────────────────────────────────────────────────
  table: {
    border: `1pt solid ${C_BORDER}`,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: `0.5pt solid ${C_BORDER}`,
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  cellLabel: {
    backgroundColor: C_LIGHT_BLUE_BG,
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: C_DARK_BLUE,
    padding: '4 6',
    width: '25%',
    borderRight: `0.5pt solid ${C_BORDER}`,
  },
  cellValue: {
    fontSize: 8,
    padding: '4 6',
    flexGrow: 1,
    color: C_BLACK,
  },
  cellLabelWide: {
    backgroundColor: C_LIGHT_BLUE_BG,
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: C_DARK_BLUE,
    padding: '4 6',
    width: '30%',
    borderRight: `0.5pt solid ${C_BORDER}`,
  },
  cellLabelNarrow: {
    backgroundColor: C_LIGHT_BLUE_BG,
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: C_DARK_BLUE,
    padding: '4 6',
    width: '18%',
    borderRight: `0.5pt solid ${C_BORDER}`,
    borderLeft: `0.5pt solid ${C_BORDER}`,
  },
  cellValueNarrow: {
    fontSize: 8,
    padding: '4 6',
    width: '14%',
    color: C_BLACK,
    borderRight: `0.5pt solid ${C_BORDER}`,
  },

  // ── Checkbox helper ──────────────────────────────────────────────
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '4 6',
    flexGrow: 1,
    gap: 8,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  checkbox: {
    width: 9,
    height: 9,
    border: `1pt solid ${C_BLACK}`,
    marginRight: 3,
    backgroundColor: C_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: C_DARK_BLUE,
  },
  checkLabel: {
    fontSize: 8,
    color: C_BLACK,
  },

  // ── Documents Table ──────────────────────────────────────────────
  docsTableHeader: {
    flexDirection: 'row',
    backgroundColor: C_DARK_BLUE,
    borderBottom: `1pt solid ${C_BORDER}`,
  },
  docsThN: { width: '8%', padding: '4 4', color: C_WHITE, fontFamily: 'Helvetica-Bold', fontSize: 7.5, textAlign: 'center', borderRight: `0.5pt solid ${C_WHITE}` },
  docsThDesig: { width: '46%', padding: '4 6', color: C_WHITE, fontFamily: 'Helvetica-Bold', fontSize: 7.5, borderRight: `0.5pt solid ${C_WHITE}` },
  docsThPages: { width: '18%', padding: '4 4', color: C_WHITE, fontFamily: 'Helvetica-Bold', fontSize: 7.5, textAlign: 'center', borderRight: `0.5pt solid ${C_WHITE}` },
  docsThObs: { width: '28%', padding: '4 6', color: C_WHITE, fontFamily: 'Helvetica-Bold', fontSize: 7.5 },
  docsTdN: { width: '8%', padding: '4 4', fontSize: 8, textAlign: 'center', borderRight: `0.5pt solid ${C_BORDER}` },
  docsTdDesig: { width: '46%', padding: '4 6', fontSize: 8, borderRight: `0.5pt solid ${C_BORDER}` },
  docsTdPages: { width: '18%', padding: '4 4', fontSize: 8, textAlign: 'center', borderRight: `0.5pt solid ${C_BORDER}` },
  docsTdObs: { width: '28%', padding: '4 6', fontSize: 8 },

  // ── Signatures ───────────────────────────────────────────────────
  signaturesRow: {
    flexDirection: 'row',
    border: `1pt solid ${C_BORDER}`,
    marginBottom: 8,
  },
  sigBox: {
    flex: 1,
    padding: 10,
    minHeight: 90,
  },
  sigBoxLeft: {
    borderRight: `1pt solid ${C_BORDER}`,
  },
  sigBoxTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: C_WHITE,
    backgroundColor: C_DARK_BLUE,
    padding: '3 8',
    textAlign: 'center',
    marginBottom: 8,
  },
  sigLine: {
    borderBottom: `1pt solid ${C_BLACK}`,
    marginBottom: 14,
    marginTop: 4,
    width: '70%',
  },
  sigFieldLabel: {
    fontSize: 7.5,
    color: C_GRAY,
    marginBottom: 1,
  },
  sigFieldValue: {
    fontSize: 8,
    color: C_BLACK,
  },

  // ── Footer ───────────────────────────────────────────────────────
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 35,
    right: 35,
    borderTop: `1pt solid ${C_GOLD}`,
    paddingTop: 5,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 7,
    color: C_GRAY,
    fontFamily: 'Helvetica-Oblique',
    textAlign: 'center',
  },
});

// Helper: Checkbox component
const Checkbox = ({ checked, label }: { checked: boolean; label: string }) => (
  <View style={styles.checkItem}>
    <View style={[styles.checkbox, checked ? styles.checkboxChecked : {}]}>
      {checked && <Text style={{ color: '#ffffff', fontSize: 6, lineHeight: 1 }}>✓</Text>}
    </View>
    <Text style={styles.checkLabel}>{label}</Text>
  </View>
);

// Helper: Empty line placeholder
const emptyLine = (val?: string) => val || '';

interface BordereauPDFProps {
  data: BordereauData;
}

const BordereauPDF: React.FC<BordereauPDFProps> = ({ data }) => {
  const docRows = data.documents.length > 0 ? data.documents : [
    { id: '1', designation: '', nombrePages: '', observations: '' },
    { id: '2', designation: '', nombrePages: '', observations: '' },
    { id: '3', designation: '', nombrePages: '', observations: '' },
    { id: '4', designation: '', nombrePages: '', observations: '' },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ── HEADER ── */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.institutionName}>{data.institutionName || 'UNIVERSITE INTERNATIONALE'}</Text>
            <Text style={styles.institutionSubName}>{data.institutionSubtitle || 'JEAN PAUL II DE BAFANG'}</Text>
            <Text style={styles.institutionLocation}>{data.institutionLocation || 'UIJPII — Bafang, Cameroun'}</Text>
            <Text style={styles.institutionDept}>{data.institutionDepartment || 'Cellule Informatique'}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>N° Bordereau :</Text>
              <View style={styles.metaLine}><Text>{emptyLine(data.numeroBordereau)}</Text></View>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Date de réception :</Text>
              <View style={styles.metaLine}><Text>{emptyLine(data.dateReception)}</Text></View>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Heure :</Text>
              <View style={styles.metaLine}><Text>{emptyLine(data.heure)}</Text></View>
            </View>
          </View>
        </View>

        <View style={styles.goldLine} />

        {/* ── TITLE ── */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Bordereau de Réception de Dossier</Text>
        </View>

        {/* ── SECTION 1: Identification du service émetteur ── */}
        <Text style={styles.sectionTitle}>1. Identification du Service Émetteur</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabel}>Service / Département</Text>
            <Text style={styles.cellValue}>{emptyLine(data.serviceDepartement)}</Text>
            <Text style={styles.cellLabelNarrow}>Date d'envoi</Text>
            <Text style={styles.cellValueNarrow}>{emptyLine(data.dateEnvoi)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabel}>Nom de l'agent</Text>
            <Text style={styles.cellValue}>{emptyLine(data.nomAgent)}</Text>
            <Text style={styles.cellLabelNarrow}>Fonction</Text>
            <Text style={styles.cellValueNarrow}>{emptyLine(data.fonction)}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.cellLabel}>Contact / Poste</Text>
            <Text style={[styles.cellValue, { borderRight: 0 }]}>{emptyLine(data.contactPoste)}</Text>
          </View>
        </View>

        {/* ── SECTION 2: Description du dossier reçu ── */}
        <Text style={styles.sectionTitle}>2. Description du Dossier Reçu</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabelWide}>Intitulé / Objet du dossier</Text>
            <Text style={styles.cellValue}>{emptyLine(data.intituleObjet)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabelWide}>Référence interne</Text>
            <Text style={styles.cellValue}>{emptyLine(data.referenceInterne)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabelWide}>Nature du dossier</Text>
            <View style={styles.checkRow}>
              <Checkbox checked={data.natureDossier?.administratif} label="Administratif" />
              <Checkbox checked={data.natureDossier?.technique} label="Technique" />
              <Checkbox checked={data.natureDossier?.pedagogique} label="Pédagogique" />
              <Checkbox checked={data.natureDossier?.financier} label="Financier" />
              <Checkbox checked={data.natureDossier?.autreNature} label={`Autre : ${data.natureDossier?.autreNatureTexte || '_________'}`} />
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.cellLabelWide}>Support</Text>
            <View style={styles.checkRow}>
              <Checkbox checked={data.support?.papier} label="Papier" />
              <Checkbox checked={data.support?.numerique} label="Numérique (USB/CD)" />
              <Checkbox checked={data.support?.courriel} label="Courriel" />
              <Checkbox checked={data.support?.autreSupport} label={`Autre : ${data.support?.autreSupportTexte || ''}`} />
            </View>
          </View>
        </View>

        {/* ── SECTION 3: Liste des documents ── */}
        <Text style={styles.sectionTitle}>3. Liste des Documents / Pièces Jointes</Text>
        <View style={[styles.table, { marginBottom: 8 }]}>
          <View style={styles.docsTableHeader}>
            <Text style={styles.docsThN}>N°</Text>
            <Text style={styles.docsThDesig}>Désignation du document</Text>
            <Text style={styles.docsThPages}>Nombre de pages</Text>
            <Text style={styles.docsThObs}>Observations</Text>
          </View>
          {docRows.map((doc, i) => (
            <View key={doc.id || i} style={i < docRows.length - 1 ? styles.tableRow : styles.tableRowLast}>
              <Text style={styles.docsTdN}>{i + 1}</Text>
              <Text style={styles.docsTdDesig}>{emptyLine(doc.designation)}</Text>
              <Text style={styles.docsTdPages}>{emptyLine(doc.nombrePages)}</Text>
              <Text style={styles.docsTdObs}>{emptyLine(doc.observations)}</Text>
            </View>
          ))}
        </View>

        {/* ── SECTION 4: Priorité et traitement ── */}
        <Text style={styles.sectionTitle}>4. Priorité et Traitement</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabelWide}>Degré d'urgence</Text>
            <View style={styles.checkRow}>
              <Checkbox checked={data.degreeUrgence === 'normal'} label="Normal" />
              <Checkbox checked={data.degreeUrgence === 'urgent'} label="Urgent" />
              <Checkbox checked={data.degreeUrgence === 'tres_urgent'} label="Très urgent" />
            </View>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabelWide}>Délai de traitement demandé</Text>
            <Text style={styles.cellValue}>{emptyLine(data.delaiTraitement)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabelWide}>Transmis à / Affecté à</Text>
            <Text style={styles.cellValue}>{emptyLine(data.transmisA)}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.cellLabelWide}>Instructions particulières</Text>
            <Text style={styles.cellValue}>{emptyLine(data.instructionsParticulieres)}</Text>
          </View>
        </View>

        {/* ── SECTION 5: État du dossier ── */}
        <Text style={styles.sectionTitle}>5. État du Dossier à la Réception</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.checkRow}>
              <Checkbox checked={data.etatDossier?.complet} label="Dossier complet" />
              <Checkbox checked={data.etatDossier?.incomplet} label="Dossier incomplet (voir observations)" />
              <Checkbox checked={data.etatDossier?.endommage} label="Dossier endommagé" />
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.cellLabelWide}>Observations</Text>
            <Text style={styles.cellValue}>{emptyLine(data.observationsEtat)}</Text>
          </View>
        </View>

        {/* ── SECTION 6: Signatures ── */}
        <Text style={styles.sectionTitle}>6. Signatures</Text>
        <View style={styles.signaturesRow}>
          <View style={[styles.sigBox, styles.sigBoxLeft]}>
            <Text style={styles.sigBoxTitle}>Agent émetteur (Service)</Text>
            <Text style={styles.sigFieldLabel}>Nom &amp; Prénom : <Text style={styles.sigFieldValue}>{emptyLine(data.nomPrenomEmetteur)}</Text></Text>
            <View style={styles.sigLine} />
            <Text style={styles.sigFieldLabel}>Signature :</Text>
            <View style={[styles.sigLine, { marginBottom: 18 }]} />
            <Text style={styles.sigFieldLabel}>Date : {emptyLine(data.dateSignatureEmetteur)}</Text>
          </View>
          <View style={styles.sigBox}>
            <Text style={styles.sigBoxTitle}>Réceptionniste (Cellule Informatique)</Text>
            <Text style={styles.sigFieldLabel}>Nom &amp; Prénom : <Text style={styles.sigFieldValue}>{emptyLine(data.nomPrenomReceptionniste)}</Text></Text>
            <View style={styles.sigLine} />
            <Text style={styles.sigFieldLabel}>Signature :</Text>
            <View style={[styles.sigLine, { marginBottom: 18 }]} />
            <Text style={styles.sigFieldLabel}>Date : {emptyLine(data.dateSignatureReceptionniste)}</Text>
          </View>
        </View>

        {/* ── FOOTER ── */}
        <View fixed style={styles.footer}>
          <Text style={styles.footerText}>
            UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII
          </Text>
        </View>

      </Page>
    </Document>
  );
};

export default BordereauPDF;
