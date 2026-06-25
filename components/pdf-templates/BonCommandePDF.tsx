import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { BonCommandeData } from '@/types/bon-commande';
import { formatCurrency } from '@/utils/format';

const C_NAVY = '#1a2e5a';
const C_GOLD = '#d4a017';
const C_WHITE = '#ffffff';
const C_LIGHT = '#e8edf5';
const C_GRAY = '#555555';
const C_BORDER = '#cccccc';
const C_BLACK = '#111111';

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
  titleBox: { backgroundColor: C_NAVY, padding: '7 12', marginBottom: 10, alignItems: 'center' },
  titleText: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: C_WHITE, textTransform: 'uppercase', letterSpacing: 1 },
  sectionTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C_NAVY, textTransform: 'uppercase', marginBottom: 4, paddingBottom: 2, borderBottom: `1.5pt solid ${C_GOLD}` },

  // Party boxes
  partyRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  partyBox: { flex: 1, border: `1pt solid ${C_BORDER}` },
  partyHeader: { backgroundColor: C_NAVY, color: C_WHITE, padding: '3 8', fontSize: 8.5, fontFamily: 'Helvetica-Bold', textAlign: 'center' },
  partyBody: { padding: 8 },
  partyLine: { fontSize: 8, color: C_BLACK, marginBottom: 3 },
  partyLabel: { fontSize: 7.5, color: C_GRAY },

  // Items table
  itemsTable: { border: `1pt solid ${C_BORDER}`, marginBottom: 6 },
  tableHeader: { flexDirection: 'row', backgroundColor: C_NAVY },
  th: { color: C_WHITE, fontFamily: 'Helvetica-Bold', fontSize: 7.5, padding: '4 4', textAlign: 'center' },
  thN: { width: '6%', borderRight: `0.5pt solid ${C_WHITE}` },
  thDesig: { width: '40%', borderRight: `0.5pt solid ${C_WHITE}`, textAlign: 'left', paddingLeft: 6 },
  thUnite: { width: '10%', borderRight: `0.5pt solid ${C_WHITE}` },
  thQty: { width: '10%', borderRight: `0.5pt solid ${C_WHITE}` },
  thPU: { width: '17%', borderRight: `0.5pt solid ${C_WHITE}` },
  thTotal: { width: '17%' },
  tableRow: { flexDirection: 'row', borderBottom: `0.5pt solid ${C_BORDER}` },
  tableRowLast: { flexDirection: 'row' },
  tdN: { width: '6%', padding: '4 4', fontSize: 8, textAlign: 'center', borderRight: `0.5pt solid ${C_BORDER}` },
  tdDesig: { width: '40%', padding: '4 6', fontSize: 8, borderRight: `0.5pt solid ${C_BORDER}` },
  tdUnite: { width: '10%', padding: '4 4', fontSize: 8, textAlign: 'center', borderRight: `0.5pt solid ${C_BORDER}` },
  tdQty: { width: '10%', padding: '4 4', fontSize: 8, textAlign: 'center', borderRight: `0.5pt solid ${C_BORDER}` },
  tdPU: { width: '17%', padding: '4 6', fontSize: 8, textAlign: 'right', borderRight: `0.5pt solid ${C_BORDER}` },
  tdTotal: { width: '17%', padding: '4 6', fontSize: 8, textAlign: 'right' },

  // Total block
  totalContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 },
  totalBox: { flexDirection: 'row', border: `1pt solid ${C_NAVY}` },
  totalLabel: { backgroundColor: C_NAVY, color: C_WHITE, padding: '5 12', fontSize: 9, fontFamily: 'Helvetica-Bold' },
  totalValue: { backgroundColor: C_GOLD, color: C_BLACK, padding: '5 12', fontSize: 10, fontFamily: 'Helvetica-Bold' },

  // Conditions
  conditionsBox: { border: `1pt solid ${C_BORDER}`, padding: 8, marginBottom: 8 },
  condRow: { flexDirection: 'row', marginBottom: 3 },
  condLbl: { width: '30%', fontSize: 8, fontFamily: 'Helvetica-Bold', color: C_NAVY },
  condVal: { flexGrow: 1, fontSize: 8, color: C_BLACK },

  // Signatures (3 boxes)
  sigRow3: { flexDirection: 'row', border: `1pt solid ${C_BORDER}`, marginBottom: 8 },
  sigBox3: { flex: 1, padding: 8, minHeight: 90 },
  sigBoxMid: { borderLeft: `1pt solid ${C_BORDER}`, borderRight: `1pt solid ${C_BORDER}` },
  sigTitle: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: C_WHITE, backgroundColor: C_NAVY, padding: '3 4', textAlign: 'center', marginBottom: 6 },
  sigLine: { borderBottom: `1pt solid ${C_BLACK}`, marginBottom: 12, marginTop: 4, width: '80%' },
  sigLbl: { fontSize: 7, color: C_GRAY },

  footer: { position: 'absolute', bottom: 18, left: 35, right: 35, borderTop: `1pt solid ${C_GOLD}`, paddingTop: 5, alignItems: 'center' },
  footerTxt: { fontSize: 7, color: C_GRAY, fontFamily: 'Helvetica-Oblique', textAlign: 'center' },
});

