import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { OrdreMissionData } from '@/types/ordre-mission';
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
  metaLabel: { fontSize: 8, color: C_GRAY, width: 75, textAlign: 'right', marginRight: 4 },
  metaVal: { width: 110, borderBottom: `1pt solid ${C_BLACK}`, fontSize: 8, paddingLeft: 2, minHeight: 10 },
  goldLine: { borderBottom: `2pt solid ${C_GOLD}`, marginBottom: 8, marginTop: 3 },
  titleBox: { backgroundColor: C_NAVY, padding: '7 12', marginBottom: 10, alignItems: 'center' },
  titleText: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: C_WHITE, textTransform: 'uppercase', letterSpacing: 1 },
  sectionTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C_NAVY, textTransform: 'uppercase', marginBottom: 4, paddingBottom: 2, borderBottom: `1.5pt solid ${C_GOLD}` },
  table: { border: `1pt solid ${C_BORDER}`, marginBottom: 8 },
  row: { flexDirection: 'row', borderBottom: `0.5pt solid ${C_BORDER}` },
  rowLast: { flexDirection: 'row' },
  cellLbl: { backgroundColor: C_LIGHT, fontFamily: 'Helvetica-Bold', fontSize: 8, color: C_NAVY, padding: '4 6', width: '30%', borderRight: `0.5pt solid ${C_BORDER}` },
  cellVal: { fontSize: 8, padding: '4 6', flexGrow: 1 },
  cellLblNarrow: { backgroundColor: C_LIGHT, fontFamily: 'Helvetica-Bold', fontSize: 8, color: C_NAVY, padding: '4 6', width: '18%', borderRight: `0.5pt solid ${C_BORDER}`, borderLeft: `0.5pt solid ${C_BORDER}` },
  cellValNarrow: { fontSize: 8, padding: '4 6', width: '14%', borderRight: `0.5pt solid ${C_BORDER}` },
  checkRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: '4 6', flexGrow: 1 },
  chkItem: { flexDirection: 'row', alignItems: 'center', marginRight: 10 },
  chkBox: { width: 9, height: 9, border: `1pt solid ${C_BLACK}`, marginRight: 3, backgroundColor: C_WHITE, alignItems: 'center', justifyContent: 'center' },
  chkBoxOn: { backgroundColor: C_NAVY },
  chkLbl: { fontSize: 8 },
  fraisRow: { flexDirection: 'row', marginBottom: 4 },
  fraisLbl: { width: '50%', fontSize: 8, color: C_GRAY },
  fraisVal: { width: '50%', fontSize: 8, fontFamily: 'Helvetica-Bold', color: C_NAVY, textAlign: 'right' },
  totalRow: { flexDirection: 'row', backgroundColor: C_NAVY, padding: '5 8', marginBottom: 8 },
  totalLbl: { flexGrow: 1, fontSize: 9, fontFamily: 'Helvetica-Bold', color: C_WHITE },
  totalVal: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C_GOLD },
  sigRow: { flexDirection: 'row', border: `1pt solid ${C_BORDER}`, marginBottom: 8 },
  sigBox: { flex: 1, padding: 10, minHeight: 85 },
  sigBoxLeft: { borderRight: `1pt solid ${C_BORDER}` },
  sigTitle: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: C_WHITE, backgroundColor: C_NAVY, padding: '3 8', textAlign: 'center', marginBottom: 8 },
  sigLine: { borderBottom: `1pt solid ${C_BLACK}`, marginBottom: 14, marginTop: 4, width: '70%' },
  sigLbl: { fontSize: 7.5, color: C_GRAY },
  footer: { position: 'absolute', bottom: 18, left: 35, right: 35, borderTop: `1pt solid ${C_GOLD}`, paddingTop: 5, alignItems: 'center' },
  footerTxt: { fontSize: 7, color: C_GRAY, fontFamily: 'Helvetica-Oblique', textAlign: 'center' },
  noteBox: { border: `1pt solid ${C_BORDER}`, padding: 8, marginBottom: 8, backgroundColor: '#fffbea' },
  noteLbl: { fontSize: 7.5, color: C_GRAY, fontFamily: 'Helvetica-Oblique' },
});

const Chk = ({ on, label }: { on: boolean; label: string }) => (
  <View style={s.chkItem}>
    <View style={[s.chkBox, on ? s.chkBoxOn : {}]}>
      {on && <Text style={{ color: C_WHITE, fontSize: 6 }}>✓</Text>}
    </View>
    <Text style={s.chkLbl}>{label}</Text>
  </View>
);

const val = (v?: string | number) => v?.toString() || '';

interface Props { data: OrdreMissionData }

