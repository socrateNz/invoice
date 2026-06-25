import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { RecuPaiementData } from '@/types/recu-paiement';
import { formatCurrency, numberToWordsFR } from '@/utils/format';

const C_NAVY = '#1a2e5a';
const C_GOLD = '#d4a017';
const C_WHITE = '#ffffff';
const C_LIGHT = '#e8edf5';
const C_GRAY = '#555555';
const C_BORDER = '#cccccc';
const C_BLACK = '#111111';
const C_GREEN = '#166534';
const C_GREEN_BG = '#dcfce7';

const s = StyleSheet.create({
  page: { paddingTop: 30, paddingBottom: 50, paddingHorizontal: 35, fontFamily: 'Helvetica', fontSize: 8.5, color: C_BLACK, backgroundColor: C_WHITE },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  instName: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: C_NAVY, textTransform: 'uppercase', lineHeight: 1.3 },
  instSub: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C_NAVY },
  instLoc: { fontSize: 8, color: C_GRAY, marginTop: 1 },
  instDept: { fontSize: 8, color: C_GOLD, fontFamily: 'Helvetica-Bold', marginTop: 1 },
  metaRight: { alignItems: 'flex-end' },
  metaRow: { flexDirection: 'row', marginBottom: 3 },
  metaLabel: { fontSize: 8, color: C_GRAY, width: 80, textAlign: 'right', marginRight: 4 },
  metaVal: { width: 110, borderBottom: `1pt solid ${C_BLACK}`, fontSize: 8, paddingLeft: 2, minHeight: 10 },
  goldLine: { borderBottom: `2pt solid ${C_GOLD}`, marginBottom: 8, marginTop: 3 },
  titleBox: { backgroundColor: C_NAVY, padding: '7 12', marginBottom: 16, alignItems: 'center' },
  titleText: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: C_WHITE, textTransform: 'uppercase', letterSpacing: 1 },

  // Amount hero block
  amountHero: { backgroundColor: C_GREEN_BG, border: `2pt solid ${C_GREEN}`, padding: '16 20', marginBottom: 16, alignItems: 'center' },
  amountLabel: { fontSize: 9, color: C_GREEN, marginBottom: 4, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' },
  amountValue: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: C_GREEN, marginBottom: 4 },
  amountWords: { fontSize: 8.5, color: C_GREEN, fontFamily: 'Helvetica-Oblique', textAlign: 'center' },

  // Table styles
  sectionTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C_NAVY, textTransform: 'uppercase', marginBottom: 4, paddingBottom: 2, borderBottom: `1.5pt solid ${C_GOLD}` },
  table: { border: `1pt solid ${C_BORDER}`, marginBottom: 8 },
  row: { flexDirection: 'row', borderBottom: `0.5pt solid ${C_BORDER}` },
  rowLast: { flexDirection: 'row' },
  cellLbl: { backgroundColor: C_LIGHT, fontFamily: 'Helvetica-Bold', fontSize: 8, color: C_NAVY, padding: '5 6', width: '30%', borderRight: `0.5pt solid ${C_BORDER}` },
  cellVal: { fontSize: 8, padding: '5 6', flexGrow: 1 },
  checkRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: '5 6', flexGrow: 1 },
  chkItem: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  chkBox: { width: 9, height: 9, border: `1pt solid ${C_BLACK}`, marginRight: 3, backgroundColor: C_WHITE, alignItems: 'center', justifyContent: 'center' },
  chkBoxOn: { backgroundColor: C_NAVY },
  chkLbl: { fontSize: 8 },

  // Signature block
  sigRow: { flexDirection: 'row', border: `1pt solid ${C_BORDER}`, marginBottom: 8 },
  sigBox: { flex: 1, padding: 10, minHeight: 90 },
  sigBoxLeft: { borderRight: `1pt solid ${C_BORDER}` },
  sigTitle: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: C_WHITE, backgroundColor: C_NAVY, padding: '3 8', textAlign: 'center', marginBottom: 8 },
  sigLine: { borderBottom: `1pt solid ${C_BLACK}`, marginBottom: 14, marginTop: 4, width: '70%' },
  sigLbl: { fontSize: 7.5, color: C_GRAY },

  // Watermark-style stamp area
  stampArea: { border: `2pt dashed ${C_GOLD}`, padding: 12, marginBottom: 8, alignItems: 'center', backgroundColor: '#fffbea' },
  stampText: { fontSize: 8, color: C_GOLD, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', textAlign: 'center' },

  footer: { position: 'absolute', bottom: 18, left: 35, right: 35, borderTop: `1pt solid ${C_GOLD}`, paddingTop: 5, alignItems: 'center' },
  footerTxt: { fontSize: 7, color: C_GRAY, fontFamily: 'Helvetica-Oblique', textAlign: 'center' },
});

const Chk = ({ on, label }: { on: boolean; label: string }) => (
  <View style={s.chkItem}>
    <View style={[s.chkBox, on ? s.chkBoxOn : {}]}>
      {on && <Text style={{ color: C_WHITE, fontSize: 6 }}>✓</Text>}
    </View>
    <Text style={s.chkLbl}>{label}</Text>
  </View>
);

const v = (x?: string | number) => x?.toString() || '';