const v = (x?: string | number) => x?.toString() || '';

interface Props { data: BonCommandeData }

const BonCommandePDF: React.FC<Props> = ({ data }) => {
  const items = data.items?.length > 0 ? data.items : [
    { id: '1', designation: '', unite: '', quantite: 0, prixUnitaire: 0 },
    { id: '2', designation: '', unite: '', quantite: 0, prixUnitaire: 0 },
    { id: '3', designation: '', unite: '', quantite: 0, prixUnitaire: 0 },
  ];

  const total = items.reduce((sum, item) => sum + (item.quantite || 0) * (item.prixUnitaire || 0), 0);

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
            <View style={s.metaRow}><Text style={s.metaLabel}>N° Bon :</Text><View style={s.metaVal}><Text>{v(data.numeroBon)}</Text></View></View>
            <View style={s.metaRow}><Text style={s.metaLabel}>Date :</Text><View style={s.metaVal}><Text>{v(data.dateCommande)}</Text></View></View>
          </View>
        </View>
        <View style={s.goldLine} />

        {/* Title */}
        <View style={s.titleBox}><Text style={s.titleText}>Bon de Commande</Text></View>

        {/* Parties */}
        <View style={s.partyRow}>
          <View style={s.partyBox}>
            <Text style={s.partyHeader}>Acheteur</Text>
            <View style={s.partyBody}>
              <Text style={s.partyLine}>{data.institutionName || 'UNIVERSITE INTERNATIONALE'}</Text>
              <Text style={s.partyLine}>{data.institutionSubtitle || 'JEAN PAUL II DE BAFANG'}</Text>
              <Text style={s.partyLine}>{data.institutionLocation || 'Bafang, Cameroun'}</Text>
              <Text style={s.partyLine}><Text style={s.partyLabel}>Service : </Text>{data.institutionDepartment || ''}</Text>
            </View>
          </View>
          <View style={s.partyBox}>
            <Text style={s.partyHeader}>Fournisseur</Text>
            <View style={s.partyBody}>
              <Text style={s.partyLine}>{v(data.fournisseurNom)}</Text>
              <Text style={s.partyLine}>{v(data.fournisseurAdresse)}</Text>
              <Text style={s.partyLine}><Text style={s.partyLabel}>Contact : </Text>{v(data.fournisseurContact)}</Text>
            </View>
          </View>
        </View>

        {/* Items table */}
        <Text style={s.sectionTitle}>Désignation des Articles</Text>
        <View style={s.itemsTable}>
          <View style={s.tableHeader}>
            <Text style={[s.th, s.thN]}>N°</Text>
            <Text style={[s.th, s.thDesig]}>Désignation</Text>
            <Text style={[s.th, s.thUnite]}>Unité</Text>
            <Text style={[s.th, s.thQty]}>Qté</Text>
            <Text style={[s.th, s.thPU]}>Prix Unit. (FCFA)</Text>
            <Text style={[s.th, s.thTotal]}>Total (FCFA)</Text>
          </View>
          {items.map((item, i) => (
            <View key={item.id || i} style={i < items.length - 1 ? s.tableRow : s.tableRowLast}>
              <Text style={s.tdN}>{i + 1}</Text>
              <Text style={s.tdDesig}>{v(item.designation)}</Text>
              <Text style={s.tdUnite}>{v(item.unite)}</Text>
              <Text style={s.tdQty}>{item.quantite || ''}</Text>
              <Text style={s.tdPU}>{item.prixUnitaire ? formatCurrency(item.prixUnitaire) : ''}</Text>
              <Text style={s.tdTotal}>{(item.quantite && item.prixUnitaire) ? formatCurrency(item.quantite * item.prixUnitaire) : ''}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={s.totalContainer}>
          <View style={s.totalBox}>
            <Text style={s.totalLabel}>TOTAL GÉNÉRAL (FCFA)</Text>
            <Text style={s.totalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>

        {/* Conditions */}
        <Text style={s.sectionTitle}>Conditions</Text>
        <View style={s.conditionsBox}>
          <View style={s.condRow}>
            <Text style={s.condLbl}>Délai de livraison :</Text>
            <Text style={s.condVal}>{v(data.delaiLivraison)}</Text>
          </View>
          <View style={s.condRow}>
            <Text style={s.condLbl}>Lieu de livraison :</Text>
            <Text style={s.condVal}>{v(data.lieuLivraison)}</Text>
          </View>
          <View style={s.condRow}>
            <Text style={s.condLbl}>Mode de paiement :</Text>
            <Text style={s.condVal}>{v(data.modePaiement)}</Text>
          </View>
          {data.conditions && (
            <View style={s.condRow}>
              <Text style={s.condLbl}>Conditions particulières :</Text>
              <Text style={s.condVal}>{v(data.conditions)}</Text>
            </View>
          )}
        </View>

        {/* Signatures */}
        <Text style={s.sectionTitle}>Approbations & Signatures</Text>
        <View style={s.sigRow3}>
          <View style={s.sigBox3}>
            <Text style={s.sigTitle}>Demandeur</Text>
            <Text style={s.sigLbl}>{v(data.demandeurFonction)}</Text>
            <Text style={[s.sigLbl, { fontFamily: 'Helvetica-Bold', fontSize: 8, color: C_BLACK }]}>{v(data.demandeurNom)}</Text>
            <View style={s.sigLine} />
            <Text style={s.sigLbl}>Signature</Text>
            <View style={[s.sigLine, { marginBottom: 6 }]} />
            <Text style={s.sigLbl}>Date : {v(data.dateSignature)}</Text>
          </View>
          <View style={[s.sigBox3, s.sigBoxMid]}>
            <Text style={s.sigTitle}>Validateur</Text>
            <Text style={s.sigLbl}>{v(data.validateurFonction)}</Text>
            <Text style={[s.sigLbl, { fontFamily: 'Helvetica-Bold', fontSize: 8, color: C_BLACK }]}>{v(data.validateurNom)}</Text>
            <View style={s.sigLine} />
            <Text style={s.sigLbl}>Signature</Text>
            <View style={[s.sigLine, { marginBottom: 6 }]} />
            <Text style={s.sigLbl}>Date : {v(data.dateSignature)}</Text>
          </View>
          <View style={s.sigBox3}>
            <Text style={s.sigTitle}>{v(data.directeurFonction) || 'Directeur Général'}</Text>
            <Text style={s.sigLbl}>{v(data.directeurFonction)}</Text>
            <Text style={[s.sigLbl, { fontFamily: 'Helvetica-Bold', fontSize: 8, color: C_BLACK }]}>{v(data.directeurNom)}</Text>
            <View style={s.sigLine} />
            <Text style={s.sigLbl}>Signature & Cachet</Text>
            <View style={[s.sigLine, { marginBottom: 6 }]} />
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

export default BonCommandePDF;