const OrdreMissionPDF: React.FC<Props> = ({ data }) => {
  const totalFrais = (data.perDiemJournalier || 0) * (parseFloat(data.duree) || 1) + (data.fraisTransport || 0) + (data.autresFrais || 0);

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
            <View style={s.metaRow}><Text style={s.metaLabel}>N° Ordre :</Text><View style={s.metaVal}><Text>{val(data.numeroOrdre)}</Text></View></View>
            <View style={s.metaRow}><Text style={s.metaLabel}>Date d'émission :</Text><View style={s.metaVal}><Text>{val(data.dateEmission)}</Text></View></View>
          </View>
        </View>
        <View style={s.goldLine} />

        {/* Title */}
        <View style={s.titleBox}><Text style={s.titleText}>Ordre de Mission</Text></View>

        {/* Section 1: Agent */}
        <Text style={s.sectionTitle}>1. Identification de l'Agent</Text>
        <View style={s.table}>
          <View style={s.row}>
            <Text style={s.cellLbl}>Nom & Prénom</Text>
            <Text style={s.cellVal}>{val(data.nomPrenom)}</Text>
            <Text style={s.cellLblNarrow}>Matricule</Text>
            <Text style={s.cellValNarrow}>{val(data.matricule)}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.cellLbl}>Grade / Titre</Text>
            <Text style={s.cellVal}>{val(data.grade)}</Text>
            <Text style={s.cellLblNarrow}>Fonction</Text>
            <Text style={s.cellValNarrow}>{val(data.fonction)}</Text>
          </View>
          <View style={s.rowLast}>
            <Text style={s.cellLbl}>Département / Service</Text>
            <Text style={s.cellVal}>{val(data.departement)}</Text>
          </View>
        </View>

        {/* Section 2: Mission */}
        <Text style={s.sectionTitle}>2. Détails de la Mission</Text>
        <View style={s.table}>
          <View style={s.row}>
            <Text style={s.cellLbl}>Objet de la mission</Text>
            <Text style={s.cellVal}>{val(data.objetMission)}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.cellLbl}>Destination</Text>
            <Text style={s.cellVal}>{val(data.destination)}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.cellLbl}>Date de départ</Text>
            <Text style={s.cellVal}>{val(data.dateDepart)}</Text>
            <Text style={s.cellLblNarrow}>Date de retour</Text>
            <Text style={s.cellValNarrow}>{val(data.dateRetour)}</Text>
          </View>
          <View style={s.rowLast}>
            <Text style={s.cellLbl}>Durée (jours)</Text>
            <Text style={s.cellVal}>{val(data.duree)}</Text>
          </View>
        </View>

        {/* Section 3: Transport */}
        <Text style={s.sectionTitle}>3. Moyen de Transport</Text>
        <View style={s.table}>
          <View style={s.rowLast}>
            <Text style={s.cellLbl}>Transport utilisé</Text>
            <View style={s.checkRow}>
              <Chk on={data.moyenTransport?.vehiculeService} label="Véhicule de service" />
              <Chk on={data.moyenTransport?.vehiculePersonnel} label="Véhicule personnel" />
              <Chk on={data.moyenTransport?.transport_commun} label="Transport en commun" />
              <Chk on={data.moyenTransport?.avion} label="Avion" />
              <Chk on={data.moyenTransport?.autre} label={`Autre : ${data.moyenTransport?.autreTexte || '______'}`} />
            </View>
          </View>
        </View>

        {/* Section 4: Frais */}
        <Text style={s.sectionTitle}>4. Frais Alloués</Text>
        <View style={[s.table, { padding: 10 }]}>
          <View style={s.fraisRow}>
            <Text style={s.fraisLbl}>Per diem journalier ({val(data.devise) || 'FCFA'}) ×{val(data.duree) || '0'} jour(s)</Text>
            <Text style={s.fraisVal}>{formatCurrency((data.perDiemJournalier || 0) * (parseFloat(data.duree) || 1))} {data.devise || 'FCFA'}</Text>
          </View>
          <View style={s.fraisRow}>
            <Text style={s.fraisLbl}>Frais de transport</Text>
            <Text style={s.fraisVal}>{formatCurrency(data.fraisTransport || 0)} {data.devise || 'FCFA'}</Text>
          </View>
          <View style={s.fraisRow}>
            <Text style={s.fraisLbl}>Autres frais</Text>
            <Text style={s.fraisVal}>{formatCurrency(data.autresFrais || 0)} {data.devise || 'FCFA'}</Text>
          </View>
        </View>
        <View style={s.totalRow}>
          <Text style={s.totalLbl}>TOTAL FRAIS ALLOUÉS</Text>
          <Text style={s.totalVal}>{formatCurrency(totalFrais)} {data.devise || 'FCFA'}</Text>
        </View>

        {/* Observations */}
        {data.observations ? (
          <>
            <Text style={s.sectionTitle}>5. Observations / Instructions</Text>
            <View style={s.noteBox}><Text style={s.noteLbl}>{data.observations}</Text></View>
          </>
        ) : null}

        {/* Signatures */}
        <Text style={s.sectionTitle}>Autorisation & Signatures</Text>
        <View style={s.sigRow}>
          <View style={[s.sigBox, s.sigBoxLeft]}>
            <Text style={s.sigTitle}>L'Intéressé(e)</Text>
            <Text style={s.sigLbl}>Nom & Prénom :</Text>
            <View style={s.sigLine} />
            <Text style={s.sigLbl}>Signature :</Text>
            <View style={[s.sigLine, { marginBottom: 10 }]} />
            <Text style={s.sigLbl}>Date : {val(data.dateSignature)}</Text>
          </View>
          <View style={s.sigBox}>
            <Text style={s.sigTitle}>{val(data.titreAutorisateur) || 'Le Directeur Général'}</Text>
            <Text style={s.sigLbl}>Nom & Prénom : {val(data.autorisePar)}</Text>
            <View style={s.sigLine} />
            <Text style={s.sigLbl}>Signature & Cachet :</Text>
            <View style={[s.sigLine, { marginBottom: 10 }]} />
            <Text style={s.sigLbl}>Lieu & Date : {val(data.lieuSignature)} — {val(data.dateSignature)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View fixed style={s.footer}>
          <Text style={s.footerTxt}>UIJPII — Cellule Informatique | Science et conscience pour un monde meilleur — UIJPII</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrdreMissionPDF;