interface Props { data: RecuPaiementData }

const RecuPaiementPDF: React.FC<Props> = ({ data }) => {
  const montantWords = data.sommeChiffres ? numberToWordsFR(data.sommeChiffres) : '---';

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.headerRow}>
          <View>
            <Text style={s.instName}>{data.institutionName || 'UNIVERSITE INTERNATIONALE'}</Text>
            <Text style={s.instSub}>{data.institutionSubtitle || 'JEAN PAUL II DE BAFANG'}</Text>
            <Text style={s.instLoc}>UIJPII — {data.institutionLocation || 'Bafang, Cameroun'}</Text>
            <Text style={s.instDept}>{data.institutionDepartment || 'Cellule Informatique'}</Text>
          </View>
          <View style={s.metaRight}>
            <View style={s.metaRow}><Text style={s.metaLabel}>N° Reçu :</Text><View style={s.metaVal}><Text>{v(data.numeroRecu)}</Text></View></View>
            <View style={s.metaRow}><Text style={s.metaLabel}>Date :</Text><View style={s.metaVal}><Text>{v(data.dateRecu)}</Text></View></View>
            <View style={s.metaRow}><Text style={s.metaLabel}>Heure :</Text><View style={s.metaVal}><Text>{v(data.heure)}</Text></View></View>
          </View>
        </View>
        <View style={s.goldLine} />

        {/* Title */}
        <View style={s.titleBox}><Text style={s.titleText}>Reçu de Paiement</Text></View>

        {/* Amount hero */}
        <View style={s.amountHero}>
          <Text style={s.amountLabel}>Montant Reçu</Text>
          <Text style={s.amountValue}>{formatCurrency(data.sommeChiffres || 0)} FCFA</Text>
          <Text style={s.amountWords}>Arrêté à la somme de : {montantWords} Francs CFA</Text>
        </View>

        {/* Section 1: Payeur */}
        <Text style={s.sectionTitle}>1. Informations du Payeur</Text>
        <View style={s.table}>
          <View style={s.row}>
            <Text style={s.cellLbl}>Reçu de</Text>
            <Text style={s.cellVal}>{v(data.recuDe)}</Text>
          </View>
          <View style={s.rowLast}>
            <Text style={s.cellLbl}>Adresse / Contact</Text>
            <Text style={s.cellVal}>{v(data.adressePayeur)}</Text>
          </View>
        </View>

        {/* Section 2: Paiement */}
        <Text style={s.sectionTitle}>2. Détails du Paiement</Text>
        <View style={s.table}>
          <View style={s.row}>
            <Text style={s.cellLbl}>Motif / Objet</Text>
            <Text style={s.cellVal}>{v(data.motif)}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.cellLbl}>Référence dossier</Text>
            <Text style={s.cellVal}>{v(data.reference)}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.cellLbl}>Mode de paiement</Text>
            <View style={s.checkRow}>
              <Chk on={data.modePaiement?.especes} label="Espèces" />
              <Chk on={data.modePaiement?.mobileMoney} label="Mobile Money" />
              <Chk on={data.modePaiement?.virement} label="Virement" />
              <Chk on={data.modePaiement?.cheque} label="Chèque" />
              <Chk on={data.modePaiement?.autre} label={`Autre : ${data.modePaiement?.autreTexte || ''}`} />
            </View>
          </View>
          {(data.modePaiement?.mobileMoney || data.modePaiement?.virement) && (
            <View style={s.row}>
              <Text style={s.cellLbl}>Opérateur / Banque</Text>
              <Text style={s.cellVal}>{v(data.operateur)}</Text>
            </View>
          )}
          <View style={s.rowLast}>
            <Text style={s.cellLbl}>N° Transaction / Référence</Text>
            <Text style={s.cellVal}>{v(data.numeroTransaction)}</Text>
          </View>
        </View>

        {/* Stamp area */}
        <View style={s.stampArea}>
          <Text style={s.stampText}>Zone réservée au tampon / cachet officiel</Text>
        </View>

        {/* Signatures */}
        <Text style={s.sectionTitle}>Signatures</Text>
        <View style={s.sigRow}>
          <View style={[s.sigBox, s.sigBoxLeft]}>
            <Text style={s.sigTitle}>Le Payeur</Text>
            <Text style={s.sigLbl}>Nom & Prénom : {v(data.recuDe)}</Text>
            <View style={s.sigLine} />
            <Text style={s.sigLbl}>Signature :</Text>
            <View style={s.sigLine} />
            <Text style={s.sigLbl}>Date : {v(data.dateRecu)}</Text>
          </View>
          <View style={s.sigBox}>
            <Text style={s.sigTitle}>Le Caissier / Réceptionniste</Text>
            <Text style={s.sigLbl}>Nom & Prénom : {v(data.nomCaissier)}</Text>
            <View style={s.sigLine} />
            <Text style={s.sigLbl}>Signature & Cachet :</Text>
            <View style={s.sigLine} />
            <Text style={s.sigLbl}>Date : {v(data.dateSignature)}</Text>
          </View>
        </View>

        <View fixed style={s.footer}>
          <Text style={s.footerTxt}>UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII</Text>
        </View>
      </Page>
    </Document>
  );
};

export default RecuPaiementPDF;
